import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const url = new URL(env.AUTH_URL);
	url.searchParams.set('client_id', env.CLIENT_ID);
	url.searchParams.set('redirect_uri', `${env.APP_HOST}/auth/callback`);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('scope', 'openid profile email offline_access');

	throw redirect(302, url.toString());
}

