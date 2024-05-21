import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navBar/navBars.jsx';
import TablaProfes from './components/App-Tabla-Profes/tabla-profes.jsx';
import Select from './components/select/select.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
    <TablaProfes/>
    <Select name="TipoDocumento" style={{'--largo': `98px`}} solid/>
  </React.StrictMode>,
  document.getElementById('root')
);

