import React, { useState, useEffect, useRef } from 'react';
import './logins.scss';
import Input from '../../components/input/inputs.jsx';
import Button from '../../components/button/buttons.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const inputUserRef = useRef(null);
    const inputPasswordRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Token encontrado, redireccionando...');
            navigate('/');
        } else {
            console.log('No hay token almacenado');
        }
    }, [navigate]);

    function handleLogin(event) {
        event.preventDefault();
        const usernameValue = inputUserRef.current.value;
        const passwordValue = inputPasswordRef.current.value;

        fetch('http://127.0.0.1:8000/api/login/', {
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
            return response.json();
        })
        .then(responseData => {
            localStorage.setItem('token', responseData.Token); 


            fetch('http://127.0.0.1:8000/api/user_schools/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {

                sessionStorage.setItem('schools',JSON.stringify( responseData)); 
                console.log('schools were obtained correctly');
                console.log(sessionStorage.getItem('schools'));
                setShowError(false);
                navigate('/');
            })
            .catch(error => {
                console.error('Login failed:', error);
                setShowError(true);
            });         
            
            
            console.log('Login success');
            setShowError(false);
            navigate('/');

        })
        .catch(error => {
            console.error('Login failed:', error);
            setShowError(true);
        });
    }



    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <Input label="Usuario" placeholder="pepegonzales@kronos.com" type="email" inputRef={inputUserRef} />
                    <a href="#0">Recuerda tu usuario</a>
                </div>
                <div>
                    <Input label="Contraseña" placeholder="**********" type="password" inputRef={inputPasswordRef} />
                    <a href="#0">Recuerda tu contraseña</a>
                </div>
                <div className='botones'>
                    <Button text='Iniciar sesión' life onClick={handleLogin} />
                </div>
            </form>
            {showError && <p>El usuario y la contraseña no coinciden</p>}
        </div>
    );
}
