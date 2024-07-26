import React from 'react';
import { Form, Input, Button, Flex } from 'antd';

export default function FormCreateWorker({ handleSubmit, handleVolver }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical">
            <Flex gap={25} vertical>
                <Flex gap={10}>
                    <Form.Item
                        style={{ flexGrow: 1 }}
                        name="nombre"
                        label="Nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el nombre',
                            },
                        ]}
                    >
                        <Input size='large' autoSize={true} placeholder="Ingrese el nombre de la persona" />
                    </Form.Item>
                    <Form.Item
                        style={{ flex: '1 1 auto' }}
                        name="apellido"
                        label="Apellido"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el apellido de la persona',
                            },
                        ]}
                    >
                        <Input size='large' autoSize placeholder="Ingrese el apellido de la persona" />
                    </Form.Item>
                </Flex>
                <Flex gap={10}>
                    <Form.Item
                        style={{ flex: '1 1 auto' }}
                        name="telefono"
                        label="Número de teléfono"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el número de teléfono',
                            },
                        ]}
                    >
                        <Input size='large' type='number' autoSize={true} placeholder="Ingrese el número de teléfono" />
                    </Form.Item>
                    <Form.Item
                        style={{ flex: '1 1 auto' }}
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el email de la persona',
                            },
                        ]}
                    >
                        <Input size='large' type='email' autoSize placeholder="Ingrese el email" />
                    </Form.Item>
                </Flex>
                <Form.Item>
                    <Flex justify='flex-end' gap={10}>
                        <Button size='large' onClick={() => handleVolver()}>Submit</Button>
                        <Button size='large' type="primary" onClick={() => handleSubmit(form)}>Submit</Button>
                    </Flex>
                </Form.Item>
            </Flex>
        </Form>
    );
}
