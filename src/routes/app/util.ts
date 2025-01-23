import type { MIN_NEXT_ITER_AT } from "$lib/const";
import { project } from "$lib/server/db/schema";

export type ProjectSortBy = keyof typeof project.$inferSelect | typeof MIN_NEXT_ITER_AT;

