import { getPaging, type PageOptsSql } from "$lib/api";
import { project } from "$lib/server/db/schema";
import { SQL, sql, type AnyColumn, type SQLWrapper } from "drizzle-orm";

export const MIN_NEXT_ITER_AT = "min_next_iter_at";
export const colMap: Record<string, AnyColumn | SQLWrapper> = {
  name: project.name,
  min_next_iter_at: sql.raw(MIN_NEXT_ITER_AT),
  created: project.createdAt,
}

export type ProjectSortBy = keyof typeof project.$inferSelect | typeof MIN_NEXT_ITER_AT;
export type ProjectsPageOpts = PageOptsSql & {
  orderBy: SQL<unknown>;
}

export function getProjectPaging(params: URLSearchParams): ProjectsPageOpts {
  const pg = getPaging(params);
  const sortBy = pg.sortBy ?? MIN_NEXT_ITER_AT;
  const orderBy = pg.getOrderFn()(sortBy in colMap ? colMap[sortBy] : colMap.min_next_iter_at);
  return { ...pg, orderBy };
}

