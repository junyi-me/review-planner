import { project } from "$lib/server/db/schema";

export const MIN_NEXT_ITER_AT = "min_next_iter_at";

export type ProjectSortBy = keyof typeof project.$inferSelect | typeof MIN_NEXT_ITER_AT;

