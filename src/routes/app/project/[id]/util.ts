import type { ProjectRow, TaskRow } from "$lib/server/db/schema";

export type PageProps = {
  project: ProjectRow;
  tasks: TaskRow[];
};

