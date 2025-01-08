import { COOKIE } from "$lib/server/cookie";
import { verifyToken } from "$lib/server/jwt";
import { redirect, type Handle } from "@sveltejs/kit";
import { REDIRECT_TO_PARAM } from "./routes/auth/refresh/util";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/app")) {
    const token = event.cookies.get(COOKIE.ACCESS_TOKEN.key);
    if (!token || !verifyToken(token)) {
      event.cookies.delete(COOKIE.ACCESS_TOKEN.key, COOKIE.ACCESS_TOKEN.options);
      return redirect(302, `/auth/refresh?${REDIRECT_TO_PARAM}=${encodeURIComponent(event.url.pathname)}`);
    }
  }

	return await resolve(event);
};

