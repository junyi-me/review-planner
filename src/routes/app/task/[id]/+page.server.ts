import { db } from "$lib/server/db";
import { iteration, project, task } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { getTokenPayload } from "$lib/server/util";

export const load: PageServerLoad = async ({ params, locals }) => {
  const taskId = parseInt(params.id);
  const user = getTokenPayload(locals);

  const taskProjs = await db.select().from(task).where(eq(task.id, taskId))
    .leftJoin(project, and(eq(task.projectId, project.id), eq(project.ownerId, user.userId)));
  if (taskProjs.length !== 1) {
    return { status: 404 };
  }
  const taskProj = taskProjs[0];

  const iterations = await db.select().from(iteration).where(eq(iteration.taskId, taskId)).limit(50);

  return { project: taskProj.project, task: taskProj.task, iterations };
}

