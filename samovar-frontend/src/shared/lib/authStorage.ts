export const AUTH_TOKEN_KEY = 'sv_auth_token';
export const AUTH_EMAIL_KEY = 'sv_auth_email';
export const AUTH_TG_ID_KEY = 'sv_tg_user_id';

export function saveAuthData(params: { token?: string; email?: string; telegramId?: string }) {
  const { token, email, telegramId } = params;

  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  if (email) {
    localStorage.setItem(AUTH_EMAIL_KEY, email);
  }

  if (telegramId) {
    localStorage.setItem(AUTH_TG_ID_KEY, telegramId);
  }
}

export function clearAuthData() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EMAIL_KEY);
  localStorage.removeItem(AUTH_TG_ID_KEY);
}

export function getEmail(): string | null {
  return localStorage.getItem(AUTH_EMAIL_KEY);
}

export function getTelegramId(): string | null {
  return localStorage.getItem(AUTH_TG_ID_KEY);
}

