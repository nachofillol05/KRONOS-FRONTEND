import React from 'react';
import { Form, Input, Button, Tooltip, Space, Select, ColorPicker, Flex } from 'antd';
import { InfoCircleOutlined, RollbackOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function FormCreateSubject({ handleSubmit, onClose, cursos, value, setValue }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical" >
            <Flex gap={10}>
                <Form.Item
                    style={{ width: '40%' }}
                    name="materia"
                    label="Materia"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la materia ',
                        },
                    ]}
                >
                    <Select
                        size='large'
                        placeholder="Materia"
                        options={cursos}
                    />
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
                <Form.Item
                    style={{ width: '30%' }}
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
                        placeholder="Horas catedras"
                        suffix={
                            <Tooltip arrow={false} color='gray' title="Las horas catedras es el tiempo en la que se lleva a cabo la clase ">
                                <InfoCircleOutlined style={{ color: 'gray' }} />
                            </Tooltip>
                        }
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
                <TextArea size='large' placeholder="Ingrese el plan de estudio" allowClear style={{ height: '150px' }} />
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
