import { eq, inArray } from "drizzle-orm";
import { db } from ".";
import { iteration, task, type IterationRow, type TaskRow } from "./schema";

export type TaskIterations = TaskRow & {
  iterations: IterationRow[];
}

/**
  * Get task and its iterations for a project, ordered by ascending {@link iteration.plannedAt}
  * @param projId - Project ID
  * @returns Task and its iterations
  */
export async function getOrderedTasksIters(projId: number) {
  const tasks = await db.select().from(task).where(eq(task.projectId, projId)).limit(50);
  if (tasks.length === 0) {
    return [];
  }

  const iters = await db.select().from(iteration).where(inArray(iteration.taskId, tasks.map(t => t.id))).orderBy(iteration.plannedAt);
  const taskIters = tasks.map(t => ({ ...t, iterations: iters.filter(i => i.taskId === t.id) })) as TaskIterations[];

  return taskIters;
}

