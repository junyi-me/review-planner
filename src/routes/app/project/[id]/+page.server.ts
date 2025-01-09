import { db } from "$lib/server/db";
import { iteration, project, task } from "$lib/server/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { getTokenPayload } from "$lib/server/util";
import type { TaskIterations } from "./util";

export const load: PageServerLoad = async ({ params, locals }) => {
  const projId = parseInt(params.id);
  const user = getTokenPayload(locals);

  const projects = await db.select().from(project).where(and(eq(project.ownerId, user.userId), eq(project.id, projId)));
  if (projects.length !== 1) {
    return { status: 404 };
  }

  const tasks = await db.select().from(task).where(eq(task.projectId, projId)).limit(50);
  if (tasks.length === 0) {
    return { project: projects[0], tasks };
  }

  const iters = await db.select().from(iteration).where(inArray(iteration.taskId, tasks.map(t => t.id)));
  const taskIters = tasks.map(t => ({ ...t, iterations: iters.filter(i => i.taskId === t.id) })) as TaskIterations[];

  return { project: projects[0], taskIters };
}

