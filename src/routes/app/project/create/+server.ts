import { db } from "$lib/server/db";
import { project } from "$lib/server/db/schema";
import { getTokenPayload } from "$lib/server/util";
import type { RequestEvent } from "./$types";

type CreateReq = {
  name: string;
  description: string;
  offsetDays: number[];
}

export async function POST({ locals, request }: RequestEvent) {
  const user = getTokenPayload(locals);

  const body = await request.json() as CreateReq;
  const projs = await db.insert(project).values({
    ownerId: user.userId,
    name: body.name,
    description: body.description,
    offsetDays: body.offsetDays,
  }).returning({ id: project.id });

  if (projs.length !== 1) {
    console.error("Failed to create project");
    return new Response(null, { status: 500 });
  }

  return new Response(JSON.stringify(projs[0]), { status: 201 });
}

