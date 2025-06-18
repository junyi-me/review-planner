import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  const taskId = parseInt(params.id);
  const user = locals.user!;

  const taskProjs = await db.select().from(task).where(eq(task.id, taskId))
    .leftJoin(project, and(eq(task.projectId, project.id), eq(project.ownerId, user.sub)));
  if (taskProjs.length !== 1) {
    console.error("Task not found", { taskId, userId: user.sub });
    throw redirect(302, "/app");
  }
  const taskProj = taskProjs[0];

  return { project: taskProj.project, task: taskProj.task };
}

