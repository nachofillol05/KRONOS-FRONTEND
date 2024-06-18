import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './timerange.scss';

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
    <div className='parent'>
      <h2 style={{ fontSize: '15px' }}>Horas</h2>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            className='A'
            {...props}
            style={{ 
              ...props.style,
              height: '3px',
              width: '175px',
              background: getTrackBackground({
                values,
                colors: ['#ccc', 'var(--color)', '#ccc'],
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
              backgroundColor: 'var(--color)',
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
                color: 'var(--color)',
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
