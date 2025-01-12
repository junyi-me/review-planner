import { db } from "$lib/server/db";
import { project, task, type Iteration } from "$lib/server/db/schema";
import { and, eq } from 'drizzle-orm';
import type { RequestEvent } from "@sveltejs/kit";
import { getTokenPayload } from "$lib/server/util";
import { MAX_ITERATIONS } from "$lib/const";
import { formatStrDateInput } from "$lib/util";
import type { CreateTaskReq } from "$lib/api";

export async function POST({ locals, request }: RequestEvent) {
  const body = await request.json() as CreateTaskReq;
  const user = getTokenPayload(locals);

  if (body.iterations.length > MAX_ITERATIONS) {
    return new Response(null, { status: 400 });
  }

  const projects = await db.select().from(project).where(and(eq(project.id, body.projectId), eq(project.ownerId, user.userId)));
  if (projects.length !== 1) {
    return new Response(null, { status: 404 });
  }

  const newTasks = await db.insert(task).values({
    projectId: body.projectId,
    name: body.name,
    description: body.description,
    link: body.link,
    iterations: body.iterations.map(date => ({
      plannedAt: formatStrDateInput(date),
      done: false,
    })) as Iteration[],
    nextIterAt: formatStrDateInput(body.iterations[0]),
  }).returning({ id: task.id });
  if (newTasks.length !== 1) {
    console.error("Failed to create task");
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 201 });
}

