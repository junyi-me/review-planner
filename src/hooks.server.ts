import { env } from "$env/dynamic/private";
import { obtain } from "$lib/api.client";
import { COOKIE, setAuthCookies } from "$lib/server/cookie";
import { getTokenPayload } from "$lib/server/jwt";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  let access = event.cookies.get(COOKIE.ACCESS_TOKEN);
  const refresh = event.cookies.get(COOKIE.REFRESH_TOKEN);

  if (!access && refresh) {
    const res = await obtain(env.AUTH_TOKEN_URL, {
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
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const data = await res.json();
    setAuthCookies(event.cookies, data.access_token, data.refresh_token, data.id_token, data.expires_in);

    access = data.access_token;
  }

  if (event.url.pathname.startsWith("/app") && !access) {
    throw redirect(302, `${env.APP_HOST}/`);
  }

  const payload = await getTokenPayload(access!);
  // @ts-ignore
  event.locals.user = payload;

	return await resolve(event);
};

