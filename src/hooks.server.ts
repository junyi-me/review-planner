import { COOKIE } from "$lib/server/const";
import { verifyToken } from "$lib/server/jwt";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const redir = () => {
    event.cookies.delete(COOKIE.ACCESS_TOKEN.key, COOKIE.ACCESS_TOKEN.options);
    return redirect(302, "/auth/logout");
  };

  if (event.url.pathname.startsWith("/app")) {
    const token = event.cookies.get(COOKIE.ACCESS_TOKEN.key);
    if (!token) return redir();

    try {
      verifyToken(token);
    } catch (e) {
      console.error(e);
      redir();
    }
  }

	return await resolve(event);
};

