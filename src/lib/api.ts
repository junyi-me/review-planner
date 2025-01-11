import type { TaskRow } from "./server/db/schema";

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
}

