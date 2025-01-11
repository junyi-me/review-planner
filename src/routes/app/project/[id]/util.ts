import type { Iteration, ProjectRow, TaskRow } from "$lib/server/db/schema";

export type PageProps = {
  project: ProjectRow;
  tasks: TaskRow[];
};

type IterCanbeDone = Iteration & { canToggle: boolean };
export function convertIters(iterations: Iteration[]): IterCanbeDone[] {
  const lastDoneIdx = iterations.reduce((acc, iter, i) => iter.done ? i : acc, -1);
  return iterations.map((iter, i) => ({
    ...iter,
    canToggle: i === lastDoneIdx || i === lastDoneIdx + 1,
  }));
}

