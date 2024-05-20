import React from 'react';
import Barra from '../../components/navBar/navBars';
import Button from '../../components/button/buttons';
import './Activation.scss'
import mailIcon from './mail.svg';

export default function Activation() {
    return (
        <React.StrictMode>
            <div className="container">
                <div className='left-column'>                
                    <img src={mailIcon} alt="Email"></img>
                </div>
                <div className='right-column'>
                    <h1>Su mail fue verificado con éxito</h1>
                    <Button text='Volver al inicio'/>
                </div>
            </div>
        </React.StrictMode>
);
}