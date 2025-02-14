import { and, eq } from "drizzle-orm";
import { db } from ".";
import { project, task, type Iteration } from "./schema";

export async function getTaskForUser(taskId: number, userId: number) {
  return await db.select().from(task).where(eq(task.id, taskId))
    .leftJoin(project, and(eq(task.projectId, project.id), eq(project.ownerId, userId)));
}

export async function updateTaskIterations(taskId: number, iterations: Iteration[]) {
  await db.update(task).set({ 
    iterations,
    nextIterAt: iterations.find((i) => !i.done)?.plannedAt ?? null,
  }).where(eq(task.id, taskId));
}

