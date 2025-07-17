import { useState, useEffect } from 'react';
import Wheel from './components/Wheel';
import EntriesPanel from './components/EntriesPanel';
import WinnerModal from './components/WinnerModal';
import DynamicBackground from './components/DynamicBackground'; // Импортируем фон
import Header from './components/Header'; // Импортируем хедер
import { useSound } from './hooks/useSound';
import './styles/App.css';

export interface SpinSettings {
  duration: number;
  spins: number;
  sound: boolean;
}

function App() {
  const [entries, setEntries] = useState([
    'Приз 100$', 'Банкрот', 'Сектор Плюс', 'Переход хода',
    'Приз 500$', 'x2', 'Приз 250$', 'Пропуск хода',
  ]);
  const [settings, setSettings] = useState<SpinSettings>({
    duration: 6,
    spins: 5,
    sound: true,
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const [playWinSound, setPlayWinSound] = useState(false);
  
  useSound('/sounds/win.wav', playWinSound && settings.sound, 0.6);

  useEffect(() => {
    let timeoutId: number;
    if (winner) {
      setPlayWinSound(true);
      // Устанавливаем таймер для остановки звука через 2 секунды
      timeoutId = setTimeout(() => {
        setPlayWinSound(false);
      }, 2000);
    } else {
      setPlayWinSound(false);
    }

    return () => {
      // Очищаем таймер, если компонент размонтируется
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [winner]);

  const handleSpinEnd = (winningEntry: string) => {
    setWinner(winningEntry);
  };

  const closeWinnerModal = () => {
    setWinner(null);
  };

  return (
    <div className="app-container">
      <Header /> {/* Добавляем компонент хедера */}
      <DynamicBackground /> {/* Добавляем компонент фона */}
      <button onClick={() => setIsPanelOpen(true)} className="settings-button">
        ⚙️
      </button>

      <div className="wheel-section">
        <h1>Колесо Фортуны</h1>
        <Wheel entries={entries} onSpinEnd={handleSpinEnd} settings={settings} />
      </div>

      {isPanelOpen && (
        <EntriesPanel
          setEntries={setEntries}
          initialEntries={entries}
          settings={settings}
          setSettings={setSettings}
          onClose={() => setIsPanelOpen(false)}
        />
      )}

      {winner && <WinnerModal winner={winner} onClose={closeWinnerModal} />}
    </div>
  );
}

export default App;
