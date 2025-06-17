import type { Cookies } from "@sveltejs/kit";

export const COOKIE = Object.freeze({
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
} as const;

const ACCESS_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  path: "/",
}

const REFRESH_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  path: "/auth/refresh",
}

export function setAuthCookies(cookies: Cookies, accessToken: string, refreshToken: string, accessExp: number, refreshExp: number = 30 * 24 * 60 * 60) {
  cookies.set(COOKIE.ACCESS_TOKEN, accessToken, {...ACCESS_COOKIE_OPTIONS, maxAge: accessExp });
  cookies.set(COOKIE.REFRESH_TOKEN, refreshToken, { ...REFRESH_COOKIE_OPTIONS, maxAge: refreshExp }); // 30 days
}

export function deleteAuthCookies(cookies: Cookies) {
  cookies.delete(COOKIE.ACCESS_TOKEN, ACCESS_COOKIE_OPTIONS);
  cookies.delete(COOKIE.REFRESH_TOKEN, REFRESH_COOKIE_OPTIONS);
}

