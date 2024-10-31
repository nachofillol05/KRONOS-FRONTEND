import React, { useState, useEffect } from 'react';
import './materias.scss';
import RangeSlider from "../../components/timerangeslider/timerange.jsx";
import { Spin, Table, Select, Input, FloatButton, Drawer, Form, Button, message, Modal, Flex } from "antd";
import { SearchOutlined, EditOutlined, FileAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, CloseOutlined, FileSearchOutlined } from '@ant-design/icons';
import FormCreateSubject from './formCreateSubject.jsx';
import FormCreateSubjectForCourse from './formCreateSubjectForCourse.jsx';
import ModalComponent from './ModalAsignacion.jsx';
import AsignarProfesor from './asignacionProfesorDrawer.jsx'
import { fetchSubjects, fetchFileSubjects, postSubject, postSubjectInCourse } from '../../services/materias.js';
import { fetchTeachers, deleteTeacher, postTeacher } from '../../services/personal.js';
import { fetchCourses } from '../../services/courses.js';


export default function Materias() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [record, setRecord] = useState([]);
    const [parentRecord, setParentRecord] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [Subjectname, setSubjectname] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
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
    const [isLoading, setLoading] = useState(true)
    const [materias, setMaterias] = useState([]);

    const removeTeacher = async (teacherToRemove) => {
        if (teacherToRemove) {
            try {
                await deleteTeacher(teacherToRemove);
                setRecargar(!recargar);
            } catch (error) {
                console.error('Error remove teacher: ', error);
            }
        }
    };

    const asignarMateria = async (coursesubject_id, idTeacher) => {
        const body = {
            teacher: idTeacher,
            coursesubjects: coursesubject_id,
        }
        setRecargar(!recargar);
        try {
            await postTeacher(body)
        } catch (error) {
            console.error('Error: ', error)
        }
        setRecargar(!recargar);
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
                const MateriaEncontrada = materias.find(materia => materia.name === values.materia);
                const AbreviacionEncontrada = materias.find(materia => materia.abbreviation === values.abreviacion);

                if (MateriaEncontrada) {
                    showMessage('error', 'Ya existe una materia con ese nombre.');
                    return;
                }
                if (AbreviacionEncontrada) {
                    showMessage('error', 'Ya existe una materia con esa abreviacion.');
                    return;
                }
                const hexColor = values.color.toHexString();
                const body = {
                    name: values.materia,
                    abbreviation: values.abreviacion,
                    color: hexColor,
                    description: values.descripcion,
                    courses: []
                };

                postSubject(body)
                    .then(() => {
                        setRecargar(!recargar);
                        onClose();
                    })
                    .catch(() => {
                        showMessage('error', 'Hubo un problema al crear la materia.')
                    })
            })
            .catch(errorInfo => {
                showMessage('error', 'Por favor, complete todos los campos.');
            });
    };

    const handleSubmitConectarCurso = (form) => {
        form.validateFields()
            .then(values => {
                const body = {
                    subject: values.materia,
                    course: values.curso,
                    weeklyHours: values.horasCatedras,
                    studyPlan: values.planEstudio,
                };

                postSubjectInCourse(body)
                    .then(() => {
                        setRecargar(!recargar);
                        onClose();
                    })
                    .catch(() => {
                        showMessage('error', 'Hubo un problema al asignar una materia al curso.')
                    })
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
        const fetchData = async () => {
            try {
                const data = await fetchSubjects(start_time, end_time, teacher, Subjectname)
                setMaterias(data.map(materia => ({
                    ...materia,
                    key: materia.id,
                    anidadas: materia.courses.map(course => ({
                        ...course,
                        name: materia.name,
                        course: course.name,
                        teachers: (
                            course.teacher_subject_schools?.map(ts => ts.teacher_name).join(", ") || "Sin profesor"
                        ),
                        course_name: course.name
                    }))
                })));
            } catch(error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [start_time, end_time, Subjectname, teacher, recargar]);

    const columns = [
        { title: 'Nombre', dataIndex: 'name', key: 'name', width: '20%', },
        { title: 'Abreviacion', dataIndex: 'abbreviation', key: 'abbreviation', width: '15%', },
        { title: 'Descripcion', dataIndex: 'description', key: 'description' },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            width: '10%',
            render: (text) => (
                <div style={{ width: '100%', height: '24px', backgroundColor: text, borderRadius: '4px' }} />
            )
        },
        { title: 'Accion', render: () => <Button size='default' style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }} type='link' icon={<EditOutlined />} />, key: 'action', width: '10%', }

    ];

    const expandColumns = [
        { title: 'Curso', dataIndex: 'course', key: 'course', width: '10%', },
        { title: 'Profesores', dataIndex: 'teachers', key: 'teachers' },
        { title: 'Accion', render: () => <Button size='default' style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }} type='link' icon={<EditOutlined />} />, key: 'action', width: '10%', }
    ]

    const expandedRowRender = (record) => (
        <Table
            bordered
            tableLayout="fixed"
            columns={expandColumns}
            dataSource={record.anidadas}
            pagination={false}
            locale={{
                emptyText: 'No hay datos disponibles', 
              }}
            onRow={(record) => {
                const parent = materias.find(materia =>
                    materia.courses && materia.courses.some(child => child.id === record.id)
                );
                setParentRecord(parent); // Actualiza el estado de parentRecord

                return {
                    onClick: () => showDrawer(
                        <AsignarProfesor
                            onClose={onClose}
                            record={record}
                            parentRecord={parent} // Asegúrate de pasar el objeto parent aquí
                            teachers={teachers}
                            setSelectedTeacher={setSelectedTeacher}
                            asignarMateria={asignarMateria}
                            removeTeacher={removeTeacher}
                        />,
                        'Asigna profesor a la materia'
                    ),
                    onMouseEnter: () => {
                        document.body.style.cursor = 'pointer';
                    },
                    onMouseLeave: () => {
                        document.body.style.cursor = 'default';
                    },
                };
            }}
            
        />
    );

    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = await fetchCourses();
                const courses = data.map(curs => ({
                    value: curs.id,
                    label: curs.year.name + ' ' + curs.name,
                }));
                setCursos(courses);
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        const getTeachers = async () => {
            try {
                const data = await fetchTeachers();
                const teacherNames = data.map(teacher => ({
                    value: teacher.id,
                    label: teacher.first_name + ' ' + teacher.last_name,
                }));
                setTeachers(teacherNames);
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        }

        getCourses();
        getTeachers();
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

    const descargarExcel = async () => {
        try {
            const data = await fetchFileSubjects({export: 'excel'})
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Materias.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
        }
    }

    const showModal = (record) => {
        setRecord(record);
        setIsModalOpen(true);
        const parent = materias.find(materia => materia.courses && materia.courses.some(child => child.id === record.id));
        console.log(parent);
        setParentRecord(parent);

    };

    return (
        (isLoading ?
            <div className="spinner-container">
                <Spin size="large" />
            </div>
            :
            <>
                {contextHolder}
                <div className="contenedor-filtros contenedor-filtros-materias">
                    {/* 
                <RangeSlider range onFinalChange={handleFinalRangeChange} defaultValue={[20, 50]} />
*/}
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
                        suffix={
                            <SearchOutlined
                                style={{
                                    color: 'rgba(0,0,0,.45)',
                                }}
                            />
                        }
                        size="large"
                        style={{
                            width: 300,
                        }}
                        placeholder="Buscar Materia"
                        onChange={onChangeMateria}
                        allowClear
                    />
                </div>
                <Table
                    bordered
                    onRow={() => ({
                        onMouseEnter: () => {
                            document.body.style.cursor = 'pointer';
                        },
                        onMouseLeave: () => {
                            document.body.style.cursor = 'default';
                        },
                    })}
                    pagination={false}
                    y={500}
                    dataSource={materias}
                    columns={columns}
                    tableLayout="fixed"
                    filterDropdownOpen={true}
                    filtered={true}
                    expandRowByClick
                    expandable={{
                        expandedRowRender,
                        defaultExpandedRowKeys: ['0'],
                    }}
                    locale={{
                        emptyText: 'No hay materias disponibles', 
                      }}
                />


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
                    </>) : (<FloatButton icon={<DownloadOutlined />} onClick={descargarExcel} tooltip="Descargar tabla" />)}
                {sessionStorage.getItem('rol') === 'Directivo' && (
                    <ModalComponent
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        record={record}
                        parentRecord={parentRecord}
                        teachers={teachers}
                        setSelectedTeacher={setSelectedTeacher}
                        asignarMateria={asignarMateria}
                    />)}
            </>
        )
    )
}
