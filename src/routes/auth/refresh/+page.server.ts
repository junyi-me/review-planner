import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { INVALIDATE_LOGIN_PARAM } from "../../util";
import { verifyToken } from "$lib/server/jwt";
import { COOKIE, setAccessCookie } from "$lib/server/cookie";

export const load: PageServerLoad = async ({ url, cookies }) => {
  const refreshToken = cookies.get(COOKIE.REFRESH_TOKEN.key);
  const payload = refreshToken ? verifyToken(refreshToken) : null;
  if (!refreshToken || !payload) {
    throw redirect(302, `/?${INVALIDATE_LOGIN_PARAM}`);
  }

  setAccessCookie(cookies, payload.userId);

  throw redirect(302, `/redirect?${url.searchParams.toString()}`);
}

