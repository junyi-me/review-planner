import { setLoadingState, setToastState } from "./store/global.svelte";

export async function obtain(url?: string, options: RequestInit = {}) {
  if (!url) {
    url = window.location.pathname;
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const newOpts: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return await fetch(url, newOpts);
}

export async function setIterDone(taskId: number, iterIdx: number, done: boolean) {
  setLoadingState(true);

  const resp = await obtain(`/app/task/${taskId}/iteration/${iterIdx}`, {
    method: "PATCH",
    body: JSON.stringify({ done }),
  });

  setLoadingState(false);
  if (resp.ok) {
    return;
  }

  console.error("Failed to update", resp);
  setToastState({ type: "error", message: "Failed to update" });
  throw new Error("Failed to update");
}

