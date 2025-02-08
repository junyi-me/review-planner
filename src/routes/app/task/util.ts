import type { TaskRow } from "$lib/server/db/schema";

export type GetCalendarTasksReq = {
  from: string;
  to: string;
}

export type GetCalendarTasksResp = {
  tasks: {
    task: TaskRow;
    projectId: number;
  }[];
}

