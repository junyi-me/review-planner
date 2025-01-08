import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { deleteAccessToken } from "./util";
import { INVALIDATE_LOGIN_PARAM } from "../../util";

export const load: PageServerLoad = async ({ cookies }) => {
  deleteAccessToken(cookies);
  throw redirect(302, `/?${INVALIDATE_LOGIN_PARAM}`);
}

