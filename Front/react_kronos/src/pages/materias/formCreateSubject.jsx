import React from 'react';
import { Form, Input, Button, Tooltip, Space, Select, ColorPicker, Flex } from 'antd';
import { InfoCircleOutlined, RollbackOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function FormCreateSubject({ handleSubmit, onClose, cursos, value, setValue }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical" hideRequiredMark >
            <Flex gap={10}>
                <Space.Compact>
                    <Form.Item
                        style={{ width: '60%' }}
                        name="materia"
                        label="Nombre de la materia"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el nombre de la materia',
                            },
                        ]}
                    >
                        <Input size='large' autoSize={true} placeholder="Ingrese la materia" />
                    </Form.Item>
                    <Form.Item
                        style={{ width: '40%' }}
                        name="abreviacion"
                        label="Abreviacion"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input size='large' autoSize placeholder="Abreviacion" count={{ show: true, max: 5 }} />
                    </Form.Item>
                </Space.Compact>
                <Form.Item
                    initialValue={'#ff0000'}
                    style={{ width: '30%' }}
                    name="color"
                    label="Color de la materia"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el color de la materia ',
                        },
                    ]}
                >
                    <ColorPicker defaultValue="#ff0000" size="large" showText style={{ width: '100%' }} />
                </Form.Item>
            </Flex>
            <Form.Item
                name="descripcion"
                label="Descripcion"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese la descripcion ',
                    },
                ]}
            >
                <TextArea size='large' placeholder="Ingrese la descripcion" allowClear style={{ height: '150px' }} />
            </Form.Item>
            <Form.Item>
                <Flex justify='flex-end' gap={10}>
                    <Tooltip title="Volver">
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={onClose} />
                    </Tooltip>
                    <Tooltip title="Agregar">
                        <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                    </Tooltip>
                </Flex>
            </Form.Item>
        </Form>
    );
}
