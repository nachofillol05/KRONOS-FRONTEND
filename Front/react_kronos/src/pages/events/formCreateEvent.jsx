
import { Form, Input, DatePicker, Flex, Button, Tooltip, Select } from 'antd';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';

const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
const { TextArea } = Input

var datos = [
    {
        value: 1,
        label: "Opción 1",
    },
    {
        value: 2,
        label: "Opción 2",
    },
    {
        value: 3,
        label: "Opción 3",
    },
    {
        value: 4,
        label: "Opción 4",
    },
];

export default function FormCreateWorker({ handleSubmit, handleVolver }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical">
            <Flex gap={25} vertical>
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
                        <Select size='large' type='email' autoSize placeholder="Ingrese el email" options={datos} />
                    </Form.Item>
                </Flex>
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
                    <TextArea size='large' autoSize={true} placeholder="Ingrese el nombre de la persona" />
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