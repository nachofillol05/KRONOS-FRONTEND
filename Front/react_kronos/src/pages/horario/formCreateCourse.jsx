import React from 'react';
import { Form, Input, Button, Select, Flex, Tooltip } from 'antd';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import SelectCourse from './selectCourses';
const { TextArea } = Input;

export default function FormCreateCourse({showDrawer}) { // Nombre del componente corregido
    const [form] = Form.useForm();

    const handleSubmit = () => {
        console.log('Formulario enviado');
    };

    return (
        <Form form={form} >
            <Flex gap={35} vertical>
                <Flex justify='space-between'  >
                    <Form.Item
                        style={{ width: '25%' }}
                        layout='vertical'
                        name="Anio"
                        label="año"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, ingrese el año',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Ingrese el año" />
                    </Form.Item>
                    <Form.Item
                        style={{ width: '25%' }}
                        layout='vertical'
                        name="dia"
                        label="Division"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, ingrese la division',
                            },
                        ]}
                    >
                        <Select size="large" placeholder="Division">
                            <Select.Option value="A">A</Select.Option>
                            <Select.Option value="B">B</Select.Option>
                            <Select.Option value="C">C</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                    style={{ width: '45%' }}
                        layout='vertical'
                        name="dia"
                        label="Descrpcion"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, ingrese la descrpcion',
                            },
                        ]}
                    >
                        <TextArea style={{height: 41}} size="large" placeholder="Descrpcion" />
                    </Form.Item>
                </Flex>
                <Flex justify='flex-end' gap={10}>
                    <Tooltip title="Volver">
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={() => showDrawer(<SelectCourse showDrawer={showDrawer} />, 'Horas catedra')} />
                    </Tooltip>
                    <Tooltip title="Agregar">
                        <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                    </Tooltip>

                </Flex>
                </Flex>
        </Form>
    );
}
