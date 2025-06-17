import { env } from "$env/dynamic/private";
import { setAuthCookies } from "$lib/server/cookie";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestEvent } from "../../$types";
import { json, redirect } from '@sveltejs/kit';

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
  const tokenData = await resp.json();
  /*
  {
    access_token: "...",
    refresh_token: "...",
    expires_in: 3600,
    token_type: "Bearer",
    scope: "openid profile email"
  }
  */

  // get user info from access token
  const infoResp = await fetch(env.AUTH_INFO_URL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });
  if (!infoResp.ok) {
    console.error('Failed to fetch user info:', await infoResp.text());
    throw redirect(302, '/'); // TODO error page
  }
  const userData = await infoResp.json();

  // if new user, insert into database
  const users = await db.select({ id: user.id }).from(user). where(eq(user.email, userData.email));
  if (users.length === 0) {
    await db.insert(user).values({
      id: userData.sub,
      name: userData.name,
      email: userData.email,
    });
  }

  setAuthCookies(cookies, tokenData.access_token, tokenData.refresh_token, tokenData.expires_in);
  throw redirect(302, '/app');
}

