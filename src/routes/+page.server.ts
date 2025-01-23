import { getTokenPayload } from "$lib/server/util";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const user = getTokenPayload(locals);
  if (user) {
    throw redirect(302, "/app");
  }
}

