import type { PageServerLoad } from "./$types";
import type { GetProjectResp, UserInfo } from "$lib/api";
import { getProjectCount, getProjectPaging, getProjects } from "./query.server";

export const load: PageServerLoad = async ({ url, locals }) => {
  const user = locals.user!;
  const opts = getProjectPaging(url.searchParams);
  const projects = await getProjects(opts, user.sub);
  const count = await getProjectCount(user.sub);

  const resp = { 
    projects: { projects, total: count } as GetProjectResp,
    user: null as UserInfo|null,
  }

  const params = url.searchParams;
  if (params.has("name") && params.get("email")) {
    resp.user = {
      name: params.get("name")!,
      email: params.get("email")!,
    }
  }

  return resp;
}

