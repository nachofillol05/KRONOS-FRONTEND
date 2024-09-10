import React, { useState, useEffect } from 'react';
import './materias.scss';
import RangeSlider from "../../components/timerangeslider/timerange.jsx";
import { Table, Select, Input, FloatButton, Drawer, Form, Button, message, Modal, Flex } from "antd";
import { FileAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, CloseOutlined, FileSearchOutlined } from '@ant-design/icons';
import FormCreateSubject from './formCreateSubject.jsx';
import FormCreateSubjectForCourse from './formCreateSubjectForCourse.jsx';
import ModalComponent from './ModalAsignacion.jsx';


export default function Materias() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [record, setRecord] = useState([]);
    const [parentRecord, setParentRecord] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [Subjectname, setSubjectname] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [value, setValue] = useState('');
    const [form] = Form.useForm();
    const [cursos, setCursos] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [messageConfig, setMessageConfig] = useState({ type: '', content: '' });
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [recargar, setRecargar] = useState(false);
    const [CursoCompleto, SetCursoCompleto] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const asignarMateria = (coursesubject_id) => {
        
        const body = {
            teacher: selectedTeacher,
            coursesubjects: coursesubject_id,
        }
        console.log(body)
        fetch('http://127.0.0.1:8000/api/teachersubjectschool/', {
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        setIsModalOpen(false)
        
    }
    useEffect(() => {
        setRecargar(!recargar)
    }, [isModalOpen])

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
                const hexColor = values.color.toHexString();
                const body = {
                    name: values.materia,
                    abbreviation: values.abreviacion,
                    color: hexColor,
                    description: values.descripcion,
                    courses: []
                };
                console.log('Formulario completado:', body);
                fetch('http://127.0.0.1:8000/api/subjects/', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'School-ID': sessionStorage.getItem('actual_school'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                })
                setRecargar(!recargar);
                onClose();
            })
            .catch(errorInfo => {
                showMessage('error', 'Por favor, complete todos los campos.');

                setMessageConfig({ type: 'error', content: 'Por favor, complete todos los campos.' });
            });
    };

    const handleSubmitConectarCurso = (form) => {
        form.validateFields()
            .then(values => {
                console.log('entro')
                console.log('aaaaaaaaaaaa',values)
                const body = {
                    subject: values.materia,
                    course: values.curso,
                    weeklyHours: values.horasCatedras,
                    studyPlan: values.planEstudio,
                };
                console.log('Formulario completado:', body);
                fetch('http://127.0.0.1:8000/api/coursesubjects/', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'School-ID': sessionStorage.getItem('actual_school'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),

                })
                setRecargar(!recargar);
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
                        setMaterias(data.map(materia => ({
                            ...materia,
                            key: materia.id,
                            children: materia.courses.map(course => ({
                                ...course,
                                name: '',
                                course: course.name,
                                teachers:(
                                    course.teacher_subject_schools?.map(ts => ts.teacher_name).join(", ") || "Sin profesor"
                                ),
                                course_name: course.name
                            }))
                        })));
                        //setMaterias(data.map(materia => ({ ...materia, key: materia.id, children: materia.courses })));
                        setLoading(false);
                        console.log(data);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            }, [start_time, end_time, Subjectname, teacher,recargar]);

    const columns = [
        { title: 'Nombre', dataIndex: 'name', key: 'name', width: '20%', },
        { title: 'Abreviacion', dataIndex: 'abbreviation', key: 'abbreviation', width: '15%', },
        { title: 'Curso', dataIndex: 'course', key: 'course', width: '15%' },
        { title: 'Profesores', dataIndex: 'teachers', key: 'teachers' },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            width: '15%',
            render: (text) => (
                <div style={{ width: '24px', height: '24px', backgroundColor: text, borderRadius: '4px' }} />
            )
        }
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
                SetCursoCompleto(data);
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
    
    const descargarExcel = () => {
        fetch('http://127.0.0.1:8000/api/subjects/?export=excel', {
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
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Materias.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error al descargar el archivo:", error);
            });
    }

    const showModal = (record) => {        
        if (!('children' in record)) {  
            setRecord(record);
            setIsModalOpen(true);
            const parent = materias.find(materia => materia.courses && materia.courses.some(child => child.id === record.id));
            console.log(parent);
            setParentRecord(parent);
        }
    };
    
    return (
        <>
            {contextHolder}
            <div className="contenedor-filtros contenedor-filtros-materias">
                <RangeSlider range onFinalChange={handleFinalRangeChange} defaultValue={[20, 50]} />

                <Select
                    size='large'
                    style={{ width: 250 }}
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
                    loading={loading}
                    dataSource={materias}
                    columns={columns}
                    tableLayout="fixed"
                    pagination={false}
                    y={500}
                    expandRowByClick
                    footer={false}
                />

            </div>

            {sessionStorage.getItem('rol') === 'Directivo' ? (
                <>
                    <FloatButton.Group
                        visibilityHeight={1500}
                        trigger="click"
                        type="primary"
                        closeIcon={<DownOutlined />}
                        icon={<UpOutlined />}
                    >
                        <FloatButton icon={<DownloadOutlined />} onClick={descargarExcel} tooltip="Descargar tabla" />
                        <FloatButton icon={<FileAddOutlined />} type='primary' tooltip="Agregar una materia"
                            onClick={() => showDrawer(
                                <FormCreateSubject handleSubmit={handleSubmit} onClose={onClose} cursos={cursos} value={value} setValue={setValue} />,
                                'Agregar una materia'
                            )}
                        />
                        <FloatButton icon={<FileSearchOutlined />} type='primary' tooltip="Asignar materia a un curso"
                            onClick={() => showDrawer(
                                <FormCreateSubjectForCourse handleSubmit={handleSubmitConectarCurso} onClose={onClose} cursos={CursoCompleto} value={value} setValue={setValue} />,
                                'Asignar materia a un curso'
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
                </>) : (<FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />)}
                <ModalComponent
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    record={record}
                    parentRecord={parentRecord}
                    teachers={teachers}
                    setSelectedTeacher={setSelectedTeacher}
                    asignarMateria={asignarMateria}
                />
        </>
    )
}
