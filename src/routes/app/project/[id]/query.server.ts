import { getPaging, type PageOptsSql } from "$lib/api";
import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { and, count, eq, SQL, type AnyColumn, type SQLWrapper } from "drizzle-orm";

export type ProjectPageOpts = PageOptsSql & {
  orderBy: SQL<unknown>;
}

export const taskColMap: Record<string, AnyColumn | SQLWrapper> = Object.freeze({
  name: task.name,
  nextIterAt: task.nextIterAt,
});

export function getTaskPaging(params: URLSearchParams): ProjectPageOpts {
  const pg = getPaging(params);
  let orderBy = pg.getOrderFn()(taskColMap.nextIterAt);
  if (pg.sortBy) {
    orderBy = pg.getOrderFn()(pg.sortBy in taskColMap ? taskColMap[pg.sortBy] : taskColMap.nextIterAt);
  }
  return { ...pg, orderBy };
}

export async function getTaskCount(projId: number) {
  const cnt = await db.select({ count: count() }).from(task).where(eq(task.projectId, projId));
  return cnt[0].count;
}

export async function getTasks(userId: number, projId: number, pg: ProjectPageOpts) {
  const projects = await db.select().from(project)
    .where(and(eq(project.ownerId, userId), eq(project.id, projId)));
  if (projects.length !== 1) {
    console.error("Project not found", { projId, userId: userId });
    throw new Error("Project not found");
  }

  const tasks = await db.select().from(task).where(eq(task.projectId, projId))
    .orderBy(pg.orderBy).limit(pg.pageSize).offset(pg.getOffset());

  return { project: projects[0], tasks };
}

