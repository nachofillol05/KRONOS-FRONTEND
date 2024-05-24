import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navBar/navBars.jsx';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

