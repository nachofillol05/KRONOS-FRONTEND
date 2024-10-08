import React, { Suspense, lazy, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FloatButton, Drawer, Button, Segmented, DatePicker, Modal, Spin, Switch } from 'antd';
import { InsertRowAboveOutlined, DownOutlined, UpOutlined, DownloadOutlined, HistoryOutlined, CloseOutlined, AppstoreOutlined, UserSwitchOutlined, EyeOutlined, EditOutlined, FilterOutlined } from '@ant-design/icons';
import CalendarioDirectivo from '../../components/calendario/CalendarioDirectivo.jsx';
import './horarios.scss';
import FilterDropdownTable from '../../components/filterDropTable/FilterDropTable.jsx';
import FilterDropdownPersonalizado from '../../components/filterDropTable/FilterDropPersonalizado.jsx';

const SelectTeacher = lazy(() => import('./selectTeacher.jsx'));
const Historial = lazy(() => import('./historial.jsx'));
const Horas = lazy(() => import('./infoHour.jsx'));
const SelectCourse = lazy(() => import('./selectCourses.jsx'));

const roles = [
    { value: '1', label: 'Profesor 1' },
    { value: '2', label: 'Profesor 2' },
    { value: '3', label: 'Profesor 3' },
];

const dateFormat = 'DD/MM/YYYY';
const messages = [
    "Tiempo espera aproximado 2 minutos...",
    "Sabias que Kronos iba a llamarse Monica en un principio...",
    "Cargando...",
    "En serio no salgas porfas"
];

function Horario() {
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [subjects, setSubjects] = useState(null);
    const [editar, setEditar] = useState(false);
    const [mostrarAceptar, setMostrarAceptar] = useState(false);
    const [incomplete, setIncomplete] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const tipIndexRef = useRef(0);
    const [tipMessage, setTipMessage] = useState(messages[tipIndexRef.current]);
    const [cargandoAuto, setCargandoAuto] = useState(false);
    const [teachers, setTeachers] = useState([])
    const [course, setCourse] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [date, setDate] = useState(null);
    const [tempTeacher, setTempTeacher] = useState(null);
    const [tempCourse, setTempCourse] = useState(null);
    const [tempDate, setTempDate] = useState(null);
    const [courses, setCourses] = useState([]);
    const [tempSelectedKeys, setTempSelectedKeys] = useState();
    const [mostrarAplicar, setMostrarAplicar] = useState(false);

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
                console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa")
                console.log(data)
                const courses = data.map(curs => ({
                    value: curs.id,
                    label: curs.name,
                }));
                console.log(courses)
                setCourses(courses);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (tempTeacher || tempCourse || tempDate || tempSelectedKeys) {
            setMostrarAplicar(true);
        } else {
            setMostrarAplicar(false);
        }
    }, [tempTeacher, tempCourse, tempDate, tempSelectedKeys]);

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

    useEffect(() => {
        if (loading && cargandoAuto) {
            const intervalId = setInterval(() => {
                tipIndexRef.current = (tipIndexRef.current + 1) % messages.length;
                console.log("see ejecuta")
                setTipMessage(messages[tipIndexRef.current]);  // Solo actualiza el mensaje
            }, 5000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [messages.length]);

    useEffect(() => {
        const url = new URL('http://127.0.0.1:8000/api/viewschedule/');
        if (teacher) teacher.forEach(element => { url.searchParams.append('teachers', element) });
        if (course) course.forEach(element => { url.searchParams.append('courses', element) });
        if (date) url.searchParams.append('date', date);

        console.log(url)
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
                "School-ID": sessionStorage.getItem("actual_school"),
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                setSubjects(data.length ? data : []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [teacher, course, date]);



    const showDrawer = useCallback((content, title) => {
        setDrawerTitle(title);
        setDrawerContent(content);
        setOpen(true);
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (sessionStorage.getItem('rol') === "Profesor") {
            console.log("No deberiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            window.location.reload();
        }
    }, []);

    const generarHorario = () => {
        setCargandoAuto(true);
        setLoading(true);
        fetch('http://127.0.0.1:8000/api/new_schedule/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setMostrarAceptar(true);
                if (data[1].length > 0) {
                    setIncomplete(data[1]);
                    openModal();
                }
                setSubjects(data[0]);
            });
    }

    const aceptarHorario = () => {
        fetch('http://127.0.0.1:8000/api/create_schedule/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        setMostrarAceptar(false);
        setIncomplete([]);
    }

    const cancelarHorario = () => {
        setSubjects([]);
        setMostrarAceptar(false);
        setIncomplete([]);
    }

    const onClose = useCallback(() => {
        setOpen(false);
        setDrawerContent(null);
    }, []);

    const memoizedSegmentedOptions = useMemo(() => [
        { value: 'Visualizar', icon: <><EyeOutlined /> Visualizar</> },
        { value: 'Editar', icon: <><EditOutlined /> Editar</> },
    ], []);


    return (
        <>
            <Spin
                spinning={loading}
                tip={
                    cargandoAuto ? (
                        <div>
                            <div>Esto podría demorar unos minutos...</div>
                            <div>Por favor, no salga de la página</div>
                            <div>{tipMessage}</div>
                        </div>
                    ) : (
                        <div>
                            <div>Esto podría demorar unos segundos...</div>
                            <div>Cargando la tabla...</div>
                        </div>
                    )
                }
            >

                <div className="contenedor-filtros contenedor-filtros-horario">
                    {sessionStorage.getItem('rol') === "Directivo" && !mostrarAceptar && (
                        <Switch
                            size='default'
                            checkedChildren="Editar"
                            unCheckedChildren="Visualizar"
                            onChange={(checked) => setEditar(checked)}
                        />

                    )}
                    {!mostrarAceptar ? (
                        <>
                            <FilterDropdownPersonalizado options={teachers} tempSelectedKeys={tempSelectedKeys} setTempSelectedKeys={setTempSelectedKeys} onChange={(value) => setTempTeacher(value)} placeholder={'Profesores: '} />
                            <FilterDropdownTable options={courses} onChange={(value) => setTempCourse(value)} placeholder={'Cursos: '} />
                            <DatePicker
                                size="large"
                                placeholder="Fecha"
                                style={{ width: 200 }}
                                format={dateFormat}
                                allowClear
                                onChange={(date, dateString) => setTempDate(dateString)}
                            />
                            {mostrarAplicar ? (
                                <Button type="primary" onClick={() => {
                                    setTeacher(tempSelectedKeys);
                                    setCourse(tempCourse);
                                    setDate(tempDate);
                                    setLoading(true);
                                    setCargandoAuto(false);
                                }}>Aplicar Filtros</Button>) : null}
                            {(teacher || course || date) ? (
                                <Button type="primary" onClick={() => {
                                    setTeacher(null);
                                    setTempCourse(null)
                                    setCourse(null);
                                    setDate(null);
                                    setTempSelectedKeys(null);
                                    setCargandoAuto(false);
                                    setLoading(true);
                                    setMostrarAplicar(false);
                                }}>Limpiar Filtros</Button>
                            ) : null}
                        </>
                    ) : null}
                </div>

                <CalendarioDirectivo CursosMostrar={course} tempSelectedKeys={tempSelectedKeys} setTempSelectedKeys={setTempSelectedKeys} setTeacher={setTempTeacher} materias={subjects ? subjects : []} mibooleano={editar} setMaterias={setSubjects} />
                <div>
                    {sessionStorage.getItem('rol') === "Directivo" && !mostrarAceptar && !subjects?.length && !loading ? (
                        <Button type="primary" onClick={generarHorario}>Generar automáticamente</Button>
                    ) : sessionStorage.getItem('rol') === "Directivo" && mostrarAceptar ? (
                        <>
                            <Button type="primary" onClick={aceptarHorario}>Aceptar horario</Button>
                            <Button type="primary" onClick={cancelarHorario}>Cancelar horario</Button>
                        </>
                    ) :
                        subjects?.length ? (
                            <Button type="primary" onClick={generarHorario}>Completar automáticamente</Button>
                        ) :
                            null}
                </div>

                <FloatButton.Group
                    visibilityHeight={1500}
                    trigger="click"
                    type="primary"
                    closeIcon={<DownOutlined />}
                    icon={<UpOutlined />}
                >
                    <FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />
                    <FloatButton icon={<HistoryOutlined />} type='primary' tooltip="Historial de cambios"
                        onClick={() => showDrawer(
                            <Suspense fallback={<Spin />}><Historial /></Suspense>, 'Historial de cambios')}
                    />
                    <FloatButton icon={<InsertRowAboveOutlined />} type='primary' tooltip="Horas catedra"
                        onClick={() => showDrawer(
                            <Suspense fallback={<Spin />}><Horas showDrawer={showDrawer} /></Suspense>, 'Horas catedra')}
                    />
                    <FloatButton icon={<AppstoreOutlined />} type='primary' tooltip='Cursos'
                        onClick={() => showDrawer(
                            <Suspense fallback={<Spin />}><SelectCourse showDrawer={showDrawer} /></Suspense>, 'Cursos')}
                    />
                </FloatButton.Group>

                <Drawer
                    destroyOnClose={false}
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

                {showModal ? (
                    <Modal
                        title="Error al generar horario"
                        visible={showModal}
                        onCancel={closeModal}
                        footer={[
                            <Button key="ok" onClick={closeModal}>
                                Cerrar
                            </Button>
                        ]}
                    >
                        <div>
                            <h2>Horario incompleto</h2>
                            <p>El horario no se ha completado, faltan las siguientes materias:</p>
                            <ul>
                                {incomplete.map((materia, index) => (
                                    <li key={index}>{materia}</li>
                                ))}
                            </ul>
                        </div>
                    </Modal>
                ) : null}
            </Spin>
        </>
    );
}

export default Horario;
