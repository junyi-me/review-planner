import type { Cookies } from "@sveltejs/kit";
import { signToken } from "./jwt";

export const COOKIE = Object.freeze({
  ACCESS_TOKEN: {
    key: "access_token",
    options: { path: "/" }
  },
  REFRESH_TOKEN: {
    key: "refresh_token",
    options: { path: "/auth/refresh" }
  },
});

export function setAccessCookie(cookies: Cookies, userId: number) {
  cookies.set(COOKIE.ACCESS_TOKEN.key, signToken(userId), COOKIE.ACCESS_TOKEN.options);
}

