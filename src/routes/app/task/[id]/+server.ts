import { project, task } from "$lib/server/db/schema";
import { and, eq } from 'drizzle-orm';
import type { RequestEvent } from "./$types";
import { getTokenPayload } from "$lib/server/util";
import type { PutTaskReq, PutTaskResp } from "$lib/api";
import { MAX_ITERATIONS } from "$lib/const";
import { db } from "$lib/server/db";

async function getTaskForUser(taskId: number, userId: number) {
  return await db.select().from(task).where(eq(task.id, taskId))
    .leftJoin(project, and(eq(task.projectId, project.id), eq(project.ownerId, userId)));
}

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

  const taskProjs = await getTaskForUser(taskId, user.userId);
  if (taskProjs.length !== 1) {
    console.error("Task not found", { taskId: pTask.id, userId: user.userId });
    return new Response(null, { status: 404 });
  }
  const dbTask = taskProjs[0].task;

  const nextIterAt = pTask.iterations.find(iter => !iter.done)?.plannedAt ?? null;
  const doneAt = nextIterAt ? null : pTask.iterations[pTask.iterations.length - 1].plannedAt;

  await db.update(task).set({
    name: pTask.name,
    description: pTask.description,
    link: pTask.link,
    iterations: pTask.iterations,
    nextIterAt,
    doneAt,
  }).where(eq(task.id, dbTask.id));

  return new Response(JSON.stringify({ doneAt, nextIterAt } as PutTaskResp), { status: 200 });
}

export async function DELETE({ params, locals }: RequestEvent) {
  const taskId = parseInt(params.id);
  const user = getTokenPayload(locals);

  const taskProjs = await getTaskForUser(taskId, user.userId);
  if (taskProjs.length !== 1) {
    console.error("Task not found", { taskId, userId: user.userId });
    return new Response(null, { status: 404 });
  }

  await db.delete(task).where(eq(task.id, taskProjs[0].task.id));

  return new Response(null, { status: 204 });
}

