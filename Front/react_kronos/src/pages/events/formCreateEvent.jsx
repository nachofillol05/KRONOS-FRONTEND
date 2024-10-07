import { Form, Input, DatePicker, Flex, Button, Tooltip, Select } from 'antd';
import FilterDropdownTable from '../../components/filterDropTable/FilterDropTable.jsx'; 
import React, { useEffect, useState } from 'react';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { fetchTypesEvent, fetchRoles} from '../../services/events.js'

const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function FormCreateEvent({ handleSubmit, handleVolver }) {
    const [types, setTypes] = useState([]);
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const getTypesEvent = async () => {
            try {
              const data = await fetchTypesEvent();
              const dataConvert = data.map(tipo => ({
                value: tipo.id,
                label: tipo.name,
              }));
              setTypes(dataConvert);
            }  catch (error) {
              console.error("Error fetching data:", error);
            }
        }

        const getRolesEvents = async () => {
            try {
                const data = await fetchRoles();
                const convertData = data.map(role => ({
                    value: role.id,
                    label: role.name
                }));
                setRoles(convertData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getTypesEvent();
        getRolesEvents();
    }, [])

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };


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
