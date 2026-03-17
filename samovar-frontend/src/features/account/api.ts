import { requestJson } from '@shared/lib/apiClient';
import type {
  SubscriptionRaw,
  LicenseResponse,
  DevicesResponse,
  RenewLinkResponse,
} from './types';

export function fetchSubscriptionByEmail(email: string) {
  const encoded = encodeURIComponent(email);
  return requestJson<SubscriptionRaw>(`/check-email?email=${encoded}`);
}

export function fetchSubscriptionByTelegram(tgId: string) {
  const encoded = encodeURIComponent(tgId);
  return requestJson<SubscriptionRaw>(`/check-tg-user/${encoded}`);
}

export function fetchLicenseByEmail(email: string) {
  const encoded = encodeURIComponent(email);
  return requestJson<LicenseResponse>(`/get-license-by-email/${encoded}`);
}

export function fetchLicenseByTelegram(tgId: string) {
  const encoded = encodeURIComponent(tgId);
  return requestJson<LicenseResponse>(`/get-license-by-tg-user/${encoded}`);
}

export function fetchDevices(tgId: string) {
  const encoded = encodeURIComponent(tgId);
  return requestJson<DevicesResponse>(`/devices/${encoded}`);
}

export function deleteDevices(tgId: string) {
  const encoded = encodeURIComponent(tgId);
  return requestJson<{ message?: string }>(`/devices/${encoded}`, {
    method: 'DELETE',
  });
}

export function renewLink(tgId: string) {
  return requestJson<RenewLinkResponse>('/renew-link', {
    method: 'POST',
    body: JSON.stringify({ tg_user_id: Number(tgId) }),
  });
}

