import React from 'react';
import type { KeyRenewalState } from '../hooks/useKeyRenewal';

interface Props {
  state: KeyRenewalState;
  onClose: () => void;
  onConfirm: () => void;
}

const KeyConfirmModal: React.FC<Props> = ({ state, onClose, onConfirm }) => {
  if (!state.isOpen) return null;

  const disabled = state.locked || state.renewing;

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
        <h2>Смена ключа доступа</h2>
        <p className="muted">
          Старый ключ перестанет работать. Чтобы случайно не сломать подключение, подтверждение
          откроется только через 5 секунд.
        </p>
        <div className="confirm-box">
          <strong>Важно</strong>
          После смены ключа нужно заново импортировать конфигурацию в приложении на всех
          устройствах.
        </div>
        <div className="progress-wrap">
          <div className="progress-timer">{state.timer}</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${state.progressPercent}%` }}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-outline"
            style={{ flex: 1 }}
            onClick={onClose}
            disabled={state.renewing}
          >
            Отмена
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ flex: 1 }}
            onClick={onConfirm}
            disabled={disabled}
          >
            {state.renewing ? 'Обновляем...' : 'Да, сменить ключ'}
          </button>
        </div>
        {state.message && (
          <div
            className={`notice ${state.messageType || 'info'}`}
            style={{ display: 'block' }}
          >
            {state.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyConfirmModal;

