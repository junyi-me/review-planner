import type { PageServerLoad } from "./$types";
import type { GetProjectResp } from "$lib/api";
import { getProjectCount, getProjectPaging, getProjects } from "./query.server";

export const load: PageServerLoad = async ({ url, locals }) => {
  const user = locals.user!;
  const opts = getProjectPaging(url.searchParams);
  const projects = await getProjects(opts, user.sub);
  const count = await getProjectCount(user.sub);
  return { projects, total: count } as GetProjectResp;
}

