import type { IterationRow } from "$lib/server/db/schema";

export type IterCanBeDone = IterationRow & { canbeDone: boolean };

