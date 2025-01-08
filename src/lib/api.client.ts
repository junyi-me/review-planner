export async function obtain(url: string, options: RequestInit = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const newOpts: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return fetch(url, newOpts);
}

