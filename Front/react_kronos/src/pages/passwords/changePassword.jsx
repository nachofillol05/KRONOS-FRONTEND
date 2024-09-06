import React from 'react';
import './passwords.scss';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function Login() {

    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '20px' }}>
            <div style={{ maxWidth: '420px', width: '100%', padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Cambia tu contraseña</Title>

                <Form
                    name="change-password"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Contraseña anterior"
                        name="current_password"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, introduce tu contraseña anterior',
                            },
                        ]}
                    >
                        <Input.Password size='large' placeholder='Introduce tu contraseña anterior' />
                    </Form.Item>

                    <Form.Item
                        label="Nueva contraseña"
                        name="new_password"
                        rules={[
                            {
                                required: true,
                            message: 'Por favor, introduce tu nueva contraseña',
                        },
                        ]}
                    >
                        <Input.Password size='large' placeholder='Introduce tu nueva contraseña' />
                    </Form.Item>

                    <Form.Item
                        label="Confirmar nueva contraseña"
                        name="confirm_password"
                        dependencies={['new_password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, confirma tu nueva contraseña',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('new_password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size='large' placeholder='Confirma tu nueva contraseña' />
                    </Form.Item>

                    <Form.Item>
                        <Button style={{ width: '100%', marginBottom: '16px' }} size='large' type="primary" htmlType="submit">
                            Cambiar contraseña
                        </Button>
                    </Form.Item>

                    <Button type="link" onClick={() => navigate('/forgot-password')} style={{ width: '100%', textAlign: 'center', padding: 0 }}>
                        Olvidé mi contraseña
                    </Button>
                </Form>
            </div>
        </div>
    );
}
