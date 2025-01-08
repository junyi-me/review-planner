import { db } from "$lib/server/db";
import { project } from "$lib/server/db/schema";
import type { TokenPayload } from "$lib/server/jwt";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  // @ts-ignore
  const user = locals.user as TokenPayload;

  const projects = await db.select().from(project).where(eq(project.ownerId, user.userId));

  return { projects };
}

