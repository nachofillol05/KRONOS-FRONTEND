import React from 'react';
import { Button, Flex, List, Divider, Tooltip } from 'antd';
import { RollbackOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

export default function InfoWorker({ handleVolver, handleAgregar, handleContactar }) {
    const data = [
        'Matematica',
        'Quimica',
        'Fisica',
        'Programacion',
    ]

    return (
        <>
            <Flex gap={10} vertical style={{ flexGrow: 1 }}>
                <h3>Informacion Personal</h3>
                <Flex gap={10}>

                    <label  >Nombre:</label>
                    <label>Nombre</label>
                </Flex>
                <Flex gap={10}>
                    <label>Apellido:</label>
                    <label>Apellido</label>
                </Flex>
                <Flex gap={10}>
                    <label>Documento:</label>
                    <label>DNI</label>
                </Flex>
                <Flex gap={10}>
                    <label>Fecha de nacimiento:</label>
                    <label>Fecha de nacimiento</label>
                </Flex>
                <Divider />
                <h3>Informacion de contacto</h3>

                <Flex gap={10}>
                    <label>Telefono:</label>
                    <label>Telefono</label>
                </Flex>
                <Flex gap={10}>
                    <label>Email:</label>
                    <label>Email</label>
                </Flex>
                <Divider />
                <h3>Materias</h3>
                <List
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
                <br />
                <Flex style={{ flexGrow: 1 }} justify='space-between'>
                    <Tooltip title="Volver">
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "150px" }} onClick={handleVolver} />
                    </Tooltip>
                    <Tooltip title="Agregar">
                        <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "150px" }} onClick={handleAgregar} />
                    </Tooltip>
                    <Tooltip title="Contactar">
                        <Button type='primary' size='large' iconPosition='end' icon={<MailOutlined />} style={{ width: "150px" }} onClick={handleContactar} />

                    </Tooltip>
                </Flex>

            </Flex>
        </>
    );
}
