import React, { useState } from 'react';
import { Modal, Select, Button, List } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const ModalComponent = ({ isModalOpen, setIsModalOpen, record, parentRecord, teachers, setSelectedTeacher, asignarMateria }) => {
    const [selectedTeacherModal, setSelectedTeacherModal] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [teacherToRemove, setTeacherToRemove] = useState(null);

    // Filtrar profesores para el select (excluir los ya asignados)
    const assignedTeachers = record.teacher_subject_schools || [];
    const filteredTeachers = teachers.filter(teacher => !assignedTeachers.some(at => at.teacher_id === teacher.value));

    const showConfirmModal = (value) => {
        setTeacherToRemove(value);
        setConfirmModalOpen(true);
    }

    const removeTeacher = () => {
        if (teacherToRemove) {
            fetch('http://127.0.0.1:8000/api/teachersubjectschool/' + teacherToRemove + '/', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                    'School-ID': sessionStorage.getItem('actual_school'),
                    'Content-Type': 'application/json'
                },
            })
            .then(() => {
                setConfirmModalOpen(false);
                setTeacherToRemove(null);
                setIsModalOpen(false); // Cierra el modal principal si es necesario
            })
            .catch(error => {
                console.error('Error removing teacher:', error);
                setConfirmModalOpen(false);
            });
        }
    }

    const handleCancel = () => {
        // Limpiar el valor del Select al cerrar el modal
        setSelectedTeacherModal(null);
        setIsModalOpen(false);
    };

    const setTeachers = (value) => {
        setSelectedTeacherModal(value);
        setSelectedTeacher(value);
    }

    return (
        <>
            <Modal
                width={400}
                title="Asigna profesor a la materia"
                open={isModalOpen}
                onOk={() => {
                    asignarMateria(record.id);
                    setSelectedTeacherModal(null); 
                }}
                onCancel={handleCancel}
            >
                <div style={{ padding: '20px' }}>
                    <p style={{ margin: 0 }}>
                        La materia <b>{parentRecord.name}</b> - <b style={{ textTransform: 'uppercase' }}>{parentRecord.abbreviation}</b> del curso <b>{record.course_name}</b>
                    </p>

                    {assignedTeachers.length > 0 && (
                        <div style={{ marginTop: '10px', marginBottom: '10px', maxHeight: '150px', overflowY: 'auto' }}>
                            <List
                                dataSource={assignedTeachers}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Button 
                                                icon={<CloseOutlined />} 
                                                onClick={() => showConfirmModal(item.id)}
                                            />
                                        ]}
                                    >
                                        {item.teacher_name}
                                    </List.Item>
                                )}
                            />
                        </div>
                    )}

                    {/* Select para asignar un nuevo profesor */}
                    <div style={{ marginTop: '10px' }}>
                        <h6 style={{ margin: 0 }}>Profesor :</h6>
                        <Select
                            size='large'
                            style={{ width: '100%' }}
                            showSearch
                            placeholder="Buscar profesor"
                            options={filteredTeachers}
                            value={selectedTeacherModal} 
                            onChange={value => setTeachers(value)} 
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                title="Confirmar eliminación"
                visible={confirmModalOpen}
                onOk={removeTeacher}
                onCancel={() => setConfirmModalOpen(false)}
                okText="Eliminar"
                cancelText="Cancelar"
            >
                <p>¿Estás seguro de que quieres eliminar este profesor?</p>
            </Modal>
        </>
    );
};

export default ModalComponent;
