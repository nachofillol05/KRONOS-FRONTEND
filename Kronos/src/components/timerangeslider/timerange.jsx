import React, { useState } from 'react';
import { Flex, Slider } from 'antd';

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

  const handleChange = (values) => {
    setValues(values);
  };

  const handleAfterChange = (values) => {
    const formattedValues = values.map(value => formatHours(value));
    onFinalChange && onFinalChange(formattedValues);
  };

  return (
    <Flex   gap={"1vw"} align='center'>
      <h6 style={{ margin: 0, }}>Horas catedra</h6>
      <div style={{ width: '15vw' }}>
        <Slider
          range
          step={STEP}
          min={MIN}
          max={MAX}
          value={values}
          onChange={handleChange}
          onAfterChange={handleAfterChange}
          tooltip={{
            formatter: (value) => formatHours(value),
          }}
        />
      </div>

    </Flex>
  );
};

export default RangeSlider;
