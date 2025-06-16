import type { Cookies } from "@sveltejs/kit";

export const COOKIE = Object.freeze({
  ACCESS_TOKEN: "access_token",
  ID_TOKEN: "id_token",
  REFRESH_TOKEN: "refresh_token",
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: '/',
}

export function setAuthCookies(cookies: Cookies, accessToken: string, refreshToken: string, idToken: string, expiresIn: number) {
  cookies.set(COOKIE.ACCESS_TOKEN, accessToken, {...COOKIE_OPTIONS, maxAge: expiresIn });
  cookies.set(COOKIE.ID_TOKEN, idToken, { ...COOKIE_OPTIONS, maxAge: expiresIn });
  cookies.set(COOKIE.REFRESH_TOKEN, refreshToken, { ...COOKIE_OPTIONS, maxAge: 30 * 24 * 60 * 60 }); // 30 days
}

export function deleteAuthCookies(cookies: Cookies) {
  cookies.delete(COOKIE.ACCESS_TOKEN, COOKIE_OPTIONS);
  cookies.delete(COOKIE.ID_TOKEN, COOKIE_OPTIONS);
  cookies.delete(COOKIE.REFRESH_TOKEN, COOKIE_OPTIONS);
}

