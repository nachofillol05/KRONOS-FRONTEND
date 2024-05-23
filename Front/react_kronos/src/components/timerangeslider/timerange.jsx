import React, { useState } from 'react';
import './timerange.scss'; // Añade tus estilos personalizados aquí

const TimeRangeSlider = ({ min = 0, max = 1440, step = 15 }) => {
  const [startValue, setStartValue] = useState(555); // 9:15 AM en minutos
  const [endValue, setEndValue] = useState(1230); // 8:30 PM en minutos

  const handleStartChange = (event) => {
    const value = Math.min(Number(event.target.value), endValue - step);
    setStartValue(value);
  };

  const handleEndChange = (event) => {
    const value = Math.max(Number(event.target.value), startValue + step);
    setEndValue(value);
  };

  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  return (
    <div className="time-range-slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={startValue}
        onChange={handleStartChange}
        className="range-input"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={endValue}
        onChange={handleEndChange}
        className="range-input"
      />
      <div className="time-display">
        <span>{formatTime(startValue)}</span> - <span>{formatTime(endValue)}</span>
      </div>
    </div>
  );
};

export default TimeRangeSlider;