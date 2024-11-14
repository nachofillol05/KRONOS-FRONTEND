import React, { useState, useEffect } from 'react';
import { Button, Flex, List, Divider, Tooltip, Modal, Checkbox, Skeleton } from 'antd';
import { RollbackOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';
import DropTable from '../../components/filterDropTable/FilterDropTable';

export default function InfoWorker({ onClose, handleVolver, handleContactar, user }) {
    const data = [...new Set(user.subjects.map(subject => subject.subject_name))];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [courses, setCourse] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [addedRoles, setAddedRoles] = useState([]); // Roles añadidos
    const [removedRoles, setRemovedRoles] = useState([]); // Roles eliminados
    const [selectedYear, setSelectedYear] = useState(user.years.map((year) => year.id));
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaca bro",user.years.map((year) => year.id))
    console.log(user.years.map((year) => year.id))

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
                setRoles(data.roles);
                setSelectedRoles(data.roles);
                setIsSkeleton(false);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const onChangeCurso = (value) => {
        console.log(`selected ${value}`);
        

    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCheckboxChange = (checkedValues) => {
        setSelectedRoles(checkedValues);

        // Calcular los roles añadidos y eliminados
        const newAddedRoles = checkedValues.filter(role => !roles.includes(role));
        const newRemovedRoles = roles.filter(role => !checkedValues.includes(role));
        
        setAddedRoles(newAddedRoles);
        setRemovedRoles(newRemovedRoles);
    };

    const handleAgregar = () => {
            console.log("Roles añadidos: ", addedRoles);
            console.log("Roles eliminados: ", removedRoles);
        
            // Procesar roles añadidos
            addedRoles.forEach(role => {
                const data = { "role":role, "user_id": user.id };
                
                if (role === "Preceptor") {
                    // Agregar el ID del curso seleccionado para el rol de Preceptor
                    data.year_id = selectedYear; // Asigna el ID del curso seleccionado
                }
        
                fetch("http://127.0.0.1:8000/api/addrole/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Token " + localStorage.getItem("token"),
                        "School-ID": sessionStorage.getItem("actual_school"),
                    },
                    body: JSON.stringify(data),
                })
                .then(response => {
                    if (!response.ok) throw new Error(`Error asignando rol: ${role}`);
                    return response.json();
                })
                .then(data => console.log(`Rol ${role} asignado exitosamente`, data))
                .catch(error => console.error("Error:", error));
            });
        
            // Procesar roles eliminados
            removedRoles.forEach(role => {
                const data = { role:role, user_id: user.id };
                
        
                if (role === "Preceptor") {
                    data.year_id = selectedYear; // Asigna el ID del curso correspondiente
                }
        
                fetch("http://127.0.0.1:8000/api/addrole/", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Token " + localStorage.getItem("token"),
                        "School-ID": sessionStorage.getItem("actual_school"),
                    },
                    body: JSON.stringify(data),
                })
                .then(response => {
                    if (!response.ok) throw new Error(`Error eliminando rol: ${role}`);
                    return response.json();
                })
                .then(data => console.log(`Rol ${role} eliminado exitosamente`, data))
                .catch(error => console.error("Error:", error));
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
                    <div style={{ borderRadius: '50%', width: 50, height: 50 }}>
                        <img
                            src={user.profile_picture ? user.profile_picture : "https://via.placeholder.com/150"}
                            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                    </div>
                </Flex>
                <Flex gap={30}>
                    <label>Nombre: {user.first_name} {user.last_name}</label>
                    <label>{user?.documentType?.name}: {user.document}</label>
                </Flex>
                <Flex gap={30}>
                    <label>Telefono: {user.phone}</label>
                    <label>Email: {user.email}</label>
                </Flex>
                <Flex gap={30}>
                    <label>{roles.length !== 0 ? `Roles: ${roles.join(', ')}` : 'No pertenece a esta escuela'}</label>
                </Flex>
                {roles.includes('Profesor') && (
                    <>
                        <Divider orientation='left'>Asignaturas</Divider>
                        <List
                            size="small"
                            bordered
                            dataSource={data}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />
                    </>
                )}
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
                okButtonProps={{ disabled: removedRoles.length === 0 && addedRoles.length === 0 }}
            >
                <p>Por favor seleccione el rol o los roles que se le asignará a {user.first_name + " " + user.last_name}</p>

                <Checkbox.Group
                    style={{ width: '100%', paddingTop: 20 }}
                    value={selectedRoles}
                    onChange={handleCheckboxChange}
                >
                    <Flex gap={30}>
                        <Checkbox key={'Profesor'} checked={roles.includes('Profesor')} value="Profesor">Profesor</Checkbox>
                        <Checkbox key={'Preceptor'} checked={roles.includes('Preceptor')} value="Preceptor">Preceptor</Checkbox>
                        <Checkbox key={'Directivo'} checked={roles.includes('Directivo')} value="Directivo">Directivo</Checkbox>
                    </Flex>
                </Checkbox.Group>

                {selectedRoles.includes("Directivo") && (
                    <div style={{ marginTop: '20px', width: '80%' }}>
                        <p style={{ color: 'red' }}>Si le asignas el rol directivo, tendrá acceso a la lectura y modificación de toda la información del colegio.</p>
                    </div>
                )}

                {selectedRoles.includes("Preceptor") && (
                    <div style={{ marginTop: '20px', width: '80%' }}>
                        <DropTable onChange={onChangeCurso} options={courses} placeholder='Curso del preceptor' />
                        <FilterDropdownPersonalizado options={courses} tempSelectedKeys={selectedYear} setTempSelectedKeys={setSelectedYear} onChange={(value) => setSelectedYear(value)} placeholder={'Años del preceptor'} />
                    </div>
                )}
            </Modal>
        </Skeleton>
    );
}
