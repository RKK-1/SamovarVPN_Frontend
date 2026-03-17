import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthFlow } from '@features/auth/hooks/useAuthFlow';
import { useAuthApi } from '@features/auth/hooks/useAuthApi';
import { Tabs } from '@shared/ui/Tabs';

const AuthPage: React.FC = () => {
  const { mode, method, setMode, setMethod, titles } = useAuthFlow();
  const { registerWithEmail, loginWithEmail, requestTelegramCode, confirmTelegramCode } = useAuthApi();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [telegramCode, setTelegramCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [telegramCodeRequested, setTelegramCodeRequested] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const next = searchParams.get('next');

  const clearFieldError = (name: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const isValidEmail = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    const at = trimmed.indexOf('@');
    return at > 0 && at < trimmed.length - 1 && trimmed.includes('.', at);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    try {
      if (method === 'email') {
        const errs: Record<string, string> = {};
        if (!email.trim()) errs.email = 'Введите email';
        else if (!isValidEmail(email)) errs.email = 'Введите корректный email (например, name@mail.ru)';
        if (!password) errs.password = 'Введите пароль';
        else if (password.length < 6) errs.password = 'Минимум 6 символов';
        if (Object.keys(errs).length) {
          setFieldErrors(errs);
          return;
        }

        setIsSubmitting(true);
        if (mode === 'login') {
          await loginWithEmail(email, password);
        } else {
          await registerWithEmail(email, password);
        }
        return;
      }

      if (!telegramId.trim()) {
        setFieldErrors({ telegram: 'Введите Telegram ID или @username' });
        return;
      }

      if (!telegramCodeRequested) {
        setIsSubmitting(true);
        await requestTelegramCode(telegramId);
        setTelegramCodeRequested(true);
        setIsSubmitting(false);
        return;
      }

      if (!telegramCode.trim()) {
        setFieldErrors({ telegramCode: 'Введите код из бота' });
        return;
      }

      setIsSubmitting(true);
      await confirmTelegramCode(telegramId, telegramCode);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка. Попробуй ещё раз.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-section">
        <div className="container">
          <div className="auth-card">
            <Tabs
              value={mode}
              onChange={(id) => {
                setMode(id as typeof mode);
                setError(null);
                setFieldErrors({});
              }}
              items={[
                { id: 'login', label: 'Вход' },
                { id: 'register', label: 'Регистрация' },
              ]}
            />

            <Tabs
              value={method}
              onChange={(id) => {
                setMethod(id as typeof method);
                setError(null);
                setFieldErrors({});
              }}
              items={[
                { id: 'email', label: 'По email' },
                { id: 'telegram', label: 'Через Telegram' },
              ]}
            />

            <div className="auth-header">
              <h1>{titles.title}</h1>
              <p>{titles.description}</p>
              {next === 'pay' && (
                <p className="auth-note">
                  После успешного входа мы сразу вернём тебя к оплате выбранного тарифа.
                </p>
              )}
              {next === 'bot' && (
                <p className="auth-note">
                  После входа откроется наш Telegram бот, а затем личный кабинет.
                </p>
              )}
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {method === 'email' ? (
                <>
                  <div className={`form-group ${fieldErrors.email ? 'has-error' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError('email');
                      }}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    />
                    {fieldErrors.email && (
                      <div id="email-error" className="field-error" role="alert">
                        {fieldErrors.email}
                      </div>
                    )}
                  </div>
                  <div className={`form-group ${fieldErrors.password ? 'has-error' : ''}`}>
                    <label htmlFor="password">Пароль</label>
                    <div className="password-input-wrap">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearFieldError('password');
                        }}
                        placeholder="Минимум 6 символов"
                        aria-invalid={Boolean(fieldErrors.password)}
                        aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                      >
                        <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <div id="password-error" className="field-error" role="alert">
                        {fieldErrors.password}
                      </div>
                    )}
                    <p className="field-hint">Минимум 6 символов</p>
                  </div>
                </>
              ) : (
                <>
                  <div className={`form-group ${fieldErrors.telegram ? 'has-error' : ''}`}>
                    <label htmlFor="telegram">Telegram ID или @username</label>
                    <input
                      id="telegram"
                      type="text"
                      value={telegramId}
                      onChange={(e) => {
                        setTelegramId(e.target.value);
                        clearFieldError('telegram');
                      }}
                      placeholder="@username или числовой ID"
                      aria-invalid={Boolean(fieldErrors.telegram)}
                      aria-describedby={fieldErrors.telegram ? 'telegram-error' : undefined}
                    />
                    {fieldErrors.telegram && (
                      <div id="telegram-error" className="field-error" role="alert">
                        {fieldErrors.telegram}
                      </div>
                    )}
                    <p className="field-hint">Числовой ID можно узнать у @userinfobot в Telegram</p>
                  </div>

                  <div className="form-group form-group-inline">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => window.open('https://t.me/SamovarVPN_Bot', '_blank')}
                    >
                      Открыть бота
                    </button>
                  </div>

                  {telegramCodeRequested && (
                    <div className={`form-group ${fieldErrors.telegramCode ? 'has-error' : ''}`}>
                      <label htmlFor="telegramCode">Код из бота</label>
                      <input
                        id="telegramCode"
                        type="text"
                        value={telegramCode}
                        onChange={(e) => {
                          setTelegramCode(e.target.value);
                          clearFieldError('telegramCode');
                        }}
                        placeholder="Введи код подтверждения"
                        aria-invalid={Boolean(fieldErrors.telegramCode)}
                        aria-describedby={fieldErrors.telegramCode ? 'telegramCode-error' : undefined}
                      />
                      {fieldErrors.telegramCode && (
                        <div id="telegramCode-error" className="field-error" role="alert">
                          {fieldErrors.telegramCode}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {error && <div className="form-error" role="alert">{error}</div>}

              <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Обработка...' : titles.submitText}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
