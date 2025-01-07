import { COOKIE } from '$lib/server/const';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
  if (url.pathname.startsWith('/app')) {
    const token = cookies.get(COOKIE.ACCESS_TOKEN.key);
    if (!token) throw redirect(302, '/');
    return;
  }
}

