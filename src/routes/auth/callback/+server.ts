import { env } from "$env/dynamic/private";
import { setAuthCookies } from "$lib/server/cookie";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestEvent } from "../../$types";
import { json, redirect } from '@sveltejs/kit';
import { getTokenPayload } from "$lib/server/jwt";

export async function GET({ url, cookies, fetch }: RequestEvent) {
  const code = url.searchParams.get('code');
  if (!code) return json({ error: 'Missing code' }, { status: 400 });

  // Exchange code for tokens
  const resp = await fetch(env.AUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${env.APP_HOST}/auth/callback`,
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET
    })
  });

  if (!resp.ok) {
    const error = await resp.json();
    return json({ error }, { status: 400 });
  }
  const data = await resp.json();
  /*
  {
    access_token: "...",
    refresh_token: "...",
    expires_in: 3600,
    token_type: "Bearer",
    scope: "openid profile email"
  }
  */
  const userData = (await getTokenPayload(data.access_token))!;

  // if new user, insert into database
  const users = await db.select({ id: user.id }).from(user). where(eq(user.email, userData.email));
  if (users.length === 0) {
    await db.insert(user).values({
      id: userData.sub,
      name: userData.name,
      email: userData.email,
    });
  }

  setAuthCookies(cookies, data.access_token, data.refresh_token, data.id_token);
  throw redirect(302, '/app');
}

