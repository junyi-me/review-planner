import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { and, eq } from 'drizzle-orm';
import type { RequestEvent } from "@sveltejs/kit";
import { getTokenPayload } from "$lib/server/util";
import { validateTask, type CreateTaskReq } from "$lib/api";

export async function POST({ locals, request }: RequestEvent) {
  const user = getTokenPayload(locals);
  const body = await request.json() as CreateTaskReq;
  const pTask = body.task;

  const err = validateTask(pTask);
  if (err) {
    return new Response(JSON.stringify(err), { status: 400 });
  }

  const projects = await db.select().from(project).where(and(eq(project.id, pTask.projectId), eq(project.ownerId, user.userId)));
  if (projects.length !== 1) {
    return new Response(null, { status: 404 });
  }

  const firstIterAt = pTask.iterations[0].plannedAt;
  const nextIterAt = pTask.iterations.find(iter => !iter.done)?.plannedAt ?? null;
  const newTasks = await db.insert(task).values({
    projectId: pTask.projectId,
    name: pTask.name,
    description: pTask.description,
    link: pTask.link,
    iterations: pTask.iterations,
    firstIterAt,
    nextIterAt,
    lastIterAt: pTask.iterations[pTask.iterations.length - 1].plannedAt,
  }).returning({ id: task.id });
  if (newTasks.length !== 1) {
    console.error("Failed to create task");
    return new Response(null, { status: 500 });
  }

  return new Response(JSON.stringify(newTasks[0]), { status: 201 });
}

