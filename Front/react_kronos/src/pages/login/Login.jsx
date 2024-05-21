import React from 'react';
import './Login.scss'
import Input from '../../components/input/inputs.jsx';
import Button from '../../components/button/buttons.jsx';

export default function Login() {
    return (
        <React.StrictMode>
            <div className="body">
                    <h1>Iniciar Sesión</h1>
                    <form>
                        <div>
                            <Input label="Usuario" placeholder="pepegonzales@kronos.com" numero={30} type="email"/>
                            <a href="#0"> Recuerda tu usuario</a>
                        </div>
                        <div>
                            <Input label="Contraseña" placeholder="**********" numero={30} type="password"/>
                            <a href="#0"> Recuerda tu contraseña</a>
                        </div>
                        <div className='botones'>
                            <a href="#0">Regístrate</a>
                            <Button text='Iniciar sesión' numero={22} life/>
                        </div>
                    </form>
                    <p>Mensaje de error</p>
            </div>
        </React.StrictMode>
);
}