import { validateProject, type PutProjectReq } from "$lib/api";
import { db } from "$lib/server/db";
import { project } from "$lib/server/db/schema";
import type { RequestEvent } from "./$types";

export async function POST({ locals, request }: RequestEvent) {
  const user = locals.user!;
  const body = await request.json() as PutProjectReq;
  const pProj = body.project;

  const err = validateProject(pProj);
  if (err) {
    return new Response(JSON.stringify(err), { status: 400 });
  }

  const projs = await db.insert(project).values({
    ownerId: user.sub,
    name: pProj.name,
    link: pProj.link,
    description: pProj.description,
    offsetDays: pProj.offsetDays,
  }).returning({ id: project.id });

  if (projs.length !== 1) {
    console.error("Failed to create project");
    return new Response(null, { status: 500 });
  }

  return new Response(JSON.stringify(projs[0]), { status: 201 });
}

