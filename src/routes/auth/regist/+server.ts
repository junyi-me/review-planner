import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { hashPassword } from "$lib/server/password";
import type { RequestEvent } from "./$types";
import type { RegistReq } from "./util";

export async function POST({ request }: RequestEvent) {
  const body = await request.json() as RegistReq;

  const cpass = await hashPassword(body.password);
  await db.insert(user).values({
    email: body.email,
    password: cpass,
    name: body.name
  });

  return new Response(null, { status: 201 });
}

