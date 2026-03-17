import { useCallback, useState } from 'react';
import { getTelegramId } from '@shared/lib/authStorage';
import { deleteDevices, fetchDevices } from '../api';
import type { Device, DevicesResponse } from '../types';

function normalizeDevices(payload: DevicesResponse): Device[] {
  const source = Array.isArray(payload) ? payload : payload?.devices || [];

  return source.map((item, index) => ({
    title: item.device_model || item.deviceModel || `Устройство ${item.index || index + 1}`,
    platform: [item.platform, item.os_version].filter(Boolean).join(' '),
    location: item.user_agent || '',
    status: 'active' as const,
    lastSeen: item.last_seen || 'Нет данных',
    version: item.hwid ? `HWID: ${item.hwid}` : '',
  }));
}

export interface DevicesState {
  items: Device[];
  loading: boolean;
  error: string | null;
  canDelete: boolean;
}

export function useDevices(): [DevicesState, () => Promise<void>, () => Promise<void>] {
  const [state, setState] = useState<DevicesState>({
    items: [],
    loading: false,
    error: null,
    canDelete: false,
  });

  const load = useCallback(async () => {
    const tgId = getTelegramId();

    if (!tgId) {
      setState({
        items: [],
        loading: false,
        error: 'Чтобы показать устройства, войдите через Telegram или привяжите Telegram ID.',
        canDelete: false,
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null, canDelete: true }));

    try {
      const payload = await fetchDevices(tgId);
      const items = normalizeDevices(payload);
      setState({
        items,
        loading: false,
        error: items.length ? null : 'API ответил, но не вернул ни одного устройства.',
        canDelete: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка загрузки устройств.';
      setState({
        items: [],
        loading: false,
        error: message,
        canDelete: false,
      });
    }
  }, []);

  const deleteAll = useCallback(async () => {
    const tgId = getTelegramId();
    if (!tgId) {
      setState((prev) => ({
        ...prev,
        error: 'Удаление устройств доступно только для аккаунта с Telegram ID.',
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await deleteDevices(tgId);
      await load();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось удалить устройства.';
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }, [load]);

  return [state, load, deleteAll];
}

