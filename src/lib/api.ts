import { asc, desc, SQL, type AnyColumn, type SQLWrapper } from "drizzle-orm";
import { DEFAULT_PAGE_SIZE, MAX_ITERATIONS } from "./const";
import type { Iteration, ProjectRow } from "./server/db/schema";

export type TaskPartial = {
  id?: number;
  name: string;
  projectId: number;
  link?: string | null;
  description?: string | null;
  iterations: Iteration[];
}

export type CreateTaskReq = {
  task: TaskPartial;
}

export type PutTaskReq = {
  task: TaskPartial;
}

export type PutTaskResp = {
  done: boolean;
  nextIterAt: string | null;
}

export type ProjectPartial = {
  id?: number;
  name: string;
  link?: string | null;
  description?: string | null;
  offsetDays: number[];
}

export type PutProjectReq = {
  project: ProjectPartial;
}

export type ProjectMinIter = {
  project: ProjectRow;
  task: {
    min_next_iter_at: string;
  } | null;
}

export type GetProjectResp = {
  projects: ProjectMinIter[];
  total: number;
}

export type UserInfo = {
  name: string;
  email: string;
}

export type AppData = {
  user: UserInfo | null;
  projects: GetProjectResp;
}

export function validateProject(project: ProjectPartial) {
  if (project.name === "") {
    return "Project must have a name";
  }
  if (project.offsetDays.length >= MAX_ITERATIONS) {
    return "Too many iterations";
  }

  if (project.offsetDays.length === 1) {
    return null;
  }

  for (let i = 1; i < project.offsetDays.length; i++) {
    if (project.offsetDays[i] <= project.offsetDays[i - 1]) {
      return "Iterations must be in order";
    }
  }

  return null;
}

export function validateTask(task: TaskPartial) {
  if (task.name === "") {
    return "Task must have a name";
  }

  if (task.iterations.length === 0) {
    return "Task must have at least one iteration";
  }
  if (task.iterations.length > MAX_ITERATIONS) {
    return "Too many iterations";
  }

  if (task.iterations.length === 1) {
    return null;
  }

  for (let i = 1; i < task.iterations.length; i++) {
    if (task.iterations[i].plannedAt <= task.iterations[i - 1].plannedAt) {
      return "Iterations must be in order";
    }
  }

  return null;
}

// common URL search param keys for different pages
export const URL_PARAM_KEY = Object.freeze({
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
  SORT_BY: 'sortBy',
  DESC: 'desc',
  SEARCH: 'search',
});

export type PageOpts = {
  page: number;
  pageSize: number;
  desc: boolean;
  sortBy: string | null;
  search: string | null;
}

export type PageOptsSql = PageOpts & {
  getOffset: () => number;
  getOrderFn: () => (column: AnyColumn | SQLWrapper) => SQL;
}

export function getPaging(params: URLSearchParams): PageOptsSql {
  return {
    page: params.has(URL_PARAM_KEY.PAGE) ? parseInt(params.get(URL_PARAM_KEY.PAGE)!) : 1,
    pageSize: params.has(URL_PARAM_KEY.PAGE_SIZE) ? parseInt(params.get(URL_PARAM_KEY.PAGE_SIZE)!) : DEFAULT_PAGE_SIZE,
    desc: params.get(URL_PARAM_KEY.DESC) === 'true',
    sortBy: params.get(URL_PARAM_KEY.SORT_BY),
    search: params.get(URL_PARAM_KEY.SEARCH),

    getOffset() {
      return (this.page - 1) * this.pageSize;
    },
    getOrderFn() {
      return this.desc ? desc : asc;
    }
  };
}

export function getPgParams(pg: PageOpts): URLSearchParams {
  const params = new URLSearchParams();
  params.set(URL_PARAM_KEY.PAGE, pg.page.toString());
  params.set(URL_PARAM_KEY.PAGE_SIZE, pg.pageSize.toString());
  if (pg.sortBy) {
    params.set(URL_PARAM_KEY.SORT_BY, pg.sortBy);
  }
  if (pg.desc) {
    params.set(URL_PARAM_KEY.DESC, 'true');
  }
  if (pg.search) {
    params.set(URL_PARAM_KEY.SEARCH, pg.search);
  }
  return params;
}

