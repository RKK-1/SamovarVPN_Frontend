import { useCallback, useState } from 'react';

function isValidKey(value: string | null | undefined): boolean {
  if (!value) return false;
  return !/получение|купите подписку|не создан|ошибка/i.test(value);
}

function getHappDeepLink(key: string) {
  return `happ://add/url=${encodeURIComponent(key)}`;
}

const HAPP_STORE_LINKS: Record<'ios' | 'android' | 'windows', string> = {
  ios: 'https://apps.apple.com/app/id6504287215',
  android: 'https://play.google.com/store/apps/details?id=com.happproxy&hl=ru&pli=1',
  windows: 'https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe',
};

export type PlatformType = 'ios' | 'android' | 'windows';

export function useHappIntegration(licenseKey: string | null) {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'info' | 'warning' | 'error' | null>(null);

  const clearMessage = useCallback(() => {
    setMessage(null);
    setMessageType(null);
  }, []);

  const openForPlatform = useCallback(
    (platform: PlatformType) => {
      if (!isValidKey(licenseKey)) {
        setMessage('Сначала дождитесь загрузки ключа или оформите подписку.');
        setMessageType('warning');
        return;
      }

      const storeLink = HAPP_STORE_LINKS[platform];
      if (!storeLink) {
        setMessage('Для этой платформы ссылка пока не настроена.');
        setMessageType('warning');
        return;
      }

      const deepLink = getHappDeepLink(licenseKey!);
      setMessage(
        'Пробуем открыть Happ Plus. Если приложение не установлено, сейчас откроется страница загрузки.',
      );
      setMessageType('info');

      window.location.href = deepLink;
      setTimeout(() => {
        window.open(storeLink, '_blank', 'noopener');
      }, 1200);
    },
    [licenseKey],
  );

  return {
    message,
    messageType,
    clearMessage,
    openForPlatform,
  };
}

