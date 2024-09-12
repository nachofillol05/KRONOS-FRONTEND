// Horario.jsx
import React, { Suspense, lazy, useState, useEffect, useCallback, useMemo } from 'react';
import { FloatButton, Drawer, Button, Segmented, DatePicker, Modal } from 'antd';
import { InsertRowAboveOutlined, DownOutlined, UpOutlined, DownloadOutlined, HistoryOutlined, CloseOutlined, AppstoreOutlined, UserSwitchOutlined, EyeOutlined, EditOutlined, FilterOutlined } from '@ant-design/icons';
import CalendarioDirectivo from '../../components/calendario/CalendarioDirectivo.jsx';
import './horarios.scss';

const SelectTeacher = lazy(() => import('./selectTeacher.jsx'));
const Historial = lazy(() => import('./historial.jsx'));
const Horas = lazy(() => import('./infoHour.jsx'));
const SelectCourse = lazy(() => import('./selectCourses.jsx'));

const format = 'DD/MM/YYYY';

function Horario() {
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [editar, setEditar] = useState(false);
    const [mostrarAceptar, setMostrarAceptar] = useState(false);
    const [incomplete, setIncomplete] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        if(sessionStorage.getItem('rol') === "Profesor"){
            console.log("No deberiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            window.location.reload();
        }
    }, []);

    const generarHorario = () => {
        console.log("Generar horario");
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
                console.log(data[0]);
                console.log(data[1]);
                setSubjects(data[0]);
                setIncomplete(data[1]);
                if (data[1].length > 0){
                    openModal();
                }
            });
        setMostrarAceptar(true);

    }
    const aceptarHorario = () => {
        console.log("Aceptar horario");
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
                    console.log("Horario aceptado");
                    return response.json();
                } else {
                    console.log("Horario no aceptado");
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

    // Obtención de datos del servidor (materias)
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/viewschedule/", {
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
            .then(data => setSubjects(data))
            .catch(error => console.error("Error fetching data:", error));
    }, [subjects]);

    const showDrawer = useCallback((content, title) => {
        setDrawerTitle(title);
        setDrawerContent(content);
        setOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setOpen(false);
        setDrawerContent(null);
    }, []);

    const memoizedSegmentedOptions = useMemo(() => [
        { value: 'Visualizar', icon: <><EyeOutlined /> Visualizar</> },
        { value: 'Editar', icon: <><EditOutlined /> Editar</> },
    ], []);

    console.log("Horario.jsx");

    return (
        <>
            <div className="contenedor-filtros contenedor-filtros-horario">
                {sessionStorage.getItem('rol') === "Directivo" && (
                <Segmented
                    size='large'
                    options={memoizedSegmentedOptions}
                    onChange={(value) => setEditar(value === 'Editar')} // Cambia el estado de 'editar'
                />)}
                {/*
                <DatePicker size='large' format={format} />
                <Button icon={<FilterOutlined />} size='large' type='primary'>
                    Filtrar
                </Button>
                */}
            </div>

            {/* Pasar el estado editar al calendario */}
            <CalendarioDirectivo materias={subjects} mibooleano={editar}/>
            <div>
                {sessionStorage.getItem('rol') === "Directivo" && subjects.length === 0 && !mostrarAceptar? (
                    <Button type="primary" onClick={generarHorario}>Generar automáticamente</Button>
                ) : sessionStorage.getItem('rol') === "Directivo" && mostrarAceptar ? (
                    <Button type="primary" onClick={aceptarHorario}>Aceptar horario</Button>
                ) : null}
            </div>	
            
            <FloatButton.Group
                visibilityHeight={1500}
                trigger="click"
                type="primary"
                closeIcon={<DownOutlined />}
                icon={<UpOutlined />}
            >
                <FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />
                <FloatButton icon={<UserSwitchOutlined />} type='primary' tooltip="Seleccionar profesores"
                    onClick={() => showDrawer(
                        <Suspense fallback={<div>Loading...</div>}>
                            <SelectTeacher />
                        </Suspense>, 'Seleccione un profesor')}
                />
                <FloatButton icon={<HistoryOutlined />} type='primary' tooltip="Historial de cambios"
                    onClick={() => showDrawer(
                        <Suspense fallback={<div>Loading...</div>}>
                            <Historial />
                        </Suspense>, 'Historial de cambios')}
                />
                <FloatButton icon={<InsertRowAboveOutlined />} type='primary' tooltip="Horas catedra"
                    onClick={() => showDrawer(
                        <Suspense fallback={<div>Loading...</div>}>
                            <Horas showDrawer={showDrawer} />
                        </Suspense>, 'Horas catedra')}
                />
                <FloatButton icon={<AppstoreOutlined />} type='primary' tooltip='Cursos'
                    onClick={() => showDrawer(
                        <Suspense fallback={<div>Loading...</div>}>
                            <SelectCourse showDrawer={showDrawer} />
                        </Suspense>, 'Cursos')}
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
            
            {showModal?(
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
            
            ): null}
        </>
    );
}

export default React.memo(Horario);
