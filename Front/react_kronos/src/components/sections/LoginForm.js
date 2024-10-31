import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../services/apiService.js';
import { fetchMyRoles, fetchMySchools } from '../../services/users.js';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const getRoles = async () => {
    try {
        const data = await fetchMyRoles();
        localStorage.setItem('roles', JSON.stringify(data.roles));
        sessionStorage.setItem('rol', data.roles[0]);
    } catch (error) {
        console.error(error);
    }
};

export default function Login() {
    const [isLoading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(null); // Estado para almacenar el mensaje de error
    const navigate = useNavigate();
    const inputUserRef = useRef(null);
    const inputPasswordRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const schools = JSON.parse(localStorage.getItem('schools'));
        if (!schools || schools.length < 1) {
            console.error('No hay escuelas almacenadas');
            return;
        }
        sessionStorage.setItem('actual_school', schools[0].pk);
        getRoles();
    }, []);

    if (localStorage.getItem('token')) {
        const verifyToken = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/verifyToken/', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "token": localStorage.getItem('token') })
                });
                if (response.ok) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            }
        };
        verifyToken();
    }

    async function handleLogin(values) {
        setLoading(true);
        setLoginError(null); // Resetea el mensaje de error al intentar un nuevo inicio de sesión

        const usernameValue = values.document;
        const passwordValue = values.password;

        try {
            const body = { "document": usernameValue, "password": passwordValue };
            const loginData = await fetchLogin(body);
            localStorage.setItem('token', loginData.Token);

            const mySchoolsData = await fetchMySchools();
            localStorage.setItem('schools', JSON.stringify(mySchoolsData));
            sessionStorage.setItem('actual_school', JSON.stringify(mySchoolsData[0].pk));

            getRoles();
            navigate('/horarios');
        } catch (error) {
            setLoginError('Documento o contraseña incorrectos.'); // Asigna el mensaje de error
            console.error('Login Failed', error);
        } finally {
            setLoading(false);
        }
    }

    const cambioContrasenia = () => {
        navigate('/mailPassword');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
            <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '420px', width: '100%' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Iniciar sesión</Title>
                <Form onFinish={handleLogin}>
                    <Form.Item
                        name="document"
                        rules={[{ required: true, message: 'Por favor ingrese su documento' }]}
                    >
                        <Input 
                            type="number" 
                            placeholder="Documento" 
                            ref={inputUserRef} 
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                    >
                        <Input.Password
                            placeholder="Contraseña"
                            ref={inputPasswordRef}
                            size="large"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                        help={loginError} // Muestra el error si existe
                        validateStatus={loginError ? "error" : ""}
                        >
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block 
                            size="large" 
                            loading={isLoading}
                        >
                            Iniciar sesión
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center' }}>
                    <Button 
                        type="link" 
                        onClick={cambioContrasenia} 
                        style={{ fontSize: '14px', padding: 0 }}
                    >
                        ¿Olvidó su contraseña?
                    </Button>
                </div>
            </div>
        </div>
    );
}
