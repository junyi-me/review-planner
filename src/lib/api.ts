import { MAX_ITERATIONS } from "./const";
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

