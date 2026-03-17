import { useState, useMemo } from 'react';

export type AuthMode = 'login' | 'register';
export type AuthMethod = 'email' | 'telegram';

export function useAuthFlow() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [method, setMethod] = useState<AuthMethod>('email');

  const titles = useMemo(() => {
    if (method === 'email') {
      return mode === 'login'
        ? {
            title: 'Вход по email',
            description: 'Введи свой email и пароль, чтобы войти в кабинет.',
            submitText: 'Войти',
          }
        : {
            title: 'Регистрация по email',
            description: 'Создай аккаунт по email, мы отправим тебе данные в бота.',
            submitText: 'Создать аккаунт',
          };
    }

    return mode === 'login'
      ? {
          title: 'Вход через Telegram',
          description: 'Открой бота Samovar VPN, следуй инструкциям и введи код подтверждения.',
          submitText: 'Подтвердить вход',
        }
      : {
          title: 'Регистрация через Telegram',
          description: 'Перейди в бота Samovar VPN и активируй доступ. После этого вернись в кабинет.',
          submitText: 'Продолжить',
        };
  }, [mode, method]);

  return {
    mode,
    method,
    setMode,
    setMethod,
    titles,
  };
}

