import type { PageServerLoad } from "./$types";
import { COOKIE, deleteAuthCookies } from "$lib/server/cookie";
import { redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async ({ cookies }) => {
  const idToken = cookies.get(COOKIE.ID_TOKEN)
  const redirectUri = `${env.APP_HOST}/`;

  deleteAuthCookies(cookies);

  if (idToken) {
    const url = `${env.AUTH_LOGOUT_URL}/?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;
		throw redirect(302, url);
	} else {
		throw redirect(302, redirectUri);
	}
}

