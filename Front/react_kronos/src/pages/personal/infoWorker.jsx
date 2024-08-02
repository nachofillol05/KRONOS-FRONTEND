import React, { useEffect } from 'react';
import { Button, Flex, List, Divider, Tooltip, Menu, Dropdown } from 'antd';
import { RollbackOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

export default function InfoWorker({ handleVolver, handleAgregar, handleContactar,user, showModal }) {
    const data = user.subjects.map(subject => `${subject.subject_name} - ${subject.school_name}`);

    const menu = (
        <Menu onClick={(e) => {
                handleAgregar(e);
        }}>
            <Menu.Item key="Profesor">Profesor</Menu.Item>
            <Menu.Item key="Preceptor">Preceptor</Menu.Item>
            <Menu.Item key="Directivo">Directivo</Menu.Item>
        </Menu>
    );

    return (
        <>
            <Flex gap={10} vertical style={{ flexGrow: 1 }}>
                <h3>Informacion Personal</h3>
                <Flex gap={10}>

                    <label  >Nombre:</label>
                    <label>{user.first_name}</label>
                </Flex>
                <Flex gap={10}>
                    <label>Apellido:</label>
                    <label>{user.last_name}</label>
                </Flex>
                <Flex gap={10}>
                    <label>Documento:</label>
                    <label>{user.document}</label>
                </Flex>
                <Flex gap={10}>
                    <label>Fecha de nacimiento:</label>
                    <label>Fecha de nacimiento</label>
                </Flex>
                <Divider />
                <h3>Informacion de contacto</h3>

                <Flex gap={10}>
                    <label>Telefono:</label>
                    <label>{user.phone}</label>
                </Flex>
                <Flex gap={10}>
                    <label>Email</label>
                    <label>{user.email}</label>
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
                    <Tooltip title="Contactar">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "150px" }} />
                        </Dropdown>
                    </Tooltip>
                    <Tooltip title="Contactar">
                        <Button type='primary' size='large' iconPosition='end' icon={<MailOutlined />} style={{ width: "150px" }} onClick={handleContactar} />

                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
}
