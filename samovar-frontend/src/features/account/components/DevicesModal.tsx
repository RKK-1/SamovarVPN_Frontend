import React from 'react';
import type { Device } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  devices: Device[];
  loading: boolean;
  error: string | null;
  canDelete: boolean;
  onRefresh: () => void;
  onDeleteAll: () => void;
}

const DevicesModal: React.FC<Props> = ({
  open,
  onClose,
  devices,
  loading,
  error,
  canDelete,
  onRefresh,
  onDeleteAll,
}) => {
  if (!open) return null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <button
          type="button"
          className="close-modal"
          aria-label="Закрыть"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 style={{ marginBottom: 8 }}>Мои устройства</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Список устройств, использующих вашу подписку.
        </p>

        <div className="device-list">
          {loading && (
            <div className="device-empty">Загружаем список устройств...</div>
          )}
          {!loading && devices.length === 0 && !error && (
            <div className="device-empty">
              Устройства пока не найдены. Как только клиент подключится, список появится здесь.
            </div>
          )}
          {!loading &&
            devices.map((device) => (
              <div key={`${device.title}-${device.lastSeen}`} className="device-item">
                <div className="device-info">
                  <h4>{device.title}</h4>
                  <div className="device-meta">
                    <span>{device.platform || 'Платформа не указана'}</span>
                    {device.version && <span>{device.version}</span>}
                    <span>Последняя активность: {device.lastSeen}</span>
                    {device.location && <span>{device.location}</span>}
                  </div>
                </div>
                <span className="status-badge status-ok">Активно</span>
              </div>
            ))}
        </div>

        {error && (
          <div className="notice error" style={{ display: 'block', marginTop: 16 }}>
            {error}
          </div>
        )}

        <div className="device-actions" style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={onRefresh}
            disabled={loading}
          >
            Обновить
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onDeleteAll}
            disabled={!canDelete || loading}
          >
            Удалить все устройства
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevicesModal;

