import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './timerange.scss';

const RangeSlider = ({ onFinalChange }) => {
  const [values, setValues] = useState([6.5, 23.5]);

  const STEP = 0.5;
  const MIN = 6.5;
  const MAX = 23.5;

  const formatHours = (value) => {
    const hours = Math.floor(value);
    const minutes = (value - hours) * 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const handleFinalChange = (values) => {
    const formattedValues = values.map(value => formatHours(value));
    onFinalChange && onFinalChange(formattedValues);
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
        onFinalChange={handleFinalChange}
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
        thumbCount={2}
      />
    </div>
  );
};

export default RangeSlider;
