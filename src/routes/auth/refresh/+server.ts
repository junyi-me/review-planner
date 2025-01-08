import { COOKIE, setAccessCookie } from "$lib/server/cookie";
import { verifyToken } from "$lib/server/jwt";
import type { RequestEvent } from "@sveltejs/kit";

export async function POST({ cookies }: RequestEvent) {
  const refreshToken = cookies.get(COOKIE.REFRESH_TOKEN.key);
  const payload = refreshToken ? verifyToken(refreshToken) : null;
  if (!refreshToken || !payload) {
    return new Response(null, { status: 401 });
  }

  setAccessCookie(cookies, payload.userId);
  return new Response(null, { status: 200 });
}

