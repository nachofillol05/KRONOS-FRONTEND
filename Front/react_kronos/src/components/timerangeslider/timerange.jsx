import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const RangeSlider = () => {
  const [values, setValues] = useState([0, 12]);

  const STEP = 0.5;
  const MIN = 0;
  const MAX = 24;

  const formatHours = (value) => {
    const hours = Math.floor(value);
    const minutes = (value - hours) * 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <h2 style={{ fontSize: '20px' }}>Horas</h2>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{ 
              ...props.style,
              height: '3px',
              width: '175px',
              background: getTrackBackground({
                values,
                colors: ['#ccc', '#006D6C', '#ccc'],
                min: MIN,
                max: MAX,
              }),
              alignSelf: 'center',
              position: 'relative',
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, value }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '15px',
              width: '15px',
              borderRadius: '50%',
              backgroundColor: '#006D6C',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-25px',
                color: '#006D6C',
                padding: '4px',
                whiteSpace: 'nowrap',
                fontSize: '12px',
              }}
            >
              {formatHours(value)}
            </div>
          </div>
        )}
        thumbCount={1} // Solo se muestra un pulgar en el rango deslizante
      />
      
    </div>
  );
};

export default RangeSlider;
