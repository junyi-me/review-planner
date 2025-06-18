import type { PageServerLoad } from "./$types";
import { COOKIE, deleteAuthCookies } from "$lib/server/cookie";
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async ({ cookies }) => {
  const idToken = cookies.get(COOKIE.ID_TOKEN)

  deleteAuthCookies(cookies);

  if (idToken) {
    const resp = await fetch(`${env.AUTH_LOGOUT_URL}/?id_token_hint=${idToken}`);
    if (!resp.ok) {
      console.error('Failed to log out:', await resp.text());
    }
	}
}

