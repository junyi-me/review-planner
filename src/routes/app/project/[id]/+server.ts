import type { RequestEvent } from "./$types";
import { getTokenPayload } from "$lib/server/util";
import type { PutProjectReq } from "$lib/api";
import { and, eq } from "drizzle-orm";
import { project } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { MAX_ITERATIONS } from "$lib/const";

export async function PUT({ params, locals, request }: RequestEvent) {
  const projId = parseInt(params.id);
  const user = getTokenPayload(locals);
  const body = await request.json() as PutProjectReq;
  const pProj = body.project;

  // validation
  if (Object.keys(pProj).length === 0) {
    return new Response(null, { status: 400 });
  }
  if (pProj.offsetDays && pProj.offsetDays.length > MAX_ITERATIONS) {
    return new Response(JSON.stringify({
      error: "Too many iterations",
    }), { status: 400 });
  }

  const projects = await db.select().from(project)
    .where(and(eq(project.ownerId, user.userId), eq(project.id, projId)));
  if (projects.length !== 1) {
    console.error("Project not found", { projId, userId: user.userId });
    return new Response(null, { status: 404 });
  }

  await db.update(project).set({
    name: pProj.name,
    description: pProj.description,
    offsetDays: pProj.offsetDays,
  }).where(eq(project.id, projId));

  return new Response(null, { status: 200 });
}

