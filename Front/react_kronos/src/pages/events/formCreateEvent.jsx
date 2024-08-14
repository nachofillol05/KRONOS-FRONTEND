
import { Form, Input, DatePicker, Flex, Button, Tooltip, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';

const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function FormCreateEvent({ handleSubmit, handleVolver }) {
    const [types, setTypes] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/typeevent/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data)
            const typeEvents = data.map(event => ({
                value: event.id,
                label: event.name,
            }));
            setTypes(typeEvents);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical">
            <Flex vertical>
                <Form.Item
                    style={{ flexGrow: 1 }}
                    name="nombre"
                    label="Nombre"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el nombre del evento',
                        },
                    ]}
                >
                    <Input size='large' autoSize={true} placeholder="Ingrese el nombre de la persona" />
                </Form.Item>
                <Flex gap={15}>
                    <Form.Item
                        style={{ width: '50%' }}
                        name="dates"
                        label="Fechas"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese las fechas',
                            },
                        ]}
                    >
                        <RangePicker size='large' type='number' autoSize={true} placeholder="Ingrese las fechas" format={dateFormat} />
                    </Form.Item>
                    <Form.Item
                        style={{ width: '50%' }}
                        name="tipoEvento"
                        label="Tipo de evento"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el tipo de evento',
                            },
                        ]}
                    >
                        <Select size='large' type='email' autoSize placeholder="Ingrese el tipo de evento" options={types} />
                    </Form.Item>
                </Flex>
                <Form.Item
                    style={{ flexGrow: 1 }}
                    name="descripcion"
                    label="Descripcion"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la descripcion del evento',
                        },
                    ]}
                >
                <TextArea size='large' placeholder="Ingrese la descripción del evento" allowClear style={{ height: '100px' }} />
                </Form.Item>
                <Form.Item>
                    <Flex justify='flex-end' gap={10}>
                        <Tooltip title="Volver">
                            <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={() => handleVolver()} />
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