import { goto } from "$app/navigation";
import { setLoadingState, setToastState } from "./store/global.svelte";

async function refreshToken() {
  const response = await fetch("/auth/refresh", { method: "POST" });
  if (response.ok) {
    return true;
  }
  return false;
};

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

  const response = await fetch(url, newOpts);

  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      // Retry the original request
      return fetch(url, newOpts);
    } else {
      // If refresh fails, redirect to logout
      goto('/auth/logout');
    }
  }

  return response;
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

