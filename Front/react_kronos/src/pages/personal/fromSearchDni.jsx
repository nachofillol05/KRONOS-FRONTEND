import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRef } from 'react';

export default function FormSearchDni({ handleSearch }) {
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const [defaultTipoDocumento, setDefaultTipoDocumento] = useState(1);

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
                setDefaultTipoDocumento(datos[0].value);
                form.setFieldsValue({ tipoDni: datos[0].value });
            });
    }, []);
    
    return (
        <Form form={form} ref={formRef} layout="vertical" hideRequiredMark>
            <Space.Compact>
                <Form.Item
                    style={{ width: '30%' }}
                    name="tipoDni"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el tipo de documento',
                        },
                    ]}
                >
                    <Select
                        size="large"
                        value={defaultTipoDocumento} 
                        options={tipoDocumentos}
                    />
                </Form.Item>
                <Form.Item
                    style={{ width: '60%' }}
                    name="documento"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el documento',
                        },
                    ]}
                >
                    <Input size='large' type="number" autoSize={true} placeholder="Documento" />
                </Form.Item>
                <Button
                    style={{ width: '10%' }}
                    size='large'
                    onClick={() => handleSearch(formRef, tipoDocumentos)}
                    type="primary"
                    icon={<SearchOutlined />}
                />
            </Space.Compact>
        </Form>
    );
}
