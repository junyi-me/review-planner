import type { Iteration, ProjectRow } from "./server/db/schema";

export type TaskPartial = {
  id?: number;
  name: string;
  projectId: number;
  link?: string;
  description?: string;
  iterations: Iteration[];
}

export type CreateTaskReq = {
  task: TaskPartial;
}

export type PutTaskReq = {
  task: TaskPartial;
}

export type PutTaskResp = {
  doneAt: string | null;
  nextIterAt: string | null;
}

export type ProjectPartial = {
  id?: number;
  name: string;
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
}

