import { db } from "$lib/server/db";
import { project } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { getTokenPayload } from "$lib/server/util";
import { redirect } from "@sveltejs/kit";
import { getOrderedTasksIters } from "$lib/server/db/query";

export const load: PageServerLoad = async ({ params, locals }) => {
  const projId = parseInt(params.id);
  const user = getTokenPayload(locals);

  const projects = await db.select().from(project)
    .where(and(eq(project.ownerId, user.userId), eq(project.id, projId)));
  if (projects.length !== 1) {
    console.error("Project not found", { projId, userId: user.userId });
    throw redirect(302, "/app");
  }

  const taskIters = await getOrderedTasksIters(projId);

  return { project: projects[0], taskIters };
}

