export interface SubscriptionRaw {
  active_sub?: number;
  has_subscription?: boolean;
  hasSubscription?: boolean;
  balance?: number | string;
  date_renew_link?: string | number;
  free?: number | string;
  link?: string;
}

export interface SubscriptionInfo extends SubscriptionRaw {
  emailOrTg: string;
  telegramId: string | null;
  isActive: boolean;
  daysLeft: number | null;
  rouletteBlocked: boolean;
}

export interface LicenseResponse {
  license_key?: string;
  licensekey?: string;
  link?: string;
}

export interface DeviceRaw {
  device_model?: string;
  deviceModel?: string;
  index?: number;
  platform?: string;
  os_version?: string;
  user_agent?: string;
  last_seen?: string;
  hwid?: string;
}

export interface Device {
  title: string;
  platform: string;
  location: string;
  status: 'active';
  lastSeen: string;
  version: string;
}

export type DevicesResponse = DeviceRaw[] | { devices?: DeviceRaw[] };

export interface RenewLinkResponse {
  link?: string;
  license_key?: string;
  licensekey?: string;
  message?: string;
}

