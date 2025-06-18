import type { Cookies } from "@sveltejs/kit";

export const COOKIE = Object.freeze({
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  ID_TOKEN: "id_token",
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

const ID_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  path: "/auth/logout",
}

export function setAuthCookies(cookies: Cookies, accessToken: string, refreshToken: string, idToken: string, accessExp: number, refreshExp: number = 30 * 24 * 60 * 60) {
  cookies.set(COOKIE.ACCESS_TOKEN, accessToken, {...ACCESS_COOKIE_OPTIONS, maxAge: accessExp });
  cookies.set(COOKIE.REFRESH_TOKEN, refreshToken, { ...REFRESH_COOKIE_OPTIONS, maxAge: refreshExp });
  cookies.set(COOKIE.ID_TOKEN, idToken, { ...ID_COOKIE_OPTIONS, maxAge: refreshExp });
}

export function deleteAuthCookies(cookies: Cookies) {
  cookies.delete(COOKIE.ACCESS_TOKEN, ACCESS_COOKIE_OPTIONS);
  cookies.delete(COOKIE.REFRESH_TOKEN, REFRESH_COOKIE_OPTIONS);
  cookies.delete(COOKIE.ID_TOKEN, ID_COOKIE_OPTIONS);
}

