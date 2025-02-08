import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { getTokenPayload } from "$lib/server/util";
import type { RequestEvent } from "./$types";
import { and, eq, gte, lte } from "drizzle-orm";
import type { GetCalendarTasksReq } from "./util";

export async function POST({ locals, request }: RequestEvent) {
  const user = getTokenPayload(locals);
  const { from, to } = await request.json() as GetCalendarTasksReq;
  const tasks = await db.select({ task, projectId: project.id }).from(task)
    .leftJoin(project, eq(task.projectId, project.id))
    .where(and(eq(project.ownerId, user.userId), gte(task.firstIterAt, from), lte(task.firstIterAt, to)))
  return new Response(JSON.stringify({ tasks }), { status: 200 });
}

