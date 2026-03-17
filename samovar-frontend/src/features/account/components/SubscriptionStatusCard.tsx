import React from 'react';
import type { SubscriptionInfo } from '../types';

interface Props {
  subscription: SubscriptionInfo | null;
}

const SubscriptionStatusCard: React.FC<Props> = ({ subscription }) => {
  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="card-title">
        <i className="fas fa-crown" /> Статус подписки
      </div>
      <div className="stats-row">
        <div className="stat-item">
          <div className="label">Статус</div>
          <div className="value">
            <span
              className={`status-badge ${
                subscription?.isActive ? 'status-ok' : 'status-warn'
              }`}
            >
              {subscription?.isActive ? 'Активна' : 'Не активна'}
            </span>
          </div>
        </div>
        <div className="stat-item">
          <div className="label">Осталось дней</div>
          <div className="value">{subscription?.daysLeft ?? '—'}</div>
        </div>
        <div className="stat-item">
          <div className="label">Telegram ID</div>
          <div className="value">{subscription?.telegramId || '—'}</div>
        </div>
      </div>
      <div className="stats-row">
        <div className="stat-item">
          <div className="label">Рефералов</div>
          <div className="value">
            {subscription?.date_renew_link !== undefined
              ? String(subscription.date_renew_link)
              : '0'}
          </div>
        </div>
        <div className="stat-item">
          <div className="label">Сервер</div>
          <div className="value">
            {subscription?.link ? 'Samovar / Remnawave' : 'Ожидает выдачи'}
          </div>
        </div>
      </div>
      <a href="/#pricing" className="btn btn-cyan">
        Продлить или купить подписку
      </a>
    </div>
  );
};

export default SubscriptionStatusCard;

