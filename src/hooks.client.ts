import { goto } from '$app/navigation';

export const handleFetch = async ({ fetch }: { fetch: typeof window.fetch }) => {
  const refreshToken = async () => {
    const response = await fetch("/auth/refresh", { method: "POST" });
    if (response.ok) {
      return true;
    }
    return false;
  };

  return async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(input, init);

    if (response.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry the original request
        return fetch(input, init);
      } else {
        // If refresh fails, redirect to logout
        goto('/auth/logout');
      }
    }

    return response;
  };
};

