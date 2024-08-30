import { Form, Input, DatePicker, Flex, Button, Tooltip, Select } from 'antd';
import FilterDropdownTable from '../../components/filterDropTable/FilterDropTable.jsx'; 
import React, { useEffect, useState } from 'react';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const roles = [
    { value: '1', label: 'Profesor' },
    { value: '2', label: 'Directivo' },
    { value: '3', label: 'Preceptor' },
];


export default function FormCreateEvent({ handleSubmit, handleVolver }) {
    const [types, setTypes] = useState([]);
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/roles/', {
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
            const rols = data.map(rol => ({
                value: rol.id,
                label: rol.name,
            }));
            setRoles(rols);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    

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
            const typeEvents = data.map(event => ({
                value: event.id,
                label: event.name,
            }));
            setTypes(typeEvents);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const onFormSubmit = () => {
        form.validateFields()
            .then(values => handleSubmit(values))
            .catch(errorInfo => {
                console.error('Validation Failed:', errorInfo);
            });
    };

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
                    <Input size='large' autoSize={true} placeholder="Ingrese el nombre del evento" maxLength={255} />
                </Form.Item>
                <Form.Item
                    style={{ width: '50%' }}
                    name="Rolesdirigido"
                    label="Roles dirigido"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el rol al que va dirigido',
                        },
                    ]}
                >
                    <FilterDropdownTable options={roles} placeholder={'Roles: '} />
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
                        <RangePicker size='large' autoSize={true} placeholder="Ingrese las fechas" disabledDate={disabledDate} format={dateFormat} />
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
                        <Select size='large' autoSize placeholder="Ingrese el tipo de evento" options={types} />
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
                    <TextArea size='large' placeholder="Ingrese la descripción del evento" allowClear maxLength={255} style={{ height: '100px' }} />
                </Form.Item>
                <Form.Item>
                    <Flex justify='flex-end' gap={10}>
                        <Tooltip title="Volver">
                            <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={() => handleVolver()} />
                        </Tooltip>
                        <Tooltip title="Agregar">
                            <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={onFormSubmit} />
                        </Tooltip>
                    </Flex>
                </Form.Item>
            </Flex>
        </Form>
    );
}
