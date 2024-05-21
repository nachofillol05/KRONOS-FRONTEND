import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navBar/navBars.jsx';
import TablaProfes from './components/App-Tabla-Profes/tabla-profes.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
    <TablaProfes />
  </React.StrictMode>,
  document.getElementById('root')
);

