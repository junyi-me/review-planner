import type { Iteration } from "$lib/server/db/schema";
import { addOffsetToDate, getDateDiff } from "$lib/util";

type IterCanbeDone = Iteration & { canToggle: boolean };
export function convertIters(iterations: Iteration[]): IterCanbeDone[] {
  const lastDoneIdx = iterations.reduce((acc, iter, i) => iter.done ? i : acc, -1);
  return iterations.map((iter, i) => ({
    ...iter,
    canToggle: i === lastDoneIdx || i === lastDoneIdx + 1,
  }));
}

export function updateIterPlannedAt(iters: Iteration[], i: number, newDate: string) {
  const origDate = iters[i].plannedAt;
  const diff = getDateDiff(origDate, newDate);
  return iters.map((iter, j) => {
    if (j < i) return iter;
    return {
      plannedAt: addOffsetToDate(iter.plannedAt, diff),
      done: iter.done,
    }
  });
}

