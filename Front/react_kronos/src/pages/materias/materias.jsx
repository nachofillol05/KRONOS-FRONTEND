import React, { useState, useEffect } from 'react';
import './materias.scss';
import RangeSlider from "../../components/timerangeslider/timerange.jsx";
import { Table, Select, AutoComplete, FloatButton, Drawer, Input, Form, Button, message } from "antd";
import { FileAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, CloseOutlined } from '@ant-design/icons';

import FormCreateSubject from './formCreateSubject.jsx';



export default function Materias() {
    const [materias, setMaterias] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [Subjectname, setSubjectname] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [loading, setLoading] = useState(true);
    const [materiasMap, setMateriasMap] = useState([]);
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [value, setValue] = useState('');
    const [form] = Form.useForm();


    const [messageApi, contextHolder] = message.useMessage();
    const [messageConfig, setMessageConfig] = useState({ type: '', content: '' });

    useEffect(() => {
        if (messageConfig.type) {
            // Mostrar el mensaje basado en la configuración
            showMessage(messageConfig.type, messageConfig.content);
            // Resetear la configuración del mensaje después de mostrarlo
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
        console.log(`selected ${value}`);
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
            })
            .catch(errorInfo => {
                // Mostrar mensaje de error si los campos no están completos
                showMessage('error', 'Por favor, complete todos los campos.');
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
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", url.toString());
        fetch(url.toString(), {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 2,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("data: ", data);
                setMaterias(data.map(materia => ({ ...materia, key: materia.id })));
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [start_time, end_time, Subjectname, teacher]);

    const columns = [
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Abreviacion', dataIndex: 'abbreviation', key: 'abbreviation' },
        { title: 'Curso', dataIndex: 'course', key: 'course' },
        { title: 'Horas catedra semanales', dataIndex: 'weeklyHours', key: 'weeklyHours' },
        { title: 'Color', dataIndex: 'color', key: 'color' },
        { title: 'Descripcion', dataIndex: 'description', key: 'description' }
    ];

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teachers/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 2,
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
        console.log(value);
    };

    const handleSearch = (searchText) => {
        setSubjectname(searchText);
        console.log("entro");
    };

    const handleFinalRangeChange = (newValues) => {
        console.log("hola")
        setStart_time(newValues[0]);
        setEnd_time(newValues[1]);
        console.log('New range values:', newValues);
    };

    const cursos = [{ value: 1, label: '1A' }, { value: 2, label: '1B' }, { value: 3, label: '2A' }, { value: 4, label: '2B' }, { value: 5, label: '3A' }, { value: 6, label: '3B' }, { value: 7, label: '4A' }, { value: 8, label: '4B' }, { value: 9, label: '5A' }, { value: 10, label: '5B' }];

    return (

        <>
            {contextHolder}
            <div className="filtros-container">
                <div style={{ width: '200px' }}>
                    <RangeSlider range onFinalChange={handleFinalRangeChange} defaultValue={[20, 50]} />
                </div>

                <Select
                    size='large'
                    style={{
                        width: 200,
                    }}
                    showSearch
                    placeholder="Seleccione un Profesor"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={teachers}
                />

                <Select
                    size='large'
                    style={{
                        width: 200,
                    }}
                    showSearch
                    placeholder="Seleccione un curso"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={cursos}
                />

                <AutoComplete
                    size='large'
                    style={{
                        width: 300,
                    }}
                    options={materias.map(materia => ({
                        value: materia.id,
                        label: materia.name,
                    }))}
                    placeholder="Buscar Materia"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>

            <Table dataSource={materias} columns={columns}
                tableLayout={'fixed'}
                filterDropdownOpen={true}
                filtered={true}
            />

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
        </>
    );
}
