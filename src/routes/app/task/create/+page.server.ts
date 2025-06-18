import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { project } from "$lib/server/db/schema";
import { db } from "$lib/server/db";

export const load: PageServerLoad = async ({ url, locals }) => {
  const projIdStr = url.searchParams.get("projId");
  if (!projIdStr) {
    throw redirect(302, "/app");
  }

  const projId = parseInt(projIdStr);
  const user = locals.user!;

  const projects = await db.select().from(project).where(and(eq(project.ownerId, user.sub), eq(project.id, projId)));
  if (projects.length !== 1) {
    throw redirect(302, `/app/project/${projId}`);
  }

  return { project: projects[0] };
}

