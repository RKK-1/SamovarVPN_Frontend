import React from 'react';
import type { PlatformType } from '../hooks/useHappIntegration';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (platform: PlatformType) => void;
  message: string | null;
  messageType: 'info' | 'warning' | 'error' | null;
}

const PlatformModal: React.FC<Props> = ({
  open,
  onClose,
  onSelect,
  message,
  messageType,
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
        <h2>Открыть в Happ Plus</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
          Выберите свою систему. Мы попробуем открыть Happ Plus сразу с вашим ключом, а если
          приложение не установлено — откроем страницу загрузки.
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          <button
            type="button"
            className="btn btn-outline"
            style={{ justifyContent: 'flex-start', width: '100%' }}
            onClick={() => onSelect('ios')}
          >
            <i className="fab fa-apple" />
            &nbsp; iPhone / iPad
          </button>
          <button
            type="button"
            className="btn btn-outline"
            style={{ justifyContent: 'flex-start', width: '100%' }}
            onClick={() => onSelect('android')}
          >
            <i className="fab fa-android" />
            &nbsp; Android
          </button>
          <button
            type="button"
            className="btn btn-outline"
            style={{ justifyContent: 'flex-start', width: '100%' }}
            onClick={() => onSelect('windows')}
          >
            <i className="fab fa-windows" />
            &nbsp; Windows
          </button>
        </div>
        {message && (
          <div
            className={`notice ${messageType || 'info'}`}
            style={{ display: 'block', marginTop: 16 }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformModal;

