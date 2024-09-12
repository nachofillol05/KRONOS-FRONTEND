import React, { useState, useEffect } from 'react';
import { Button, Flex, List, Divider, Tooltip, Modal, Checkbox, Skeleton } from 'antd';
import { RollbackOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';
import DropTable from '../../components/filterDropTable/FilterDropTable';

export default function InfoWorker({ onClose, handleVolver, handleContactar, user }) {
    const data = [...new Set(user.subjects.map(subject => subject.subject_name))];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [courses, setCourse] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/rolesUser/${user.id}/`, {
            method: "GET",
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
                "School-ID": sessionStorage.getItem("actual_school"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.roles)
                setRoles(data.roles)
            })
            .catch((error) => console.error("Error fetching data:", error));
            setIsSkeleton(false);
    }, []);


    const showModal = () => {
        setSelectedRoles([]); // Desmarca todos los checkboxes al abrir el modal
        setIsModalVisible(true);
    };

    const handleCheckboxChange = (checkedValues) => {
        setSelectedRoles(checkedValues); // Actualiza el estado cuando cambian los checkboxes
    };

    // Función para agregar como directivo, preceptor o profesor
    const handleAgregar = () => {
        selectedRoles.forEach(role => {
            console.log(`Asignado como: ${role}`);
        });
        setIsModalVisible(false);
        onClose();
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/years/", {
            method: "GET",
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
                "School-ID": sessionStorage.getItem("actual_school"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const courses = data.map((curs) => ({
                    value: curs.id,
                    label: curs.name,
                }));
                setCourse(courses);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <Skeleton loading={isSkeleton} active>
            <Flex vertical gap={10}>
                <Flex align='center' gap={30} style={{ width: '70%', height: '50px' }}>
                    <label>Foto de perfil:</label>
                    <div style={{ borderRadius: '50%', width:50, height: 50}}>
                      <img
                      src={user.profile_picture? user.profile_picture : "https://via.placeholder.com/150"}
                      style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
                    />
                    </div>
                </Flex>
                <Flex gap={30}>
                    <label>Nombre: {user.first_name} {user.last_name}</label>
                    <label>Documento: {user?.documentType?.name},  {user.document}</label>
                </Flex>
                <Flex gap={30}>
                    <label>Telefono:  {user.phone}</label>
                    <label>Email: {user.email}</label>
                </Flex>
                <Flex gap={30}>
                    <label>Roles: {roles}</label>
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
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={handleVolver} />
                    </Tooltip>
                    <Tooltip title="Agregar">
                        <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={showModal} />
                    </Tooltip>
                    <Tooltip title="Contactar">
                        <Button type='primary' size='large' iconPosition='end' icon={<MailOutlined />} style={{ width: "100px" }} onClick={handleContactar} />
                    </Tooltip>
                </Flex>
            </Flex>

            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                okText="Asignar"
                onOk={handleAgregar}
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
                        <Checkbox key={'Profesor'} checked={roles.includes('Profesor')} value="Profesor">Profesor</Checkbox>{/*Esto no anda ver como aplicarlo*/}
                        <Checkbox key={'Preceptor'} checked={roles.includes('Preceptor')} value="Preceptor">Preceptor</Checkbox>{/*Esto no anda ver como aplicarlo*/}
                        <Checkbox key={'Directivo'} checked={roles.includes('Directivo')} value="Directivo">Directivo</Checkbox>{/*Esto no anda ver como aplicarlo*/}
                    </Flex>
                </Checkbox.Group>

                {selectedRoles.includes("Directivo") && (
                    <div style={{ marginTop: '20px', width: '80%' }}>
                        <p style={{ color: 'red' }}>Si le asignas el rol directivo, tendrá acceso a la lectura y modificación de toda la información del colegio.</p>
                    </div>
                )}

                {selectedRoles.includes("Preceptor") && (
                    <div style={{ marginTop: '20px', width: '80%' }}>
                        <DropTable options={courses} placeholder='Curso del preceptor' />
                    </div>
                )}
            </Modal>
        </Skeleton>
    );
}
