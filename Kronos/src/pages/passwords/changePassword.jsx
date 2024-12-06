import React from 'react';
import './passwords.scss';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';

const { Title } = Typography;

export default function ChangePassword() {
    const navigate = useNavigate();
    const { token } = useParams();

    const onFinish = (values) => {
        
        console.log('Received values of form: ', values);
        fetch(process.env.REACT_APP_API_URL +`/api/forgot-password/${token}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                new_password: values.new_password,
                confirm_password: values.confirm_password,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    navigate('/login');
                }
            });
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
                        label="Nueva contraseña"
                        name="new_password"
                        rules={[
                            {
                                required: true,
                            message: 'Por favor, introduce tu nueva contraseña',
                        },
                        {
                            min: 8,
                        message: 'Formato incorrecto: Minimo 8 caracteres',
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
                </Form>
            </div>
        </div>
    );
}
