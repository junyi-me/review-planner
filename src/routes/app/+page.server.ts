import { db } from "$lib/server/db";
import { project } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const projects = await db.select().from(project);
}

