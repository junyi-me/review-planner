import { COOKIE } from "$lib/server/cookie";
import { decodeAccessToken } from "$lib/server/jwt";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  let access = event.cookies.get(COOKIE.ACCESS_TOKEN);

  if (event.url.pathname.startsWith("/app") && !access) {
    throw redirect(302, '/auth/refresh?redirect=' + encodeURIComponent(event.url.pathname + event.url.search));
  }

  const payload = await decodeAccessToken(access!);
  // @ts-ignore
  event.locals.user = payload;

	return await resolve(event);
};

