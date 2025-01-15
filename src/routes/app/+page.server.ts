import { db } from "$lib/server/db";
import { project, task } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { getTokenPayload } from "$lib/server/util";
import { getProjectPaging, MIN_NEXT_ITER_AT } from "./util";
import type { GetProjectResp } from "$lib/api";

export const load: PageServerLoad = async ({ url, locals }) => {
  const user = getTokenPayload(locals);
  const opts = getProjectPaging(url.searchParams);

  const sq = db.select({
    projectId: task.projectId,
    min_next_iter_at: sql<Date>`min(${task.nextIterAt})`.as(MIN_NEXT_ITER_AT),
  }).from(task).groupBy(task.projectId).as('task');

  const projects = await db.select().from(project)
    .fullJoin(sq, eq(project.id, sq.projectId))
    .where(eq(project.ownerId, user.userId))
    .orderBy(sql`${opts.sortBy} ${opts.getDesc()} NULLS LAST`)
    .limit(opts.pageSize).offset(opts.getOffset());

  return { projects } as GetProjectResp;
}

