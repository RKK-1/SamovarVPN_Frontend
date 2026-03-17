import { useState } from 'react';
import { API_BASE_URL } from '@shared/config/api';

export type PaymentPlanId = '1month' | '3months' | '6months';

const PLAN_NAMES: Record<PaymentPlanId, string> = {
  '1month': '1 Месяц',
  '3months': '3 Месяца',
  '6months': '6 Месяцев',
};

export interface PaymentState {
  plan: PaymentPlanId | '';
  amount: number;
  planName: string;
}

export function usePayment() {
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<PaymentState>({
    plan: '',
    amount: 0,
    planName: '',
  });

  const openForPlan = (plan: PaymentPlanId, amount: number) => {
    setState({
      plan,
      amount,
      planName: PLAN_NAMES[plan],
    });
    setPaymentOpen(true);
  };

  const closePayment = () => setPaymentOpen(false);
  const closeSuccess = () => setSuccessOpen(false);

  const processPayment = async (email: string) => {
    if (!state.plan || !state.amount) return;
    if (!email.includes('@')) {
      throw new Error('Пожалуйста, введите корректный email');
    }

    localStorage.setItem('last_payment_email', email);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: state.plan,
          amount: state.amount,
          email,
          payment_method: 'yookassa',
        }),
      });
      const data = await response.json();
      if (data.success && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error(data.message || 'Ошибка: попробуйте позже');
      }
    } finally {
      setLoading(false);
    }
  };

  const openSuccess = () => {
    setSuccessOpen(true);
  };

  return {
    state,
    isPaymentOpen,
    isSuccessOpen,
    loading,
    openForPlan,
    closePayment,
    closeSuccess,
    processPayment,
    openSuccess,
  };
}

