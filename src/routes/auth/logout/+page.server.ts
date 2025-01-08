import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { INVALIDATE_LOGIN_PARAM } from "../../util";
import { COOKIE } from "$lib/server/cookie";

export const load: PageServerLoad = async ({ cookies }) => {
  cookies.delete(COOKIE.ACCESS_TOKEN.key, COOKIE.ACCESS_TOKEN.options);
  cookies.delete(COOKIE.REFRESH_TOKEN.key, COOKIE.REFRESH_TOKEN.options);

  throw redirect(302, `/?${INVALIDATE_LOGIN_PARAM}`);
}

