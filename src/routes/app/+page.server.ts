import type { PageServerLoad } from "./$types";
import { getTokenPayload } from "$lib/server/util";
import type { GetProjectResp } from "$lib/api";
import { getProjectCount, getProjectPaging, getProjects } from "./query.server";

export const load: PageServerLoad = async ({ url, locals }) => {
  const user = getTokenPayload(locals);
  const opts = getProjectPaging(url.searchParams);
  const projects = await getProjects(opts, user.userId);
  const count = await getProjectCount(user.userId);
  return { projects, total: count } as GetProjectResp;
}

