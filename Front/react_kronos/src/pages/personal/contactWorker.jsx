import React, { useState, useEffect, useRef } from 'react';
import { Button, Flex, Card, Form, Input, Tooltip, Spin } from 'antd';
import { SendOutlined, RollbackOutlined } from '@ant-design/icons';
const { TextArea } = Input;


export default function ContactWorker({ onClose,handleVolver, user }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    
    const handleMandarMail = (form) => {
        setLoading(true);
        form.validateFields()
            .then(values => {
                const bodyData = {
                    asunto: values.titulo,
                    contenido: values.contenido,
                    teacher_mail: user // Cambiamos a un array simple
                };
    
                console.log(JSON.stringify(bodyData)); // Verifica que bodyData esté bien estructurado
    
                fetch('http://127.0.0.1:8000/api/contacting-staff/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData), // Usa bodyData aquí
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setLoading(false);
                    onClose();
                })
                .catch(error => {
                    console.error("Error:", error);
                    setLoading(false); // Para detener el spinner en caso de error
                });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };
    
    

    return (
        <Flex style={{ flexGrow: 1 }} justify='center'>
            <Card style={{ width: '100%' }}
                title={"Contactar con " + user}
                type="inner"
            >
                <Spin spinning={loading} tip="Mandando mail...">
                    <Form form={form} layout="vertical">
                        <Flex vertical>
                            <Form.Item
                                name="titulo"
                                label="Titulo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese el titulo',
                                    },
                                ]}
                            >
                                <Input size='large' autoSize={true} placeholder="Ingrese el titulo" />
                            </Form.Item>
                            <Form.Item
                                name="contenido"
                                label="Contenido"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese el contenido',
                                    },
                                ]}
                            >
                                <TextArea size='large' placeholder="Ingrese el contenido" allowClear style={{ height: '80px' }} />
                            </Form.Item>

                            <Form.Item>
                                <Flex justify='flex-end' gap={10}>
                                    <Tooltip title="Volver">
                                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={() => handleVolver()} />
                                    </Tooltip>
                                    <Tooltip title="Contactar">
                                        <Button size='large' type="primary" style={{ width: "100px" }} icon={<SendOutlined />} onClick={() => handleMandarMail(form)} />
                                    </Tooltip>
                                </Flex>
                            </Form.Item>
                        </Flex>
                    </Form>
                </Spin>
            </Card>
        </Flex>
    );
}
