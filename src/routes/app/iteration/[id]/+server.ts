import { db } from "$lib/server/db";
import { iteration, project, task } from "$lib/server/db/schema";
import { getTokenPayload } from "$lib/server/util";
import { and, eq } from "drizzle-orm";
import type { RequestEvent } from "./$types";

type updateIter = {
  plannedAt?: string;
  doneAt?: string;
}

type PutReq = {
  iteration: updateIter;
}

export async function PUT({ params, locals, request }: RequestEvent) {
  const user = getTokenPayload(locals);
  const id = parseInt(params.id);
  const body = await request.json() as PutReq;

  if (!body.iteration.plannedAt && !body.iteration.doneAt) {
    return new Response(null, { status: 400 });
  }

  const update = {
    plannedAt: body.iteration.plannedAt,
    doneAt: body.iteration.doneAt,
  }

  // confirm that the iteration exists and belongs to the user
  const jndIters = await db.select({
    id: iteration.id,
    plannedAt: iteration.plannedAt,
    doneAt: iteration.doneAt,
    taskId: iteration.taskId,
  }).from(iteration).where(eq(iteration.id, id))
    .leftJoin(task, eq(task.id, iteration.taskId))
    .leftJoin(project, and(eq(task.projectId, project.id), eq(project.ownerId, user.userId)));
  if (jndIters.length !== 1) {
    return new Response(null, { status: 404 });
  }

  // do update
  await db.update(iteration).set({
    ...update,
    updatedAt: new Date(),
  }).where(eq(iteration.id, id));

  return new Response(null, { status: 200 });
}

