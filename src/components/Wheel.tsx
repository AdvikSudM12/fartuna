import type { SpinSettings } from '../App';
import React, { useState } from 'react';
import { useSound } from '../hooks/useSound';
import './../styles/Wheel.css';

interface WheelProps {
  entries: string[];
  onSpinEnd: (winner: string) => void;
  settings: SpinSettings;
}

const Wheel: React.FC<WheelProps> = ({ entries, onSpinEnd, settings }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useSound('/sounds/tick.wav', isSpinning && settings.sound);

  const numEntries = entries.length;
  const arc = 360 / numEntries;

  const colors = ['#F2E6B5', '#70C8DD', '#E83A55', '#F6A000', '#FFEC55', '#009A9A', '#B14191', '#83C8B8', '#DE97BD', '#009DD0'];

  const handleSpin = () => {
    if (isSpinning) return;
    
    const randomSpins = settings.spins + Math.floor(Math.random() * 5); // Базовое + случайное
    const randomStopAngle = Math.floor(Math.random() * 360);
    const newRotation = rotation + (360 * randomSpins) + randomStopAngle;
    
    setRotation(newRotation);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      const finalAngle = newRotation % 360;
      const winningIndex = Math.floor((360 - finalAngle + arc / 2) % 360 / arc);
      onSpinEnd(entries[winningIndex]);
    }, settings.duration * 1000);
  };

  const center = { x: 180.674, y: 194.782 };
  const radius = 148;

  const getCoordinates = (angleDegrees: number, r: number) => {
    const angleRadians = (angleDegrees - 90) * (Math.PI / 180);
    const x = center.x + r * Math.cos(angleRadians);
    const y = center.y + r * Math.sin(angleRadians);
    return [x, y];
  };

  const sectors = entries.map((_, index) => {
    const startAngle = index * arc;
    const endAngle = (index + 1) * arc;
    
    const [startX, startY] = getCoordinates(startAngle, radius);
    const [endX, endY] = getCoordinates(endAngle, radius);

    const largeArcFlag = arc > 180 ? 1 : 0;
    const pathData = `M ${center.x},${center.y} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
    
    const textAngle = startAngle + arc / 2;
    const [textX, textY] = getCoordinates(textAngle, radius * 0.65);

    return (
      <g key={index}>
        <path d={pathData} fill={colors[index % colors.length]} stroke="#fff" strokeWidth="1" />
        <g transform={`translate(${textX}, ${textY}) rotate(${textAngle})`}>
          <text
            x="0"
            y="0"
            fill="black"
            fontSize={numEntries > 30 ? "8" : "12"}
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {index + 1}
          </text>
        </g>
      </g>
    );
  });

  return (
    <div className="wheel-assembly">
      <svg viewBox="0 0 356 510" className="wheel-svg">
        <g className="wheel-stand">
          <polygon fill="#1B3F92" points="100.9,503.8 260.5,503.8 224.9,302.3 136.4,302.3"/>
          <polygon fill="#163577" points="237,370.8 224.9,302.3 136.4,302.3 124.3,370.8"/>
          <rect x="66.5" y="463.3" fill="#0067B2" width="233.1" height="41.2"/>
        </g>
        
        <g className="wheel-spinner" style={{ 
          transform: `rotate(${rotation}deg)`,
          transitionDuration: `${settings.duration}s`
        }}>
          {sectors}
        </g>
        
        <g className="wheel-centerpiece">
          <circle fill="#706F6F" cx="180.7" cy="194.8" r="60.9"/>
          <circle fill="#1D3B79" cx="180.7" cy="194.8" r="57"/>
          <polygon fill="#F9B105" points="181.6,160 191.3,179.8 213.2,183 197.4,198.4 201.1,220.2 181.6,209.9 162,220.2 165.7,198.4 149.9,183 171.8,179.8"/>
        </g>

        <g className="wheel-pointer">
          <polygon fill="#E53818" points="180.7,86.2 158.5,21.2 202.8,21.2"/>
        </g>
      </svg>
      <button className="spin-button" onClick={handleSpin} disabled={isSpinning}>
        {isSpinning ? 'ВРАЩАЕТСЯ...' : 'КРУТИТЬ!'}
      </button>
    </div>
  );
};

export default Wheel; 