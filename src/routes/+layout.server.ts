import type { TokenPayload } from "$lib/server/jwt";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals }) => {
  // @ts-ignore
  const user = locals.user as TokenPayload;
  if (!user) {
    return {}
  } 

	return {
    user: {
      email: user.email,
      name: user.name,
    }
	};
};

