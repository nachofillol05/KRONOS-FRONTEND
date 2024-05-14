import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button/buttons.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Button text="Button 1" life={false}/>
    <Button/>
    <Button text="Button 1" life={true}/>
  </React.StrictMode>,
  document.getElementById('root')
);
