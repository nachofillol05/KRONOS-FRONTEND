import React, { useState, useEffect } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token=localStorage.getItem('token')
        console.log(token)
        if (token != '') {
            console.log('hay token baaaaaaaaaai')
            navigate('/');
        } else {
            console.log('no hay token')
        }
      });
    
    function handleLogin(event) {
        event.preventDefault();
        const usernameValue = document.getElementById('input_user').value;
        const passwordValue = document.getElementById('input_password').value;

        
        
        fetch('http://localhost:8000/api/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": usernameValue,
                "password": passwordValue
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.status === 200) {
                response.json()
                .then(responseData => {
                    localStorage.setItem('token', responseData.Token); 
                })
                console.log('Login success');
                setShowError(false);
                console.log(localStorage.getItem('token'));
                navigate('/');
            }
            else {
                console.log('Login failed');
                setShowError(true);
            }
            
            
        })
        .catch(error => setShowError(true));
    };
    return (
        <React.StrictMode>
            <div className="body">
                <div className='login-container'>
                    <h1>Iniciar Sesión</h1>
                    <form>
                        <div className="form-group">
                            <h3>Email</h3>
                            <input type="email" id="input_user" placeholder="jorgegomez@gmail.com" />
                            <small>Recuerda tu usuario</small>
                        </div>
                        <div className="form-group">
                            <h3>Contraseña</h3>
                            <input type="password" id='input_password' placeholder="**********" />
                            <small>Recupera tu contraseña</small>
                            {showError && <h2>El usuario y la contraseña no coinciden</h2>}
                        </div>
                        <div className="both">
                            <p className="register-link">Regístrate</p>
                            <button type="submit" onClick={handleLogin}>Entrar</button>
                        </div>
                        <p className="error-message">Mensaje de error</p>
                    </form>
                </div>
            </div>
        </React.StrictMode>
);
}