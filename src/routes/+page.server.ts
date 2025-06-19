import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { COOKIE } from "$lib/server/cookie";

export const load: PageServerLoad = async ({ cookies, locals }) => {
  const user = locals.user;
  if (user) {
    throw redirect(302, "/app");
  }

  if (cookies.get(COOKIE.LOGGED_IN)) {
    throw redirect(302, "/auth/refresh");
  }
}

