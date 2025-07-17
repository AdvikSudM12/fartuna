import type { SpinSettings } from '../App'; // Импортируем тип
import React from 'react';
import './../styles/EntriesPanel.css';

interface EntriesPanelProps {
  setEntries: (entries: string[]) => void;
  initialEntries: string[];
  settings: SpinSettings;
  setSettings: (settings: SpinSettings) => void;
  onClose: () => void;
}

const EntriesPanel: React.FC<EntriesPanelProps> = ({ setEntries, initialEntries, settings, setSettings, onClose }) => {
  const [text, setText] = React.useState(initialEntries.join('\n'));

  const handleUpdate = () => {
    const newEntries = text.split('\n').filter(entry => entry.trim() !== '');
    if (newEntries.length > 0) {
      setEntries(newEntries);
      onClose();
    } else {
      alert("Список не может быть пустым!");
    }
  };
  
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : Number(value),
    });
  };

  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="entries-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <h3>Редактировать список</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Введите каждого участника с новой строки..."
        />
        
        <div className="separator"></div>

        <h3>Настройки вращения</h3>
        <div className="setting-item">
          <label htmlFor="duration">Длительность (сек): {settings.duration}</label>
          <input
            type="range"
            id="duration"
            name="duration"
            min="2"
            max="20"
            value={settings.duration}
            onChange={handleSettingsChange}
          />
        </div>
        <div className="setting-item">
          <label htmlFor="spins">Кол-во оборотов: {settings.spins}</label>
          <input
            type="range"
            id="spins"
            name="spins"
            min="1"
            max="15"
            value={settings.spins}
            onChange={handleSettingsChange}
          />
        </div>
        <div className="setting-item checkbox">
          <label htmlFor="sound">Звуковые эффекты</label>
          <input
            type="checkbox"
            id="sound"
            name="sound"
            checked={settings.sound}
            onChange={handleSettingsChange}
          />
        </div>

        <button className="update-button" onClick={handleUpdate}>Обновить и закрыть</button>
      </div>
    </div>
  );
};

export default EntriesPanel; 