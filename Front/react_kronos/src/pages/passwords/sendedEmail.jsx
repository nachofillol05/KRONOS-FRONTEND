import React from 'react';
import './passwords.scss';
import { Flex, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { theme } from 'antd'; // Importamos el theme de Ant Design para obtener el color primario

export default function Login() {
    const navigate = useNavigate();

    // Obtenemos el color primario desde el tema de Ant Design
    const { token } = theme.useToken();
    const primaryColor = token.colorPrimary;

    const handleBackToMenu = () => {
        navigate('/menu'); // Asume que tienes una ruta al menú principal
    };

    return (
        <Flex
            style={{ height: '100vh', backgroundColor: '#f0f2f5' }} // Fondo gris suave
            align="center"
            justify="center"
            className="change-password"
        >
            <Flex
                vertical
                style={{ width: '420px', padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                align='center'
            >
                <MailOutlined style={{ fontSize: '64px', color: primaryColor, marginBottom: '20px' }} />
                <h1 style={{ color: primaryColor, marginBottom: '20px' }}>¡Correo enviado!</h1>
                <span style={{ textAlign: 'center', fontSize: '16px', color: '#595959' }}>
                    <p>Te hemos enviado un correo electrónico con un enlace para verificar tu cuenta.</p>
                    <p>Por favor revisa tu bandeja de entrada.</p>
                </span>
                <Flex justify="center" style={{ width: '100%', marginTop: '24px' }}>
                    <Button size='large' type="primary" onClick={handleBackToMenu}>
                        Volver al menú
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
