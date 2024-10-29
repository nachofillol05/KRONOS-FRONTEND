import React, { useEffect } from 'react';
import { Form, Input, Button, Flex, Tooltip, Select, Spin } from 'antd';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';

export default function FormCreateWorker({ handleSubmit, handleVolver, tipoDocumento, tipoDocumentoId, documento }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        form.setFieldsValue({
            tipoDocumento: tipoDocumentoId,
            documento: documento,
        });
    }, [tipoDocumento, documento, form]);

    /*const onFinish =()=>{
        console.log(form.validateFields())
        form.validateFields().then(values => {
            setLoading(true);
            handleSubmit(values);
        }).catch(errorInfo => {
            console.error('Failed to save form:', errorInfo);
        });
    }*/
        

        const onFinish = async () => {
            try {
                const values = await form.validateFields(); // Espera a que se validen los campos
                setLoading(true);
                await handleSubmit(values); // Llama a handleSubmit solo si la validación es exitosa
            } catch (errorInfo) {
                console.error('Failed to save form:', errorInfo);
            } finally {
                setLoading(false); // Detén el spinner independientemente de si hubo errores
            }
        };

    return (
        <Spin spinning={loading} tip="Mandando mail de verificación...">
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
                            {
                                validator: (_, value) => {
                                    // Permitir letras, espacios y caracteres especiales como tildes y ñ
                                    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
                                    if (!value || regex.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Solo puede contener letras, espacios y caracteres especiales.'));
                                },
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                const { value } = e.target;
                                // Permitir solo letras, espacios y caracteres especiales
                                const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
                                if (regex.test(value)) {
                                    e.target.value = value;
                                } else {
                                    e.target.value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                                }
                            }}
                            size='large' 
                            autoSize={true} 
                            placeholder="Ingrese el nombre de la persona" 
                        />
                    </Form.Item>

                        <Form.Item
                            style={{ flex: '1 1 auto' }}
                            name="apellido"
                            label="Apellido"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el apellido',
                                },
                                {
                                    validator: (_, value) => {
                                        // Permitir solo letras y espacios
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (!value || regex.test(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Solo puede contener letras y espacios.'));
                                    },
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
                                {
                                    validator: (_, value) => {
                                        const regex = /^[0-9\s]*$/;
                                        if (!value || regex.test(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Solo puede contener números y espacios.'));
                                    },
                                },
                            ]}
                        >
                            <Input size='large' type='text' autoSize={true} placeholder="Ingrese el número de teléfono" />
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
                                {
                                    type: 'email',
                                    message: 'El correo no es válido.',
                                },
                            ]}
                        >
                            <Input size='large' type='email' autoSize placeholder="Ingrese el email" />
                        </Form.Item>
                    </Flex>

                    <Flex gap={10}>
                        <Form.Item
                            style={{ flex: '1 1 auto' }}
                            name="tipoDocumento"
                            label="Tipo de Documento"
                        >
                            <Select size='large' autoSize={true} disabled placeholder="Tipo de Documento" value={tipoDocumentoId}>
                                <Select.Option key={tipoDocumentoId} value={tipoDocumentoId}>
                                    {tipoDocumento}
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ flex: '1 1 auto' }}
                            name="documento"
                            label="Documento"
                        >
                            <Input size='large' autoSize={true} disabled placeholder="Documento" />
                        </Form.Item>
                    </Flex>
                </Flex>
                <Form.Item>
                    <Flex justify='flex-end' gap={10}>
                        <Tooltip title="Volver">
                            <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={() => handleVolver()} />
                        </Tooltip>
                        <Tooltip title="Agregar">
                            <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={onFinish} />
                        </Tooltip>
                    </Flex>
                </Form.Item>
            </Form>
        </Spin>
    );
}
