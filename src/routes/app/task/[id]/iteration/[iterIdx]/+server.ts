import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { getTokenPayload } from "$lib/server/util";
import { and, eq } from "drizzle-orm";
import type { RequestEvent } from "./$types";

type PatchTaskReq = {
  done: boolean;
}

export async function PATCH({ params, locals, request }: RequestEvent) {
  const taskId = parseInt(params.id);
  const iterIdx = parseInt(params.iterIdx);
  const user = getTokenPayload(locals);
  const body = await request.json() as PatchTaskReq;

  const tsks = await db.select({ task }).from(task)
    .leftJoin(project, and(eq(task.projectId, project.id), eq(project.ownerId, user.userId)))
    .where(and(eq(task.id, taskId)));
  if (tsks.length !== 1) {
    console.error("Task not found", { taskId, userId: user.userId });
    return new Response(null, { status: 404 });
  }
  const tsk = tsks[0].task;
  tsk.iterations[iterIdx].done = body.done;
  await db.update(task).set({ iterations: tsk.iterations }).where(eq(task.id, taskId));

  return new Response(null, { status: 200 });
}

