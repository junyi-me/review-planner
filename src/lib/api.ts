import type { ProjectRow, TaskRow } from "./server/db/schema";

export type CreateTaskReq = {
  name: string;
  projectId: number;
  iterations: string[];
  link?: string;
  description?: string;
}

export type PutTaskReq = {
  task: TaskRow;
}

export type PutTaskResp = {
  doneAt: string | null;
  nextIterAt: string | null;
}

export type ProjectPartial = {
  name: string;
  description?: string | null;
  offsetDays: number[];
  id?: number;
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

