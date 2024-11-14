import React, { useEffect } from 'react';
import { Form, Input, Button, Flex, Tooltip, Select, Spin, message } from 'antd';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';

export default function FormCreateWorker({  recargar,setRecargar,handleVolver, tipoDocumento, tipoDocumentoId, documento,onClose }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();


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
                const values = await form.validateFields();
                setLoading(true); 
                console.log("empieza");
        
                const body = JSON.stringify({
                    first_name: values.nombre,
                    last_name: values.apellido,
                    document: values.documento,
                    documentType: values.tipoDocumento,
                    email: values.email,
                    phone: values.telefono,
                    password: values.documento,
                });
        
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ", body);
        
                const response = await fetch("http://localhost:8000/api/Register/", {
                    method: "POST",
                    headers: {
                        Authorization: "Token " + localStorage.getItem("token"),
                        "School-ID": sessionStorage.getItem("actual_school"),
                        "Content-Type": "application/json",
                    },
                    body: body,
                });
        
                if (response.status === 201) {
                    onClose();
                    messageApi.success("Usuario creado con éxito");
                    setRecargar(!recargar);
                    setLoading(false);
                } else if (response.status === 400) {
                    const errorData = await response.json();
                    console.log("Errores de respuesta: ", errorData);
                    const errorMessages = Object.values(errorData).flat();
                    setLoading(false);
                    messageApi.error(errorMessages.join(" "));
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                setLoading(false);
            }
        };
        


    return (
        <Spin spinning={loading} tip="Mandando mail de verificación...">
            {contextHolder}
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
