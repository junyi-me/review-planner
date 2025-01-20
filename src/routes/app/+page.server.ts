import type { PageServerLoad } from "./$types";
import { getTokenPayload } from "$lib/server/util";
import type { GetProjectResp } from "$lib/api";
import { getProjectPaging, getProjects } from "./query.server";

export const load: PageServerLoad = async ({ url, locals }) => {
  const user = getTokenPayload(locals);
  const opts = getProjectPaging(url.searchParams);
  const projects = await getProjects(opts, user);
  return { projects } as GetProjectResp;
}

