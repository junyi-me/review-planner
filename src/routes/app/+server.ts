import { getTokenPayload } from "$lib/server/util";
import type { RequestEvent } from "./$types";
import { getProjects } from "./query.server";
import { getProjectPaging } from "./util";

export async function GET({ url, locals }: RequestEvent) {
  const user = getTokenPayload(locals);
  const opts = getProjectPaging(url.searchParams);
  const projects = await getProjects(opts, user);
  return new Response(JSON.stringify({ projects }), { status: 200 });
}

