import { deleteAccessToken } from "../logout/util";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  deleteAccessToken(cookies);
}

