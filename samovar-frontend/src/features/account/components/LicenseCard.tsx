import React from 'react';
import type { SubscriptionInfo } from '../types';

interface Props {
  subscription: SubscriptionInfo | null;
  licenseKey: string | null;
  onCopy: () => void;
  onOpenPlatformModal: () => void;
}

const LicenseCard: React.FC<Props> = ({
  subscription,
  licenseKey,
  onCopy,
  onOpenPlatformModal,
}) => {
  const keyText = licenseKey ?? 'Получение ключа...';

  return (
    <div className="card">
      <div className="card-title">
        <i className="fas fa-key" /> Конфигурация доступа
      </div>
      <div className="license-box">
        <code className="license-code">{keyText}</code>
        <div className="license-actions">
          <button type="button" className="btn btn-primary full-width" onClick={onCopy}>
            Скопировать ключ
          </button>
          <button
            type="button"
            className="btn btn-outline full-width"
            onClick={onOpenPlatformModal}
          >
            Подключиться в приложении
          </button>
        </div>
      </div>
      <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)' }}>
        Используйте этот ключ в приложении{' '}
        <button
          type="button"
          onClick={onOpenPlatformModal}
          style={{
            color: 'var(--primary)',
            fontWeight: 600,
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'pointer',
          }}
        >
          Happ Plus
        </button>{' '}
        для быстрой настройки VPN.
      </p>

      <div
        className="card"
        style={{
          marginTop: 18,
          background: 'rgba(255,255,255,.03)',
          border: '1px solid var(--border)',
        }}
      >
        <div className="card-title">
          <i className="fas fa-circle-info" /> Универсальный гайд по подключению
        </div>
        <div style={{ display: 'grid', gap: 14 }}>
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              background: 'rgba(34,211,238,.06)',
              border: '1px solid rgba(34,211,238,.16)',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>1. Установите приложение</div>
            <div
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                fontSize: 14,
              }}
            >
              Нажмите на{' '}
              <button
                type="button"
                onClick={onOpenPlatformModal}
                style={{
                  color: 'var(--primary)',
                  fontWeight: 600,
                  background: 'transparent',
                  border: 0,
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                Happ Plus
              </button>
              , выберите свою систему в попапе и установите приложение. Для iPhone также можно
              использовать{' '}
              <a
                href="https://apps.apple.com/ru/app/v2raytun/id6476628951"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', fontWeight: 600 }}
              >
                V2RayTun
              </a>
              .
            </div>
          </div>
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              background: 'rgba(255,255,255,.04)',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>2. Добавьте подписку</div>
            <div
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                fontSize: 14,
              }}
            >
              Откройте Happ, нажмите на <b>+</b> в правом верхнем углу и выберите{' '}
              <b>«Вставить из буфера обмена»</b>. Перед этим просто скопируйте ключ кнопкой
              выше.
            </div>
          </div>
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              background: 'rgba(255,255,255,.04)',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>3. Выдайте разрешения</div>
            <div
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                fontSize: 14,
              }}
            >
              Разрешите приложению создать VPN-подключение и не закрывайте Happ, пока импорт
              полностью не завершится.
            </div>
          </div>
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              background: 'rgba(255,255,255,.04)',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>4. Включите VPN</div>
            <div
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                fontSize: 14,
              }}
            >
              После импорта нажмите на большую кнопку подключения в верхней части экрана. Если
              ключ потребуется заново, вы всегда можете обновить его в разделе{' '}
              <b>🔐 Доступы и подписка</b>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseCard;

