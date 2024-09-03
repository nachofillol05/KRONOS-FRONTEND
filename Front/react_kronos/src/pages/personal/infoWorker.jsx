import React, { useState } from 'react';
import { Button, Flex, List, Divider, Tooltip, Menu, Dropdown, Modal, Checkbox } from 'antd';
import { RollbackOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

export default function Infouser({ handleVolver, handleContactar, user }) {
    const data = user.subjects.map(subject => `${subject.subject_name} - ${subject.school_name}`);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]); // Estado para manejar los checkboxes

    const handleOk = () => {
        setIsModalVisible(false);
        // Realizar acciones al confirmar la selección
    };

    const showModal = () => {
        setSelectedRoles([]); // Desmarca todos los checkboxes al abrir el modal
        setIsModalVisible(true);
    };

    const handleCheckboxChange = (checkedValues) => {
        setSelectedRoles(checkedValues); // Actualiza el estado cuando cambian los checkboxes
    };

    // agregar como directivo, como preceptor o como profesor
    const handleAgregar = (e) => {
        if (e.key === "Profesor") {
            console.log("Profesor");
        } else if (e.key === "Preceptor") {
            console.log("Preceptor");
        } else if (e.key === "Directivo") {
            console.log("Directivo");
        }
    };

    const menu = (
        <Menu size="large" onClick={(e) => {
            handleAgregar(e);
        }}>
            <Menu.Item key="Profesor">Profesor</Menu.Item>
            <Menu.Item key="Preceptor">Preceptor</Menu.Item>
            <Menu.Item key="Directivo">Directivo</Menu.Item>
        </Menu>
    );

    return (
        <>
            <Flex vertical gap={10}>
                <Flex align='center' gap={30} style={{ width: '70%', height: '50px' }}>
                    <label>Foto de perfil:</label>
                    <img
                        width={50}
                        height={50}
                        src="https://via.placeholder.com/150"
                        style={{ borderRadius: '50%' }}
                    />
                </Flex>
                <Flex gap={30}>
                    <label>Nombre: {user.first_name} {user.last_name}</label>
                    <label>Documento: {user?.documentType?.name},  {user.document}</label>
                </Flex>
                <Flex gap={30}>
                    <label>Telefono:  {user.email}</label>
                    <label>Email: {user.email}</label>
                </Flex>
                <Divider orientation='left'>Asignaturas</Divider>
                <List
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
                <Flex style={{ marginTop: '20px' }} gap={30} justify='flex-end'>
                    <Tooltip title="Volver">
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={() => handleVolver()} />
                    </Tooltip>
                    <Tooltip title="Contactar">
                        <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => showModal()} />
                    </Tooltip>
                    <Tooltip title="Contactar">
                        <Button type='primary' size='large' iconPosition='end' icon={<MailOutlined />} style={{ width: "100px" }} onClick={handleContactar} />
                    </Tooltip>
                </Flex>
            </Flex>
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                okText="Asignar"
                cancelText="Cancelar"
                title='Asigna un rol al trabajador'
                okButtonProps={{ disabled: selectedRoles.length === 0 }} // Deshabilita si no hay roles seleccionados
            >
                <p>
                    Por favor seleccione el rol o los roles que se le asignará a {user.first_name + " " + user.last_name}
                </p>

                <Checkbox.Group
                    style={{ width: '100%', paddingTop: 20 }}
                    value={selectedRoles} // Vincula el estado al grupo de checkboxes
                    onChange={handleCheckboxChange} // Maneja los cambios en los checkboxes
                >
                    <Flex gap={30}>
                        <Checkbox key={'Profesor'} value="Profesor">Profesor</Checkbox>
                        <Checkbox key={'Preceptor'} value="Preceptor">Preceptor</Checkbox>
                        <Checkbox key={'Directivo'} value="Directivo">Directivo</Checkbox>
                    </Flex>
                </Checkbox.Group>

                {selectedRoles.includes("Directivo") && (
                    <div style={{ marginTop: '20px', width: '80%' }}>
                        <p style={{ color: 'red' }}>Si le asignas el rol directivo tendra acceso a la lectura y modificacion de toda la informacion del colegio</p>
                    </div>
                )}
            </Modal>
        </>
    );
}
