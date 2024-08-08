import React from 'react';
import { Form, Input, Button, Tooltip, Space, Select, ColorPicker, Flex } from 'antd';
import { InfoCircleOutlined, RollbackOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function FormCreateSubject({ handleSubmit, onClose, cursos, value, setValue }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical" hideRequiredMark >
            <Space.Compact>
                <Form.Item
                    style={{ width: '70%' }}
                    name="materia"
                    label="Nombre de la materia"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el nombre de la materia',
                        },
                    ]}
                >
                    <Input size='large' autoSize={true} placeholder="Ingrese el nombre de la materia" />
                </Form.Item>
                <Form.Item
                    style={{ width: '30%' }}
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
            <Flex gap={10}>

                <Form.Item
                    style={{ width: '40%' }}
                    name="horasCatedras"
                    label="Horas Catedras"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese las horas catedra ',
                        },
                    ]}
                >
                    <Input
                        autoSize
                        size='large'
                        value={value}
                        onChange={setValue}
                        type='number'
                        placeholder="Ingrese las horas"
                        suffix={
                            <Tooltip arrow={false} color='gray' title="Unidad de tiempo en la que se lleva a cabo una clase ">
                                <InfoCircleOutlined style={{ color: 'gray' }} />
                            </Tooltip>
                        }
                    />
                </Form.Item>
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
                <Form.Item
                    style={{ width: '30%' }}
                    name="curso"
                    label="Curso"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el curso ',
                        },
                    ]}
                >
                    <Select
                        size='large'
                        placeholder="Curso"
                        options={cursos}
                    />
                </Form.Item>
            </Flex>
            <Form.Item
                name="planEstudio"
                label="Plan de estudio"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el plan de estudio ',
                    },
                ]}
            >
                <TextArea size='large' placeholder="Ingrese el plan de estudio" allowClear style={{ height: '80px' }} />
            </Form.Item>
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
                <TextArea size='large' placeholder="Ingrese la descripcion" allowClear style={{ height: '80px' }} />
            </Form.Item>
            <Form.Item >
                <Flex justify='flex-end' gap={10}>
                    <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={onClose} />

                    <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                </Flex>
            </Form.Item>
        </Form>
    );
}
