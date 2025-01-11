type IterType = {
  id: number;
  plannedAt: string;
  doneAt: string | null;
};

export function validateIterDone(iters: IterType[], origIter: IterType, newIter: IterType) {
  const origIdx = iters.findIndex((iter) => iter.id === origIter.id);
  if (origIdx === -1) {
    return false;
  }

  // mark as done
  // = all prior iterations must be done
  if ((origIter.doneAt === null && newIter.doneAt !== null) || (origIter.doneAt !== null && newIter.doneAt !== origIter.doneAt)) {

  }

  return true;
}

