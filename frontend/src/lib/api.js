const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function buildUrl(path) {
  return `${API_BASE}${path}`;
}

export async function api(path, options = {}, token = '') {
  const headers = {
    ...(options.headers || {})
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers
  });

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const error = new Error(data?.error || data?.message || 'Error API');
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}
