import { db } from "$lib/server/db";
import { task } from "$lib/server/db/schema";
import { getTokenPayload } from "$lib/server/util";
import { eq } from "drizzle-orm";
import type { RequestEvent } from "./$types";
import { getTaskForUser } from "$lib/server/db/query";

type PatchTaskReq = {
  done: boolean;
}

export async function PATCH({ params, locals, request }: RequestEvent) {
  const taskId = parseInt(params.id);
  const iterIdx = parseInt(params.iterIdx);
  const user = getTokenPayload(locals);
  const body = await request.json() as PatchTaskReq;

  const tasks = await getTaskForUser(taskId, user.sub);
  if (tasks.length !== 1) {
    console.error("Task not found", { taskId, userId: user.sub });
    return new Response(null, { status: 404 });
  }
  const tsk = tasks[0].task;

  tsk.iterations[iterIdx].done = body.done;
  await db.update(task).set({ 
    iterations: tsk.iterations,
    nextIterAt: tsk.iterations.find((i) => !i.done)?.plannedAt ?? null,
  }).where(eq(task.id, taskId));

  return new Response(null, { status: 200 });
}

