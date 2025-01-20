import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import type { TokenPayload } from "$lib/server/jwt";
import { getPaging, type PageOptsSql } from "$lib/api";
import { MIN_NEXT_ITER_AT } from "./util";
import { eq, SQL, sql, type AnyColumn, type SQLWrapper } from "drizzle-orm";

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

