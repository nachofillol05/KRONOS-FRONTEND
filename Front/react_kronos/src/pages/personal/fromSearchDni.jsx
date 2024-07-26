import React from 'react';
import { Button, Form, Select, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRef } from 'react';

export default function FormSearchDni({ handleSearch }) {
    const [form] = Form.useForm();
    const formRef = useRef(null);

    return (
        <Form form={form} ref={formRef} layout="vertical" hideRequiredMark>
            <Space.Compact>
                <Form.Item
                    initialValue={1}
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
                        size='large'
                        defaultValue={1}
                        options={[{ 'label': 'DNI', 'value': 1 }, { 'label': 'Pasaporte', 'value': 2 }, { 'label': 'Carnet Extranjería', 'value': 3 }]}
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
                    onClick={() => handleSearch(formRef)}
                    type="primary"
                    icon={<SearchOutlined />}
                />
            </Space.Compact>
        </Form>
    );
}
