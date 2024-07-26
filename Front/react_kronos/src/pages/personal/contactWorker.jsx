import React, { useState, useEffect, useRef } from 'react';
import { Button, Flex, Card, Form, Input, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';


const { TextArea } = Input;


export default function contacWorker({ }) {
    const name = "Nombre de la persona";

    return (
        <Flex style={{ flexGrow: 1 }} justify='center'>
            <Card style={{ width: '100%' }}
                title={name}
                type="inner"
            >
                <Form layout="vertical">
                    <Flex vertical>
                            <Form.Item
                                name="titulo"
                                label="Titulo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese el titulo',
                                    },
                                ]}
                            >
                                <Input size='large' autoSize={true} placeholder="Ingrese el titulo" />
                            </Form.Item>
                            <Form.Item
                                name="contenido"
                                label="Contenido"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese el contenido',
                                    },
                                ]}
                            >
                                <TextArea size='large' placeholder="Ingrese el contenido" allowClear style={{ height: '80px' }} />
                            </Form.Item>

                        <Form.Item>
                            <Flex justify='flex-end'>
                                <Tooltip title="Contactar">
                                <Button size='large' type="primary" style={{ width:"100px"  }} icon={<SendOutlined />}/>
                                </Tooltip>
                            </Flex>
                        </Form.Item>
                    </Flex>
                </Form>
            </Card>
        </Flex>
    );
}
