import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmail, getTelegramId } from '@shared/lib/authStorage';
import {
  fetchLicenseByEmail,
  fetchLicenseByTelegram,
  fetchSubscriptionByEmail,
  fetchSubscriptionByTelegram,
} from '../api';
import type { SubscriptionInfo, SubscriptionRaw, LicenseResponse } from '../types';

function normalizeSubscription(raw: SubscriptionRaw, email: string | null, tgId: string | null): SubscriptionInfo {
  const active =
    (raw.active_sub || 0) > 0 || Boolean(raw.has_subscription || raw.hasSubscription);
  const balance = raw.balance !== undefined ? Number(raw.balance || 0) : NaN;
  const daysLeft = Number.isFinite(balance) ? Math.floor(balance / 5) : null;
  const freeCount = raw.free !== undefined ? Number(raw.free || 0) : 0;

  return {
    ...raw,
    emailOrTg: email || (tgId ? `Telegram ID: ${tgId}` : '—'),
    telegramId: tgId,
    isActive: active,
    daysLeft,
    rouletteBlocked: freeCount > 1,
  };
}

function extractLicenseKey(payload: LicenseResponse): string | null {
  return payload.license_key || payload.licensekey || payload.link || null;
}

export interface AccountDataState {
  subscription: SubscriptionInfo | null;
  licenseKey: string | null;
  loading: boolean;
  error: string | null;
}

export function useAccountData(): [AccountDataState, () => Promise<void>] {
  const navigate = useNavigate();
  const [state, setState] = useState<AccountDataState>({
    subscription: null,
    licenseKey: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    const email = getEmail();
    const tgId = getTelegramId();

    if (!email && !tgId) {
      navigate('/auth?next=bot', { replace: true });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      let subRaw: SubscriptionRaw;
      if (tgId) {
        subRaw = await fetchSubscriptionByTelegram(tgId);
      } else if (email) {
        subRaw = await fetchSubscriptionByEmail(email);
      } else {
        throw new Error('Нет данных для загрузки подписки.');
      }

      const subscription = normalizeSubscription(subRaw, email, tgId);

      let licenseKey: string | null = null;
      if (subRaw.link) {
        licenseKey = subRaw.link;
      } else {
        let licPayload: LicenseResponse;
        if (tgId) {
          licPayload = await fetchLicenseByTelegram(tgId);
        } else if (email) {
          licPayload = await fetchLicenseByEmail(email);
        } else {
          throw new Error('Нет данных для загрузки ключа.');
        }

        licenseKey = extractLicenseKey(licPayload);
      }

      setState({
        subscription,
        licenseKey: licenseKey || 'Ключ еще не создан. Купите подписку.',
        loading: false,
        error: null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось загрузить данные подписки.';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
        subscription: prev.subscription,
      }));
    }
  }, [navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  return [state, load];
}

