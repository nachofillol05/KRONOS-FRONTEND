import React from 'react';
import { Form, Input, Button, Flex, Tooltip, Select, TimePicker } from 'antd';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Horas from './horas.jsx';

const format = 'HH:mm';
const { RangePicker } = TimePicker;


export default function FormCreateWorker({ handleSubmit, showDrawer }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical">
            <Flex gap={25} vertical>
                <Flex gap={10}>
                    <Form.Item
                        style={{ flexGrow: 1, width: '40%' }}
                        name="numero"
                        label="Numero de hora"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el numero de hora',
                            },
                        ]}
                    >
                        <Input size='large' autoSize={true} placeholder="Ingrese el numero de hora" />
                    </Form.Item>
                    <Form.Item
                        style={{ flexGrow: 1, width: '60%' }}
                        name="dia"
                        label="Dia de la semana"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el dia de semana',
                            },
                        ]}
                    >
                        <Select
                            size='large'
                            placeholder="Dia de la semana"
                        />
                    </Form.Item>
                </Flex>
                <Flex gap={10}>
                    <Form.Item
                        style={{ width: '100%' }}
                        name="horas"
                        label="Hora de inicio y fin"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor la hora de inicio y fin',
                            },
                        ]}
                    >
                        <RangePicker style={{ width: '100%' 
                        }} size='large' defaultValue={dayjs('12:08', format)} format={format} placeholder={['Inicio', 'Fin']} />
                    </Form.Item>
                </Flex>
                <Form.Item>
                    <Flex justify='flex-end' gap={10}>
                        <Tooltip title="Volver">
                            <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={() => showDrawer(<Horas showDrawer={showDrawer}/>, 'Horas catedra')} />
                        </Tooltip>
                        <Tooltip title="Agregar">
                            <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                        </Tooltip>

                    </Flex>
                </Form.Item>
            </Flex>
        </Form>
    );
}
