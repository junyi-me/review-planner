import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { and, eq } from 'drizzle-orm';
import type { RequestEvent } from "./$types";
import { redirect } from "@sveltejs/kit";
import { getTokenPayload } from "$lib/server/util";
import type { PutTaskReq, PutTaskResp } from "$lib/api";
import { MAX_ITERATIONS } from "$lib/const";

export async function PUT({ params, locals, request }: RequestEvent) {
  const taskId = parseInt(params.id);
  const user = getTokenPayload(locals);
  const body = await request.json() as PutTaskReq;
  const pTask = body.task;

  // validation
  if (pTask.iterations.length > MAX_ITERATIONS) {
    return new Response(JSON.stringify({
      error: "Too many iterations",
    }), { status: 400 });
  }

  const taskProjs = await db.select().from(task).where(eq(task.id, taskId))
    .leftJoin(project, and(eq(task.projectId, project.id), eq(project.ownerId, user.userId)));
  if (taskProjs.length !== 1) {
    console.error("Task not found", { taskId: pTask.id, userId: user.userId });
    throw redirect(302, "/app");
  }
  const dbTask = taskProjs[0].task;

  const nextIterAt = pTask.iterations.find(iter => !iter.done)?.plannedAt;
  const doneAt = nextIterAt ? null : pTask.iterations[pTask.iterations.length - 1].plannedAt;

  await db.update(task).set({
    name: pTask.name,
    description: pTask.description,
    link: pTask.link,
    iterations: pTask.iterations,
    nextIterAt,
    doneAt,
  }).where(eq(task.id, dbTask.id));

  return new Response(JSON.stringify({ doneAt } as PutTaskResp), { status: 200 });
}

