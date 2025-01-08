import { goto } from "$app/navigation";

async function refreshToken() {
  const response = await fetch("/auth/refresh", { method: "POST" });
  if (response.ok) {
    return true;
  }
  return false;
};


export async function obtain(url: string, options: RequestInit = {}) {
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

