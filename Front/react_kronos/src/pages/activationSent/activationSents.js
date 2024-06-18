import React from 'react';
import Button from '../../components/button/buttons';
import './ActivationSent.scss'
import mailIcon from './mail_sent.svg';

export default function ActivationSent() {
    return (
        <React.StrictMode>
            <div className="container">
                <div className='left-column'>                
                    <img src={mailIcon} alt="Email"></img>
                </div>
                <div className='right-column'>
                    <h1>Verifique su mail para <br></br>iniciar sesión</h1>
                    <Button text='Volver al inicio'/>
                    <h3>En caso que no lo encuentre<br></br>revise su carpeta de spam</h3>
                </div>
            </div>
        </React.StrictMode>
);
}