import React from 'react';
import './passwords.scss';
import { Form, Input, Button, Typography } from 'antd'; // Cambié a Typography para mejorar la gestión de textos
import { Flex } from 'antd'; // Assumiendo que existe este componente, aunque Ant Design no lo tiene nativo
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Login() {

    const handleBackToMenu = () => {
        navigate('/'); // Asume que tienes una ruta al menú principal
    };


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Flex
            style={{ height: '100vh', backgroundColor: '#f0f2f5', padding: '20px' }} // Fondo gris claro para el contraste
            align="center"
            justify="center"
        >
            <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '420px', width: '100%' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Recupera la contraseña</Title>

                <Form
                    name="change-password"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<Text strong>Email</Text>} // Mejora de la legibilidad del label
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, introduce tu email',
                            },
                            {
                                type: 'email',
                                message: 'El formato del email no es válido',
                            }
                        ]}
                    >
                        <Input size='large' placeholder='Ingresa tu email' />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginBlock: '10px' }}>
                        <Button size='large' type="primary" htmlType="submit" block>
                            Mandar email
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Button type="link" style={{ padding: 0, fontSize: '14px' }} onClick={handleBackToMenu}>
                            Volver al menu
                        </Button>
                    </div>
                </Form>
            </div>
        </Flex>
    );
}
