import { useCallback, useState } from 'react';
import { getTelegramId } from '@shared/lib/authStorage';
import { renewLink } from '../api';
import type { RenewLinkResponse } from '../types';

export interface KeyRenewalState {
  isOpen: boolean;
  timer: number;
  progressPercent: number;
  locked: boolean;
  message: string | null;
  messageType: 'info' | 'success' | 'error' | 'warning' | null;
  renewing: boolean;
}

export function useKeyRenewal(onUpdated?: (payload: RenewLinkResponse) => void) {
  const [state, setState] = useState<KeyRenewalState>({
    isOpen: false,
    timer: 5,
    progressPercent: 100,
    locked: false,
    message: null,
    messageType: null,
    renewing: false,
  });

  const open = useCallback(() => {
    setState({
      isOpen: true,
      timer: 5,
      progressPercent: 100,
      locked: true,
      message: 'Подтверждение станет доступно через 5 секунд.',
      messageType: 'info',
      renewing: false,
    });

    const startedAt = Date.now();
    const totalMs = 5000;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const leftMs = Math.max(0, totalMs - elapsed);
      const timer = Math.ceil(leftMs / 1000);
      const progressPercent = Math.max(0, 100 - (elapsed / totalMs) * 100);

      setState((prev) => ({
        ...prev,
        timer,
        progressPercent,
      }));

      if (leftMs <= 0) {
        window.clearInterval(interval);
        setState((prev) => ({
          ...prev,
          timer: 0,
          progressPercent: 0,
          locked: false,
          message: 'Таймаут прошел. Теперь можно подтвердить смену ключа.',
          messageType: 'success',
        }));
      }
    }, 100);
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      renewing: false,
    }));
  }, []);

  const confirm = useCallback(async () => {
    const tgId = getTelegramId();
    if (!tgId) {
      setState((prev) => ({
        ...prev,
        message: 'Смена ключа работает только для аккаунтов с Telegram ID.',
        messageType: 'warning',
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      renewing: true,
      message: 'Создаем новый ключ и синхронизируем подписку...',
      messageType: 'info',
    }));

    try {
      const payload = await renewLink(tgId);
      onUpdated?.(payload);
      setState((prev) => ({
        ...prev,
        renewing: false,
        message: payload.message || 'Ключ успешно обновлен',
        messageType: 'success',
      }));
      window.setTimeout(() => {
        close();
      }, 900);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось обновить ключ.';
      setState((prev) => ({
        ...prev,
        renewing: false,
        message,
        messageType: 'error',
      }));
    }
  }, [close, onUpdated]);

  return {
    state,
    open,
    close,
    confirm,
  };
}

