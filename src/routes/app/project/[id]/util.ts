import type { IterationRow, TaskRow } from "$lib/server/db/schema";

export type TaskIterations = TaskRow & {
  iterations: IterationRow[];
}

