import React from 'react';
import './../styles/WinnerModal.css';

interface WinnerModalProps {
  winner: string;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="winner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confetti">🎉</div>
        <h2>Поздравляем!</h2>
        <p className="winner-name">{winner}</p>
        <button onClick={onClose} className="close-winner-button">
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default WinnerModal; 