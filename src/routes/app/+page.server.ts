import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import type { TokenPayload } from "$lib/server/jwt";
import { eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import type { GetProjectResp } from "$lib/api";

export const load: PageServerLoad = async ({ locals }) => {
  // @ts-ignore
  const user = locals.user as TokenPayload;

  const sq = db.select({
    projectId: task.projectId,
    min_next_iter_at: sql<Date>`min(${task.nextIterAt})`.as('min_next_iter_at'),
  }).from(task).groupBy(task.projectId).as('task');

  const projects = await db.select().from(project)
    .fullJoin(sq, eq(project.id, sq.projectId))
    .where(eq(project.ownerId, user.userId))
    .orderBy(sql`${sq.min_next_iter_at} NULLS LAST`);

  return { projects } as GetProjectResp;
}

