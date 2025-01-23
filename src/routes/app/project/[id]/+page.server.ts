import type { PageServerLoad } from "./$types";
import { getTokenPayload } from "$lib/server/util";
import { redirect } from "@sveltejs/kit";
import type { PageProps } from "./util";
import { getTaskCount, getTaskPaging, getTasks } from "./query.server";

export const load: PageServerLoad = async ({ url, params, locals }) => {
  const projId = parseInt(params.id);
  const user = getTokenPayload(locals);

  let project, tasks;
  try {
    ({ project, tasks } = await getTasks(user.userId, projId, getTaskPaging(url.searchParams)));
  } catch (e) {
    console.error("Failed to get tasks", e);
    throw redirect(302, "/app");
  }
  const taskCount = await getTaskCount(projId);

  return { project, tasks, taskCount } as PageProps;
}

