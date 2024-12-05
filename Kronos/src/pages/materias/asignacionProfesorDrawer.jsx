import React, { useState } from 'react';
import { Modal, Select, Button, List, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const ModalComponent = ({ onClose, record, parentRecord, teachers, setSelectedTeacher, asignarMateria, removeTeacher }) => {
    const [selectedTeacherModal, setSelectedTeacherModal] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [teacherToRemove, setTeacherToRemove] = useState(null);

    const assignedTeachers = record.teacher_subject_schools || [];
    const filteredTeachers = teachers.filter(teacher => !assignedTeachers.some(at => at.teacher_id === teacher.value));

    const showConfirmModal = (value) => {
        setTeacherToRemove(value);
        setConfirmModalOpen(true);
    }


    const setTeachers = (value) => {
        setSelectedTeacherModal(value);
        setSelectedTeacher(value);
    }

    return (
        <>
                <div style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: 15 }}>
                        {parentRecord.name} - Curso <b>{record.course_name}</b>
                    </h3>


                        <Space.Compact style={{ width: '100%' }}>
                        <Select
                                size='large'
                                style={{ flexGrow: 1 }}
                                showSearch
                                placeholder="Buscar profesor"
                                options={filteredTeachers}
                                value={selectedTeacherModal}
                                onChange={value => setTeachers(value)}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }                            />
                            <Button
                                size='large'
                                onClick={() => {
                                    asignarMateria(record.id, selectedTeacherModal);
                                    onClose()
                                }}
                            >
                                Agregar
                            </Button>
                        </Space.Compact>
                            <List
                            bordered
                                style={{ marginTop: '10px' }}
                                dataSource={assignedTeachers}
                                renderItem={item => (
                                    <List.Item

                                    >
                                        <div 
                                        style={{
                                            width:'100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                        >
                                        {item.teacher_name}
                                        <Button 
                                                icon={<CloseOutlined />} 
                                                onClick={() => showConfirmModal(item.id)}
                                            />
                                        </div>
                                    </List.Item>
                                )}
                            />

                </div>

            <Modal
                title="Confirmar eliminación"
                visible={confirmModalOpen}
                onOk={() => {
                    removeTeacher(teacherToRemove);  // Llama a removeTeacher
                    onClose();
                    setTeacherToRemove(null);
                    // Luego llama a onClose
                }}
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
