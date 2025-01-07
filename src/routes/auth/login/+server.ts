import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from 'drizzle-orm';
import type { RequestEvent } from "./$types";
import { verifyPassword } from "$lib/server/password";
import { COOKIE } from "$lib/server/const";
import { signToken } from "$lib/server/jwt";

type LoginReq = {
  email: string;
  password: string;
}

export async function POST({ request, cookies }: RequestEvent) {
  const body = await request.json() as LoginReq;

  const dbUsers = await db.select()
    .from(user)
    .where(eq(user.email, body.email))
    .limit(1);
  if (dbUsers.length === 0) {
    return new Response(null, { status: 401 });
  }
  const dbUser = dbUsers[0];

  const ok = await verifyPassword(body.password, dbUser.password);
  if (!ok) {
    return new Response(null, { status: 401 });
  }

  cookies.set(COOKIE.ACCESS_TOKEN.key, signToken(dbUser.id), COOKIE.ACCESS_TOKEN.options);

  return new Response(JSON.stringify({
    name: dbUser.name,
    email: dbUser.email
  }), { status: 200 });
}

