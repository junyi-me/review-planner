import type { RequestEvent } from "./$types";
import { validateProject, type PutProjectReq } from "$lib/api";
import { and, eq } from "drizzle-orm";
import { project, task } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { getTaskPaging, getTasks } from "./query.server";

async function getProjectForUser(projId: number, userId: string) {
  return await db.select().from(project)
    .where(and(eq(project.id, projId), eq(project.ownerId, userId)));
}

export async function GET({ url, params, locals }: RequestEvent) {
  const projId = parseInt(params.id);
  const user = locals.user!;
  let { tasks } = await getTasks(user.sub, projId, getTaskPaging(url.searchParams));
  return new Response(JSON.stringify({ tasks }), { status: 200 });
}

export async function PUT({ params, locals, request }: RequestEvent) {
  const projId = parseInt(params.id);
  const user = locals.user!;
  const body = await request.json() as PutProjectReq;
  const pProj = body.project;

  const err = validateProject(pProj);
  if (err) {
    return new Response(JSON.stringify(err), { status: 400 });
  }

  const projects = await getProjectForUser(projId, user.sub);
  if (projects.length !== 1) {
    console.error("Project not found", { projId, userId: user.sub });
    return new Response(null, { status: 404 });
  }

  await db.update(project).set({
    name: pProj.name,
    description: pProj.description,
    offsetDays: pProj.offsetDays,
  }).where(eq(project.id, projId));

  return new Response(null, { status: 200 });
}

export async function DELETE({ params, locals }: RequestEvent) {
  const projId = parseInt(params.id);
  const user = locals.user!;

  const projects = await getProjectForUser(projId, user.sub);
  if (projects.length !== 1) {
    console.error("Task not found", { taskId: projId, userId: user.sub });
    return new Response(null, { status: 404 });
  }

  await db.transaction(async (tx) => {
    await tx.delete(task).where(eq(task.projectId, projId));
    await tx.delete(project).where(eq(project.id, projId));
  });

  return new Response(null, { status: 204 });
}

