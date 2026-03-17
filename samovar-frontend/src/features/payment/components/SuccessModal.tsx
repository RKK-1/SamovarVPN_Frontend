import React from 'react';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 80, color: 'var(--primary)', marginBottom: 32 }}>
          <i className="fas fa-check-circle" />
        </div>
        <h2 style={{ marginBottom: 16 }}>Оплата принята!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
          Ключ и инструкции уже отправлены тебе в Telegram бот и на почту.
        </p>
        <button
          className="btn btn-cyan"
          onClick={onClose}
          style={{ width: '100%' }}
        >
          Поехали!
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

