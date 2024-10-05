import React, { useState, useEffect, useRef, act } from 'react';
import './logins.scss';
import { fetchLogin } from '../../services/apiService.js'
import { fetchMyRoles, fetchMySchools } from '../../services/users.js'
import Input from '../../components/input/inputs.jsx';
import Button from '../../components/button/buttons.jsx';
import { useNavigate } from 'react-router-dom';


const getRoles = async () => {
    try {
        const data = await fetchMyRoles();
        localStorage.setItem('roles', JSON.stringify(data.roles));
        sessionStorage.setItem('rol', data.roles[0]);
    } catch (error) {
        console.error(error);
    }
}


export default function Login() {
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const inputUserRef = useRef(null);
    const inputPasswordRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const schools = JSON.parse(localStorage.getItem('schools'));
        if (!schools && schools.length < 1) {
            console.error('No hay escuelas almacenadas');
        }
        // guardar en sesion la primera escuela
        sessionStorage.setItem('actual_school', schools[0].pk)

        getRoles();
    }, [])

    async function handlerLogin (event) {
        event.preventDefault();
        const usernameValue = inputUserRef.current.value;
        const passwordValue = inputPasswordRef.current.value;

        try {
            const body = {
                "document": usernameValue,
                "password": passwordValue
            }
            const loginData = await fetchLogin(body)
            localStorage.setItem('token', loginData.Token);

            const mySchoolsData = await fetchMySchools()
            localStorage.setItem('schools', JSON.stringify(mySchoolsData));
            // primer pk colegio en la sesion
            sessionStorage.setItem('actual_school', JSON.stringify(mySchoolsData[0].pk));

            getRoles();

            navigate('/horarios');
        } catch(error) {
            console.error('Login Failed', error)
            setShowError(true);
        }
    }

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handlerLogin}>
                <div>
                    <Input label="Usuario" placeholder="pepegonzales@kronos.com" type="email" inputRef={inputUserRef} />
                    <a href="#0">Recuerda tu usuario</a>
                </div>
                <div>
                    <Input label="Contraseña" placeholder="**********" type="password" inputRef={inputPasswordRef} />
                    <a href="#0">Recuerda tu contraseña</a>
                </div>
                <div className='botones'>
                    <Button text='Iniciar sesión' life onClick={handlerLogin} />
                </div>
            </form>
            {showError && <p>El usuario y la contraseña no coinciden</p>}
        </div>
    );
}
