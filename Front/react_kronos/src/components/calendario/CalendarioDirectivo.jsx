import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Col, Dropdown, Menu, Avatar, Tooltip, Button } from 'antd';
import { UserOutlined, FilterOutlined } from '@ant-design/icons';
import './Calendario.scss';

const subjects = [
    { abreviation: 'MAT', value: "Matematica", teacher: "Juan", label: 'Matemática', color: '#FF0000', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { abreviation: 'LEN', value: "Lengua", teacher: "Pedro", label: 'Lengua', color: '#0000FF', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { abreviation: 'BIO', value: "Biologia", teacher: "Manuel", label: 'Biología', color: '#FFFF00', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { abreviation: 'QIM', value: "Quimica", teacher: "Monica", label: 'Química', color: '#00FF00', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { abreviation: 'MUS', value: "Musica", teacher: "Agustin", label: 'Música', color: '#FF00FF', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { abreviation: 'FIS', value: "Fisica", teacher: "Ethel", label: 'Fisica', color: '#808080', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> }
];



export default function Calendario({ materias, mibooleano }) {
    console.log(materias);
    const [selectedItems, setSelectedItems] = useState({});
    const [coursesDinamic, setCoursesDinamic] = useState([]);
    const [modulesData, setModulesData] = useState([]);
    const [mostrarAceptar, setMostrarAceptar] = useState(false);

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
                materias = data;
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
    }

    const obtenerMateriasModule = (moduleId, courseId) => {
        // Construir la URL con los parámetros
        const url = new URL('http://localhost:8000/api/subjectpermodule/');
        const params = { module_id: moduleId, course_id: courseId };

        // Agregar los parámetros a la URL
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        // Realizar la solicitud fetch
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setModulesData(Object.values(data));
            })
            .catch(error => console.error('Error fetching data:', error));
    }



    /*useEffect(() => {
        fetch('http://localhost:8000/api/subjects/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSubjects(data);
            });
    }, []);
*/

    useEffect(() => {
        fetch('http://localhost:8000/api/modules/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setModulesData(Object.values(data));
                console.log(Object.values(data));
            });
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
                    label: curs.name,
                }));
                setCoursesDinamic(courses);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleMenuClick = useCallback((e, key) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [key]: e.key
        }));
    }, []);

    const makeColorTransparent = useCallback((color, alpha) => {
        alpha = Math.max(0, Math.min(1, alpha));
        const hexToRgba = (hex) => {
            let r = 0, g = 0, b = 0;
            if (hex.length === 4) {
                r = parseInt(hex[1] + hex[1], 16);
                g = parseInt(hex[2] + hex[2], 16);
                b = parseInt(hex[3] + hex[3], 16);
            } else if (hex.length === 7) {
                r = parseInt(hex[1] + hex[2], 16);
                g = parseInt(hex[3] + hex[4], 16);
                b = parseInt(hex[5] + hex[6], 16);
            }
            return `rgba(${r},${g},${b},${alpha})`;
        };

        if (/^#[0-9A-Fa-f]{3,6}$/.test(color)) {
            return hexToRgba(color);
        } else {
            return color;
        }
    }, []);

    const getCellKey = useCallback((dayIndex, hourIndex, courseIndex) => {
        return `${dayIndex}-${hourIndex}-${courseIndex}`;
    }, []);

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    const memoizedSubjects = useMemo(() => subjects, []);
    const memoizedDays = useMemo(() => days, []);
    const memoizedCourses = useMemo(() => coursesDinamic, [coursesDinamic]);

    return (
        <>
            <div className="Calendario" style={{ margin: 'auto' }}>
                {/* Fila que envuelve el contenido del calendario */}
                <Row wrap={false}>
                    {/* Columna para los días */}
                    <Col className="columna">
                        <Row className='esquina' style={{ width: '200px' }}>
                            <Row className='casilla esquina'>Día</Row>
                            <Row className='casilla esquina'>Hora</Row>
                        </Row>
                        {memoizedDays.map((day) => {
                            const moduleData = modulesData.filter(
                                (data) => data.day.toLowerCase() === day.toLowerCase()
                            );
                            return (
                                <Row key={day} >
                                    <Col className='casilla columna'>{day}</Col>
                                    <Col>
                                        {moduleData.map((module) => (
                                            <Row className='casilla columna'>{module.moduleNumber}</Row>
                                        ))}
                                    </Col>
                                </Row>
                            )
                        })}
                    </Col>

                    <Row wrap={false}>
                        {memoizedCourses.map((course, courseIndex) => (
                            <Col key={courseIndex}>
                                <Row className='casilla encabezado'>{course.label}</Row>
                                {memoizedDays.map((day, dayIndex) => {
                                    const moduleData = modulesData.filter(
                                        (data) => data.day.toLowerCase() === day.toLowerCase()
                                    );
                                    return (
                                        <React.Fragment key={dayIndex}>
                                            {moduleData.map((module, hourIndex) => {
                                                const key = getCellKey(dayIndex, hourIndex, courseIndex);
                                                const selectedSubjectValue = selectedItems[key];
                                                const subject = memoizedSubjects.find(sub => sub.value === selectedSubjectValue);

                                                // Buscar la materia que coincida con el día, módulo y curso
                                                const matchingMateria = materias.find(materia =>
                                                    materia.day.toLowerCase() === day.toLowerCase() &&
                                                    materia.moduleNumber === parseInt(module.hour) &&
                                                    materia.course_id === course.value
                                                );

                                                // Definir el sujeto basado en la materia coincidente
                                                const displaySubject = matchingMateria ? {
                                                    value: matchingMateria.subject_name,
                                                    abreviation: matchingMateria.subject_abreviation,
                                                    color: matchingMateria.subject_color || 'white',
                                                    avatar: (
                                                        <Avatar size={'small'} icon={<UserOutlined />} />
                                                    ),
                                                    teacher: matchingMateria.nombre,
                                                } : subject;

                                                // Crear el menú
                                                const menu = (
                                                    <Menu onClick={(e) => handleMenuClick(e, key)}>
                                                        {memoizedSubjects.map((subject) => (
                                                            <Menu.Item key={subject.value}>
                                                                {subject.label}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu>
                                                );

                                                return (
                                                    <Col key={key}>
                                                        {mibooleano ? (
                                                            <Dropdown overlay={menu} trigger={['click']}>
                                                                <a className='espacio' style={{
                                                                    color: displaySubject ? displaySubject.color : "",
                                                                    backgroundColor: makeColorTransparent(displaySubject ? displaySubject.color : "white", 0.1),
                                                                }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                                        {displaySubject ? displaySubject.avatar : ""}
                                                                        {displaySubject ? displaySubject.abreviation : ""}
                                                                    </div>
                                                                </a>
                                                            </Dropdown>
                                                        ) : (
                                                            <Tooltip
                                                                arrow={false}
                                                                trigger={'click'}
                                                                title={displaySubject ? (
                                                                    <div style={{ color: '#8e96a', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                        <b style={{ color: '#444' }}>{displaySubject.value}</b>
                                                                        <b style={{ color: '#444' }}>{displaySubject.teacher}</b>
                                                                        <p style={{ color: '#444', marginBlock: 5 }}> {`${day} ${module.moduleNumber} módulo, ${course.label}`}</p>
                                                                        <a style={{ color: '#227cae', textDecoration: 'none' }}>
                                                                            <FilterOutlined /> Filtrar por este profesor
                                                                        </a>
                                                                    </div>
                                                                ) : ""}
                                                                color='#ffffff'
                                                                overlayClassName='calendar-tooltip'
                                                            >
                                                                <a className='espacio' style={{
                                                                    color: displaySubject ? displaySubject.color : "",
                                                                    backgroundColor: makeColorTransparent(displaySubject ? displaySubject.color : "white", 0.1),
                                                                }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                                        {displaySubject ? displaySubject.avatar : ""}
                                                                        {displaySubject ? displaySubject.abreviation : ""}
                                                                    </div>
                                                                </a>
                                                            </Tooltip>
                                                        )}
                                                    </Col>
                                                );
                                            })}
                                        </React.Fragment>
                                    );
                                })}
                            </Col>
                        ))}
                    </Row>

                </Row>
            </div>
            <div>
                {sessionStorage.getItem('rol') === "Directivo" && materias.length === 0? (
                    <Button type="primary" onClick={generarHorario}>Generar automáticamente</Button>
                ) : sessionStorage.getItem('rol') === "Directivo" && mostrarAceptar ? (
                    <Button type="primary" onClick={aceptarHorario}>Aceptar horario</Button>
                ) : null}
            </div>
        </>
    );

}
