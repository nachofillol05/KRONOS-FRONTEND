import React from 'react';
import ReactDOM from 'react-dom';
import Input from './componentes/input/inputs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Input placeholder="Rojo" label="Color" type="number"  numero={35}/>
  </React.StrictMode>,
  document.getElementById('root')
);
