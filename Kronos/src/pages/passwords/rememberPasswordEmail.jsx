import React, { useState, useEffect } from 'react';
import './passwords.scss';
import { Form, Input, Button, Typography, Modal, Select, Space, message } from 'antd'; 
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage(); 
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const [maskedEmail, setMaskedEmail] = useState(''); // Estado para almacenar el email enmascarado

    const handleBackToMenu = () => {
        navigate('/login');
    };
    const EnviarMail = () => {
        setConfirmModalOpen(false)
        fetch("process.env.REACT_APP_API_URL/api/forgotPassword/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "School-ID": sessionStorage.getItem("actual_school"),
            },
            body: JSON.stringify({
                email: email,
            }),
        })
        .then((response) => {
            if (response.status === 200) {
                return navigate('/mailenviado');
                //NO esta andandooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
            }
            else {
                messageApi.error("Error al enviar el email");
            }
        })

    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/documentTypes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                const datos = data.map((tipo) => ({
                    value: tipo.id,
                    label: tipo.name,
                }));
                setTipoDocumentos(datos);
                // Establecer el valor predeterminado en el formulario
                form.setFieldsValue({ tipoDocumento: datos[0].value });
            });
    }, [form]);

    const maskEmail = (email) => {
        const [user, domain] = email.split('@');
        if (user.length > 4) {
            // Reemplazar con el mismo número de asteriscos que letras ocultas
            const hiddenPart = '*'.repeat(user.length - 4);
            return `${user.slice(0, 4)}${hiddenPart}@${domain}`;
        }
        return `****@${domain}`; // Para emails cortos
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        fetch("process.env.REACT_APP_API_URL/api/create_teacher/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "School-ID": sessionStorage.getItem("actual_school"),
            },
            body: JSON.stringify({
              documentType: values.tipoDocumento,
              document: values.documento,
            }),
          })
            .then((response) =>
              response
                .json()
                .then((data) => ({ status: response.status, body: data }))
            )
            .then(({ status, body }) => {
              if (status === 400) {
                const email = body.user.email;
                setEmail(email);
                const masked = maskEmail(email);
                setMaskedEmail(masked);
                setConfirmModalOpen(true);
              } else if (status === 200) {
                messageApi.error("No existe un usuario con ese documento");
              }
            })
            .catch((error) => {
              console.error("Error al realizar la búsqueda:", error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
        <div style={{ height: '100vh', backgroundColor: '#f0f2f5', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '420px', width: '100%' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Recupera la contraseña</Title>

                <Form
                    form={form}
                    name="change-password"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Space.Compact>
                    <Form.Item
                        style={{ width: '30%' }}
                        name="tipoDocumento"
                    >
                        <Select
                            size="large"
                            options={tipoDocumentos}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '60%' }}
                        name="documento"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, introduce tu documento',
                            },
                            {
                                min: 8,
                                message: 'El formato del documento no es válido',
                            }
                        ]}
                    >
                        <Input 
                            size='large' 
                            type="number" 
                            autoSize={true} 
                            placeholder="Documento"
                        />
                    </Form.Item>
                    </Space.Compact>

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
        </div>

        <Modal
            title="Confirmar recuperación"
            visible={confirmModalOpen}
            onOk={() => EnviarMail()}
            onCancel={() => setConfirmModalOpen(false)}
            okText="Aceptar"
            cancelText="Cancelar"
        >
            <p>Se enviará al mail {maskedEmail}</p>
        </Modal>
        </>
    );
}
