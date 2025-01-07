import { COOKIE } from '$lib/server/const';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.cookies.get(COOKIE.ACCESS_TOKEN.key);

	return await resolve(event);
};

