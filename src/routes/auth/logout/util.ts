import { COOKIE } from "$lib/server/cookie";
import type { Cookies } from "@sveltejs/kit";

export function deleteAccessToken(cookies: Cookies) {
  cookies.delete(COOKIE.ACCESS_TOKEN.key, COOKIE.ACCESS_TOKEN.options);
}

