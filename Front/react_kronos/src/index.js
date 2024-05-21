import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navBar/navBars.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
  </React.StrictMode>,
  document.getElementById('root')
);

