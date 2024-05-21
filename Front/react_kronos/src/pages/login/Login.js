import React from 'react';
import './Login.scss'

export default function Login() {
    return (
        <React.StrictMode>
            <div className="body">
                <div className='login-container'>
                    <h1>Iniciar Sesión</h1>
                    <form>
                        <div className="form-group">
                            <h3>Email</h3>
                            <input type="email" placeholder="jorgegomez@gmail.com" />
                            <small>Recuerda tu usuario</small>
                        </div>
                        <div className="form-group">
                            <h3>Contraseña</h3>
                            <input type="password" placeholder="**********" />
                            <small>Recupera tu contraseña</small>
                        </div>
                        <div className="both">
                            <p className="register-link">Regístrate</p>
                            <button type="submit">Entrar</button>
                        </div>
                        <p className="error-message">Mensaje de error</p>
                    </form>
                </div>
            </div>
        </React.StrictMode>
);
}