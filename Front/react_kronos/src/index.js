import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button/index.js';
import Table from './components/table/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Button text="Button 1" life={false}/>
    <Button/>
    <Button text="Button 1" life={true}/>
    <Table/>
  </React.StrictMode>,
  document.getElementById('root')
);
