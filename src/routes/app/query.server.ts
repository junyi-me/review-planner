import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { getPaging, type PageOptsSql } from "$lib/api";
import { count, eq, SQL, sql, type AnyColumn, type SQLWrapper } from "drizzle-orm";
import { MIN_NEXT_ITER_AT } from "$lib/const";

export type ProjectsPageOpts = PageOptsSql & {
  orderBy: SQL<unknown>;
}

export const colMap: Record<string, AnyColumn | SQLWrapper> = {
  name: project.name,
  [MIN_NEXT_ITER_AT]: sql.raw(MIN_NEXT_ITER_AT),
  created: project.createdAt,
}

export function getProjectPaging(params: URLSearchParams): ProjectsPageOpts {
  const pg = getPaging(params);
  const sortBy = pg.sortBy ?? MIN_NEXT_ITER_AT;
  const orderBy = pg.getOrderFn()(sortBy in colMap ? colMap[sortBy] : colMap.min_next_iter_at);
  return { ...pg, orderBy };
}

export async function getProjectCount(userId: number) {
  const cnt = await db.select({ count: count() }).from(project).where(eq(project.ownerId, userId));
  return cnt[0].count;
}

export async function getProjects(opts: ProjectsPageOpts, userId: number) {
  const sq = db.select({
    projectId: task.projectId,
    min_next_iter_at: sql<Date>`min(${task.nextIterAt})`.as(MIN_NEXT_ITER_AT),
  }).from(task).groupBy(task.projectId).as('task');

  const projects = await db.select().from(project)
    .leftJoin(sq, eq(project.id, sq.projectId))
    .where(eq(project.ownerId, userId))
    .orderBy(opts.orderBy)
    .limit(opts.pageSize).offset(opts.getOffset());

  return projects;
}

