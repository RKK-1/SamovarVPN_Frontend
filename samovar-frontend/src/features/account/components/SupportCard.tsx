import React from 'react';

const SupportCard: React.FC = () => {
  return (
    <div className="card" style={{ marginTop: 24 }}>
      <div className="card-title">
        <i className="fas fa-life-ring" /> Поддержка
      </div>
      <p style={{ fontSize: 14, marginBottom: 16 }}>Есть вопросы или проблемы с настрокой?</p>
      <a
        href="https://t.me/SamovarVPN_Bot"
        className="btn btn-outline"
        style={{ width: '100%' }}
      >
        <i className="fab fa-telegram" /> Написать в Telegram
      </a>
    </div>
  );
};

export default SupportCard;

