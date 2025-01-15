import { getPaging, type PageOpts } from "$lib/api";
import type { project } from "$lib/server/db/schema";

export const MIN_NEXT_ITER_AT = "min_next_iter_at";

type ProjectSortBy = keyof typeof project.$inferSelect | typeof MIN_NEXT_ITER_AT;
export type ProjectsPageOpts = PageOpts & {
  sortBy: ProjectSortBy;
}

export function getProjectPaging(params: URLSearchParams): ProjectsPageOpts {
  const pg = getPaging(params);
  const sortBy = (pg.sortBy ?? MIN_NEXT_ITER_AT) as ProjectSortBy;
  return { ...pg, sortBy };
}

