import React from 'react';
import { Form, Input,InputNumber, Button, Flex, Tooltip, Select, TimePicker } from 'antd';
import FilterDropdownTable from '../../components/filterDropTable/FilterDropTable.jsx';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Horas from './infoHour.jsx';

const format = 'HH:mm';
const { RangePicker } = TimePicker;

const days = [
    { value: 'Lunes', label: 'Lunes' },
    { value: 'Martes', label: 'Martes' },
    { value: 'Miercoles', label: 'Miercoles' },
    { value: 'Jueves', label: 'Jueves' },
    { value: 'Viernes', label: 'Viernes' }
];

export default function FormCreateWorker({showDrawer}) {
    const [form] = Form.useForm();

    const onChange = (value) => {
        console.log(`Seleccionado: ${value}`);
    }

    const handleSubmit = () => {
        // Validar los campos del formulario
        form.validateFields()
            .then((values) => {
                console.log('Datos del formulario enviados:', values);
                console.log(`Formulario enviado. 
                Número de hora: ${values.numero}, 
                Día: ${values.dia}, 
                Horas: ${values.horas ? `${values.horas[0].format(format)} - ${values.horas[1].format(format)}` : ''}`);
            })
            .catch((errorInfo) => {
                console.error('Error al enviar el formulario:', errorInfo);
            });
    };

    return (
        <Form form={form} layout="vertical">
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
                    <Input 
                            size='large' 
                            type="number" 
                            autoSize={true} 
                            placeholder="Ingrese el numero de modulo"
                        />
                </Form.Item>
                <Form.Item
                    style={{ flexGrow: 1, width: '60%' }}
                    name="dia"
                    label="Dia de la semana"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el dias de semana',
                        },
                    ]}
                >
                    <FilterDropdownTable options={days} placeholder="Días:" onChange={onChange} />
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
                    <RangePicker style={{
                        width: '100%'
                    }} size='large' defaultValue={dayjs('12:08', format)} format={format} placeholder={['Inicio', 'Fin']} />
                </Form.Item>
            </Flex>
            <Form.Item>
                <Flex justify='flex-end' gap={10}>
                    <Tooltip title="Volver">
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={() => showDrawer(<Horas showDrawer={showDrawer} />, 'Horas catedra')} />
                    </Tooltip>
                    <Tooltip title="Agregar">
                        <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                    </Tooltip>

                </Flex>
            </Form.Item>
        </Form>
    );
}
