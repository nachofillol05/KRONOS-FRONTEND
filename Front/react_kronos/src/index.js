import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button/buttons.jsx';
import Table from './components/table/tables.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Button text="Button 1" numero={35} life={false}/>
    <Button text="Button 1" life={true}/>
    <Table/>
  </React.StrictMode>,
  document.getElementById('root')
);
