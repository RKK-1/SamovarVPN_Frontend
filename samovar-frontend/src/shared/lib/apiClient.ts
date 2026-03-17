import { API_BASE_URL } from '@shared/config/api';

export interface ApiErrorShape {
  detail?: string;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorShape;

  constructor(status: number, message: string, payload?: ApiErrorShape) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  let payload: ApiErrorShape | undefined;

  try {
    const text = await res.text();
    if (text) {
      payload = JSON.parse(text);
    }
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    const message =
      payload?.detail || payload?.message || payload?.error || `Request failed with status ${res.status}`;
    throw new ApiError(res.status, message, payload);
  }

  return (payload as unknown) as T;
}

