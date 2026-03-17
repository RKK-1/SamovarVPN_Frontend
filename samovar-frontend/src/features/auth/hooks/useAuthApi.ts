import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '@shared/config/api';
import { saveAuthData } from '@shared/lib/authStorage';

interface AuthResponse {
  token?: string;
  email?: string;
  telegram_id?: string;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }

  return (await res.json()) as T;
}

export function useAuthApi() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const afterAuth = useCallback(
    (data: AuthResponse) => {
      saveAuthData({
        token: data.token,
        email: data.email,
        telegramId: data.telegram_id,
      });

      const next = searchParams.get('next');

      if (next === 'pay') {
        navigate('/?next=pay', { replace: true });
        return;
      }

      if (next === 'bot') {
        window.open('https://t.me/SamovarVPN_Bot', '_blank');
        navigate('/account', { replace: true });
        return;
      }

      navigate('/account', { replace: true });
    },
    [navigate, searchParams],
  );

  const registerWithEmail = useCallback(
    async (email: string, password: string) => {
      const data = await postJson<AuthResponse>(`${API_BASE_URL}/register`, { email, password });
      afterAuth(data);
    },
    [afterAuth],
  );

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      const data = await postJson<AuthResponse>(`${API_BASE_URL}/login`, { email, password });
      afterAuth(data);
    },
    [afterAuth],
  );

  const requestTelegramCode = useCallback(async (telegramId: string) => {
    await postJson<unknown>(`${API_BASE_URL}/login-by-telegram`, { telegram_id: telegramId });
  }, []);

  const confirmTelegramCode = useCallback(
    async (telegramId: string, code: string) => {
      const data = await postJson<AuthResponse>(`${API_BASE_URL}/login-by-telegram-password`, {
        telegram_id: telegramId,
        code,
      });
      afterAuth(data);
    },
    [afterAuth],
  );

  return {
    registerWithEmail,
    loginWithEmail,
    requestTelegramCode,
    confirmTelegramCode,
  };
}

