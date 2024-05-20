import React from 'react';
import ReactDOM from 'react-dom';
import Barra from './components/navBar/navBars.jsx';
import Button from './components/button/buttons.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Barra/>
  </React.StrictMode>,
  document.getElementById('root')
);
