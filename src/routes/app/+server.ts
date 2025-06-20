import type { RequestEvent } from "./$types";
import { getProjectPaging, getProjects } from "./query.server";

export async function GET({ url, locals }: RequestEvent) {
  const user = locals.user!;
  const opts = getProjectPaging(url.searchParams);
  const projects = await getProjects(opts, user.sub);
  return new Response(JSON.stringify({ projects }), { status: 200 });
}

