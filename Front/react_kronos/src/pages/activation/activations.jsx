import React from 'react';
import Button from '../../components/button/buttons';
import './Activation.scss'


export default function Activation() {
    return (
        <React.StrictMode>
            <div className="container">
                <div className='left-column'>                
                    <img src='Front/react_kronos/src/pages/activation/mail.svg' alt="Email"></img>
                </div>
                <div className='right-column'>
                    <h1>Su mail fue verificado con éxito</h1>
                    <Button text='Volver al inicio'/>
                </div>
            </div>
        </React.StrictMode>
);
}