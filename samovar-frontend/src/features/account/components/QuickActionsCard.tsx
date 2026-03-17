import React from 'react';

interface Props {
  onNewKey: () => void;
  onOpenRoulette: () => void;
  onOpenDevices: () => void;
  rouletteBlocked: boolean;
}

const QuickActionsCard: React.FC<Props> = ({
  onNewKey,
  onOpenRoulette,
  onOpenDevices,
  rouletteBlocked,
}) => {
  return (
    <div className="card">
      <div className="card-title">
        <i className="fas fa-rocket" /> Быстрые действия
      </div>
      <div className="action-grid">
        <button type="button" className="btn-special" onClick={onNewKey}>
          <i className="fas fa-plus" />
          <span>Новый ключ</span>
        </button>
        <button
          type="button"
          className="btn-special"
          onClick={rouletteBlocked ? undefined : onOpenRoulette}
          style={
            rouletteBlocked
              ? { opacity: 0.5, cursor: 'not-allowed' }
              : undefined
          }
          title={rouletteBlocked ? 'Бесплатная неделя уже активирована' : ''}
        >
          <i className="fas fa-gamepad" />
          <span>Рулетка</span>
        </button>
        <button
          type="button"
          className="btn-special"
          style={{ gridColumn: 'span 2' }}
          onClick={onOpenDevices}
        >
          <i className="fas fa-mobile-screen" />
          <span>Мои устройства</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActionsCard;

