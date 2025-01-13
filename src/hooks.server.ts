import { COOKIE } from "$lib/server/cookie";
import { verifyToken } from "$lib/server/jwt";
import { redirect, type Handle } from "@sveltejs/kit";
import { REDIRECT_TO_PARAM } from "./routes/auth/refresh/util";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/app")) {
    let token = event.cookies.get(COOKIE.ACCESS_TOKEN.key);
    if (!token || !verifyToken(token)) {
      if (event.request.headers.get("accept")?.includes("application/json")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      return redirect(302, `/auth/refresh?${REDIRECT_TO_PARAM}=${encodeURIComponent(event.url.toString())}`);
    }

    const payload = verifyToken(token!);

    // @ts-ignore
    event.locals.user = payload;
  }

	return await resolve(event);
};

