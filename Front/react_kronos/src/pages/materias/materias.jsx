import React, { useState, useEffect } from 'react';
import './materias.scss';
import RangeSlider from "../../components/timerangeslider/timerange.jsx";
import { Table, Select, Input, FloatButton, Drawer, Form, Button, message, Modal, Flex } from "antd";
import { FileAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import FormCreateSubject from './formCreateSubject.jsx';

export default function Materias() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [record, setRecord] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [Subjectname, setSubjectname] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [value, setValue] = useState('');
    const [form] = Form.useForm();
    const [cursos, setCursos] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [messageConfig, setMessageConfig] = useState({ type: '', content: '' });

    const showModal = (record) => {
        setRecord(record)
        setIsModalOpen(true)

    };

    useEffect(() => {
        if (messageConfig.type) {
            showMessage(messageConfig.type, messageConfig.content);
            setMessageConfig({ type: '', content: '' });
        }
    }, [messageConfig]);

    const showDrawer = (content, title) => {
        setDrawerTitle(title);
        setDrawerContent(content);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setDrawerContent(null);
    };

    const onChange = (value) => {
        setTeacher(value);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const handleSubmit = (form) => {
        form.validateFields()
            .then(values => {
                console.log('Formulario completado:', values);
                onClose(); // Cerrar el drawer si todos los campos están completos
                const hexColor = values.color.toHexString();
                const body = {
                    name: values.materia,
                    abbreviation: values.abreviacion,
                    courses: values.curso,
                    weeklyHours: parseInt(values.horasCatedras, 10),
                    color: hexColor,
                    studyPlan: values.planEstudio,
                    description: values.descripcion
                };
                fetch('http://127.0.0.1:8000/api/subjects/', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'School-ID': sessionStorage.getItem('actual_school'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),

                })
                onClose();
            })
            .catch(errorInfo => {
                showMessage('error', 'Por favor, complete todos los campos.');

                setMessageConfig({ type: 'error', content: 'Por favor, complete todos los campos.' });
            });
    };

    const showMessage = (type, content) => {
        switch (type) {
            case 'success':
                messageApi.success(content);
                break;
            case 'error':
                messageApi.error(content);
                break;
            case 'warning':
                messageApi.warning(content);
                break;
            case 'info':
                messageApi.info(content);
                break;
            default:
                messageApi.info(content);
                break;
        }
    };

    useEffect(() => {
        const url = new URL('http://127.0.0.1:8000/api/subjects/');
        if (end_time && start_time) {
            url.searchParams.append('start_time', start_time);
            url.searchParams.append('end_time', end_time);
        }
        if (teacher) {
            url.searchParams.append('teacher', teacher);
        }
        if (Subjectname) {
            url.searchParams.append('name', Subjectname);
        }
        console.log(url.toString());
        console.log(sessionStorage.getItem('actual_school'));
        fetch(url.toString(), {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setMaterias(data.map(materia => ({ ...materia, key: materia.id, course: materia.courses.name })));
                setLoading(false);
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [start_time, end_time, Subjectname, teacher]);


    const columns = [
        { title: 'Nombre', dataIndex: 'name', key: 'name', width: 150 },
        { title: 'Abreviacion', dataIndex: 'abbreviation', key: 'abbreviation', width: 150 },
        { title: 'Curso', dataIndex: 'course', key: 'course', width: 100 },
        { title: 'Horas catedra semanales', dataIndex: 'weeklyHours', key: 'weeklyHours', width: 200 },
        { title: 'Color', dataIndex: 'color', key: 'color', width: 100, render: (text) => (<div style={{ width: '24px', height: '24px', backgroundColor: text, borderRadius: '4px' }} />), },
        { title: 'Descripcion', dataIndex: 'description', key: 'description', width: 300 }
    ];

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/courses/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const courses = data.map(curs => ({
                    value: curs.id,
                    label: curs.year.name + ' ' + curs.name,
                }));

                setCursos(courses);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/courses/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const courses = data.map(curs => ({
                    value: curs.id,
                    label: curs.year.name + ' ' + curs.name,
                }));

                setCursos(courses);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teachers/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const teacherNames = data.map(teacher => ({
                    value: teacher.id,
                    label: teacher.first_name + ' ' + teacher.last_name,
                }));
                setTeachers(teacherNames);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleSelectTeacher = (value) => {
        setTeacher(value);
    };

    const handleSearch = (searchText) => {
        setSubjectname(searchText);
    };

    const handleFinalRangeChange = (newValues) => {
        setStart_time(newValues[0]);
        setEnd_time(newValues[1]);
    };
    const onChangeMateria = (event) => {
        const value = event.target.value;
        setSubjectname(value);
    }
/* Al parecer en el back no hay filtro por curso
<Select
                    size='large'
                    style={{ width: 200 }}
                    showSearch
                    placeholder="Seleccione un curso"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={cursos}
                    allowClear
                /> */
    return (
        <>
            {contextHolder}
            <div className="filtros-container">
                <div style={{ width: '200px' }}>
                    <RangeSlider range onFinalChange={handleFinalRangeChange} defaultValue={[20, 50]} />
                </div>

                <Select
                    size='large'
                    style={{ width: 200 }}
                    showSearch
                    placeholder="Seleccione un Profesor"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={teachers}
                    allowClear
                />


                <Input
                    size="large"
                    style={{
                        width: 300,
                    }}
                    placeholder="Buscar Materia"
                    onPressEnter={onChangeMateria}
                    allowClear
                />
            </div>

            <div className="table-container">
                <Table
                onRow={(record) => ({
                    onClick: () => showModal(record),
                })}

                pagination={false}
                loading={loading}
                dataSource={materias}
                columns={columns}
                tableLayout="fixed"
                scroll={{ y: 550 }}
                />

            </div>


            
            <FloatButton.Group
                visibilityHeight={1500}
                trigger="click"
                type="primary"
                closeIcon={<DownOutlined />}
                icon={<UpOutlined />}
            >
                <FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />
                <FloatButton icon={<FileAddOutlined />} type='primary' tooltip="Agregar una materia"
                    onClick={() => showDrawer(
                        <FormCreateSubject handleSubmit={handleSubmit} onClose={onClose} cursos={cursos} value={value} setValue={setValue} />,
                        'Agregar una materia'
                    )}
                />
            </FloatButton.Group>

            <Drawer
                width={600}
                title={drawerTitle}
                onClose={onClose}
                open={open}
                closeIcon={false}
                extra={
                    <Button onClick={onClose} size='large' type='tertiary' icon={<CloseOutlined />} />
                }
            >
                <div style={{ width: '100%', height: '100%' }}>
                    {drawerContent}
                </div>
            </Drawer>
            <Modal 
            width={400}
            title="Asigna profesor a la materia" 
            open={isModalOpen} 
            onOk={() => setIsModalOpen(false)} 
            onCancel={() => setIsModalOpen(false)}>
                <Flex style={{ height: '120px' }} vertical gap={10} justify='space-evenly'>

                    <p>La materia <b>{record.name} </b> - <b style={{ textTransform: 'uppercase' }}>{record.abbreviation}</b>  del curso   <b>{record.course}</b></p>

                    <Flex gap={10} align='center'>
                        <p>Profesor :</p>
                        <Select
                            size='large'
                            style={{ flexGrow: 1 }}
                            showSearch
                            placeholder="Buscar profesor"
                            options={teachers}
                        />

                    </Flex>
                </Flex>
            </Modal>
        </>
    );
}
