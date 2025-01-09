import type { PageServerLoad } from "./$types";
import { COOKIE } from "$lib/server/cookie";

export const load: PageServerLoad = async ({ cookies }) => {
  cookies.delete(COOKIE.ACCESS_TOKEN.key, COOKIE.ACCESS_TOKEN.options);
  cookies.delete(COOKIE.REFRESH_TOKEN.key, COOKIE.REFRESH_TOKEN.options);

  return {};
}

