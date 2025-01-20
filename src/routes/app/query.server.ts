import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";
import type { TokenPayload } from "$lib/server/jwt";
import { MIN_NEXT_ITER_AT, type ProjectsPageOpts } from "./util";

export async function getProjects(opts: ProjectsPageOpts, user: TokenPayload) {
  const sq = db.select({
    projectId: task.projectId,
    min_next_iter_at: sql<Date>`min(${task.nextIterAt})`.as(MIN_NEXT_ITER_AT),
  }).from(task).groupBy(task.projectId).as('task');

  const projects = await db.select().from(project)
    .leftJoin(sq, eq(project.id, sq.projectId))
    .where(eq(project.ownerId, user.userId))
    .orderBy(opts.orderBy)
    .limit(opts.pageSize).offset(opts.getOffset());

  return projects;
}

