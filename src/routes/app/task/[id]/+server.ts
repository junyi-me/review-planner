import { task } from "$lib/server/db/schema";
import { eq } from 'drizzle-orm';
import type { RequestEvent } from "./$types";
import { validateTask, type PutTaskReq, type PutTaskResp } from "$lib/api";
import { db } from "$lib/server/db";
import { getTaskForUser } from "$lib/server/db/query";

export async function PUT({ params, locals, request }: RequestEvent) {
  const taskId = parseInt(params.id);
  const user = locals.user!;
  const body = await request.json() as PutTaskReq;
  const pTask = body.task;

  const err = validateTask(pTask);
  if (err) {
    return new Response(JSON.stringify(err), { status: 400 });
  }

  const taskProjs = await getTaskForUser(taskId, user.sub);
  if (taskProjs.length !== 1) {
    console.error("Task not found", { taskId: pTask.id, userId: user.sub });
    return new Response(null, { status: 404 });
  }
  const dbTask = taskProjs[0].task;

  const nextIterAt = pTask.iterations.find(iter => !iter.done)?.plannedAt ?? null;
  const firstIterAt = pTask.iterations[0].plannedAt;
  const lastIterAt = pTask.iterations[pTask.iterations.length - 1].plannedAt;

  await db.update(task).set({
    name: pTask.name,
    description: pTask.description,
    link: pTask.link,
    iterations: pTask.iterations,
    firstIterAt,
    nextIterAt,
    lastIterAt,
  }).where(eq(task.id, dbTask.id));

  return new Response(JSON.stringify({ done: nextIterAt === null, nextIterAt } as PutTaskResp), { status: 200 });
}

export async function DELETE({ params, locals }: RequestEvent) {
  const taskId = parseInt(params.id);
  const user = locals.user!;

  const taskProjs = await getTaskForUser(taskId, user.sub);
  if (taskProjs.length !== 1) {
    console.error("Task not found", { taskId, userId: user.sub });
    return new Response(null, { status: 404 });
  }

  await db.delete(task).where(eq(task.id, taskProjs[0].task.id));

  return new Response(null, { status: 204 });
}

