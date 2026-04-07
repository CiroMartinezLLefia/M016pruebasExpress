function normalizeBaseUrl(rawUrl) {
  const fallback = 'http://localhost:3001';
  const value = (rawUrl || '').trim();

  if (!value) {
    return fallback;
  }

  if (/^https?:\/\//i.test(value)) {
    return value.replace(/\/+$/, '');
  }

  // Si falta protocolo (caso comun en Vercel env vars), forzamos https.
  return `https://${value.replace(/^\/+/, '').replace(/\/+$/, '')}`;
}

const API_BASE = normalizeBaseUrl(import.meta.env.VITE_API_URL);

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
