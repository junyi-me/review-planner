export type CreateTaskReq = {
  name: string;
  projectId: number;
  iterations: string[];
  link?: string;
  description?: string;
}

