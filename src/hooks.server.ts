import { COOKIE } from "$lib/server/cookie";
import { decodeAccessToken } from "$lib/server/jwt";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  let access = event.cookies.get(COOKIE.ACCESS_TOKEN);

  // handle token refresh
  if (event.url.pathname.startsWith("/app") && !access) {
    // JSON requests: return 401 and let the client handle it
    const reqJson = event.request.headers.get("Content-Type")?.includes("application/json");
    if (reqJson) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    // Non-JSON requests: redirect to refresh endpoint
    throw redirect(302, '/auth/refresh?redirect=' + encodeURIComponent(event.url.pathname + event.url.search));
  }

  const payload = await decodeAccessToken(access!);
  // @ts-ignore
  event.locals.user = payload;

	return await resolve(event);
};

