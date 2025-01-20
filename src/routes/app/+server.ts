import { getTokenPayload } from "$lib/server/util";
import type { RequestEvent } from "./$types";
import { getProjectPaging, getProjects } from "./query.server";

export async function GET({ url, locals }: RequestEvent) {
  const user = getTokenPayload(locals);
  const opts = getProjectPaging(url.searchParams);
  const projects = await getProjects(opts, user);
  return new Response(JSON.stringify({ projects }), { status: 200 });
}

