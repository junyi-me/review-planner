import { env } from "$env/dynamic/private";
import { COOKIE, setAuthCookies } from "$lib/server/cookie";
import type { RequestEvent } from "../../$types";
import { redirect } from '@sveltejs/kit';

export async function GET({ request, url, cookies }: RequestEvent) {
  const refresh = cookies.get(COOKIE.REFRESH_TOKEN);
  if (!refresh) {
    return redirect(302, "/auth/logout");
  }

  const res = await fetch(env.AUTH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh,
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    throw redirect(302, "/auth/logout");
  }
  const data = await res.json();
  setAuthCookies(cookies, data.access_token, data.refresh_token, data.id_token, data.expires_in);

  if (request.headers.get("Content-Type") === "application/json") {
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  throw redirect(302, url.searchParams.get('redirect') || '/app');
}

