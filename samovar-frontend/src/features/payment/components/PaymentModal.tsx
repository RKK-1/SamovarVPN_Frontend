import React, { useEffect, useState } from 'react';
import type { PaymentState } from '../hooks/usePayment';

function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  const at = trimmed.indexOf('@');
  return at > 0 && at < trimmed.length - 1 && trimmed.includes('.', at);
}

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
  loading: boolean;
  state: PaymentState;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, onSubmit, loading, state }) => {
  const [email, setEmail] = useState(() => localStorage.getItem('sv_auth_email') || '');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setEmailError(null);
      setFormError(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEmailError(null);
    setFormError(null);

    if (!email.trim()) {
      setEmailError('Введите email');
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError('Введите корректный email (например, name@mail.ru)');
      return;
    }

    try {
      await onSubmit(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось создать платёж. Попробуйте позже.';
      setFormError(message);
    }
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose} aria-label="Закрыть">
          &times;
        </button>
        <h2 style={{ marginBottom: 24 }}>Оформление подписки</h2>
        <div className="payment-summary">
          <p style={{ marginBottom: 8 }}>
            Тариф: <strong id="selected-plan-name">{state.planName || '-'}</strong>
          </p>
          <p>
            К оплате:{' '}
            <strong
              style={{ color: 'var(--primary)', fontSize: 20 }}
              id="selected-amount"
            >
              {state.amount || 0}
            </strong>{' '}
            ₽
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${emailError ? 'has-error' : ''}`}>
            <label htmlFor="payment-email">Твой актуальный Email</label>
            <input
              id="payment-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
                setFormError(null);
              }}
              placeholder="example@gmail.com"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? 'payment-email-error' : undefined}
            />
            {emailError && (
              <div id="payment-email-error" className="field-error" role="alert">
                {emailError}
              </div>
            )}
            <p className="field-hint">На эту почту мы отправим подтверждение и ключ доступа.</p>
          </div>
          {formError && (
            <div className="form-error" role="alert">
              {formError}
            </div>
          )}
          <button
            className="btn btn-cyan"
            type="submit"
            style={{ width: '100%', height: 56 }}
            disabled={loading}
          >
            {loading ? <i className="fas fa-spinner fa-spin" /> : 'Оплатить картой'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;

