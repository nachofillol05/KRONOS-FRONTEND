import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Col, Dropdown, Menu, Avatar, Tooltip } from 'antd';
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

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export default function Calendario({ materias, mibooleano }) {
    console.log(materias);
    const [selectedItems, setSelectedItems] = useState({});
    const [coursesDinamic, setCoursesDinamic] = useState([]);
    const [modulesData, setModulesData] = useState([{
        "id": 1,
        "moduleNumber": 1,
        "day": "lunes",
        "endTime": "10:00:00",
        "startTime": "09:00:00"
    },
    {
        "id": 2,
        "moduleNumber": 2,
        "day": "lunes",
        "endTime": "11:00:00",
        "startTime": "10:00:00"
    },
    {
        "id": 3,
        "moduleNumber": 3,
        "day": "lunes",
        "endTime": "12:00:00",
        "startTime": "11:00:00"
    },
    {
        "id": 4,
        "moduleNumber": 4,
        "day": "lunes",
        "endTime": "13:00:00",
        "startTime": "12:00:00"
    },
    {
        "id": 5,
        "moduleNumber": 5,
        "day": "lunes",
        "endTime": "14:00:00",
        "startTime": "13:00:00"
    },
    {
        "id": 6,
        "moduleNumber": 1,
        "day": "martes",
        "endTime": "10:00:00",
        "startTime": "09:00:00"
    },
    {
        "id": 7,
        "moduleNumber": 2,
        "day": "martes",
        "endTime": "11:00:00",
        "startTime": "10:00:00"
    },
    {
        "id": 8,
        "moduleNumber": 3,
        "day": "martes",
        "endTime": "12:00:00",
        "startTime": "11:00:00"
    },
    {
        "id": 9,
        "moduleNumber": 4,
        "day": "martes",
        "endTime": "13:00:00",
        "startTime": "12:00:00"
    },
    {
        "id": 10,
        "moduleNumber": 5,
        "day": "martes",
        "endTime": "14:00:00",
        "startTime": "13:00:00"
    },
    {
        "id": 11,
        "moduleNumber": 1,
        "day": "miércoles",
        "endTime": "10:00:00",
        "startTime": "09:00:00"
    },
    {
        "id": 12,
        "moduleNumber": 2,
        "day": "miércoles",
        "endTime": "11:00:00",
        "startTime": "10:00:00"
    },
    {
        "id": 13,
        "moduleNumber": 3,
        "day": "miércoles",
        "endTime": "12:00:00",
        "startTime": "11:00:00"
    },
    {
        "id": 14,
        "moduleNumber": 4,
        "day": "miércoles",
        "endTime": "13:00:00",
        "startTime": "12:00:00"
    },
    {
        "id": 15,
        "moduleNumber": 5,
        "day": "miércoles",
        "endTime": "14:00:00",
        "startTime": "13:00:00"
    },
    {
        "id": 16,
        "moduleNumber": 1,
        "day": "jueves",
        "endTime": "10:00:00",
        "startTime": "09:00:00"
    },
    {
        "id": 17,
        "moduleNumber": 2,
        "day": "jueves",
        "endTime": "11:00:00",
        "startTime": "10:00:00"
    },
    {
        "id": 18,
        "moduleNumber": 3,
        "day": "jueves",
        "endTime": "12:00:00",
        "startTime": "11:00:00"
    },
    {
        "id": 19,
        "moduleNumber": 4,
        "day": "jueves",
        "endTime": "13:00:00",
        "startTime": "12:00:00"
    },
    {
        "id": 20,
        "moduleNumber": 5,
        "day": "jueves",
        "endTime": "14:00:00",
        "startTime": "13:00:00"
    },
    {
        "id": 21,
        "moduleNumber": 1,
        "day": "viernes",
        "endTime": "10:00:00",
        "startTime": "09:00:00"
    },
    {
        "id": 22,
        "moduleNumber": 2,
        "day": "viernes",
        "endTime": "11:00:00",
        "startTime": "10:00:00"
    },
    {
        "id": 23,
        "moduleNumber": 3,
        "day": "viernes",
        "endTime": "12:00:00",
        "startTime": "11:00:00"
    },
    {
        "id": 24,
        "moduleNumber": 4,
        "day": "viernes",
        "endTime": "13:00:00",
        "startTime": "12:00:00"
    },
    {
        "id": 25,
        "moduleNumber": 5,
        "day": "viernes",
        "endTime": "14:00:00",
        "startTime": "13:00:00"
    }]);


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

    const memoizedSubjects = useMemo(() => subjects, []);
    const memorizedModules = useMemo(() => modulesData, []);
    const memorizedDays = useMemo(() => days, []);
    const memoizedCourses = useMemo(() => coursesDinamic, [coursesDinamic]);

    return (
        <div className="Calendario" style={{ margin: 'auto' }}>
            {/* Fila que envuelve el contenido del calendario */}
            <Row wrap={false}>

                {/* Columna para los días y horas */}
                <Col className='columna'>
                    {days.map((day) => {
                        const memorizedModules = modulesData.filter(
                            (data) => data.day.toLowerCase() === day.toLowerCase()
                        );
                        return (
                            <Row key={day} className='casilla'>
                                {day}
                            </Row>
                        );
                    })}
                </Col>

                {/* Fila que contiene las columnas de cursos */}
                <Row wrap={false}>
                    {memoizedCourses.map((course, courseIndex) => (
                        <Col key={courseIndex}>
                            {/* Encabezado del curso */}
                            <Row className='casilla encabezado'>{course.label}</Row>

                            {/* Iterar sobre los días */}
                            {memorizedDays.map((day, dayIndex) => {
                                // Filtrar módulos por el día actual
                                const filteredModules = memorizedModules.filter(
                                    (module) => module.day.toLowerCase() === day.toLowerCase()
                                );

                                return (
                                    <React.Fragment key={dayIndex}>
                                        {filteredModules.map((module) => (
                                            <React.Fragment key={module.module_id}>
                                                {/* Fila para el día y las horas */}
                                                <Row>
                                                    <Col className='casilla columna'>{day}</Col>

                                                    {/* Iterar sobre las horas dentro del módulo */}
                                                    {module.hours.map((hour, hourIndex) => {
                                                        const key = getCellKey(dayIndex, hourIndex, courseIndex);
                                                        const selectedSubjectValue = selectedItems[key];
                                                        const subject = memoizedSubjects.find(sub => sub.value === selectedSubjectValue);

                                                        // Buscar la materia que coincida con el día, módulo y curso
                                                        const matchingMateria = materias.find(materia =>
                                                            materia.day.toLowerCase() === day.toLowerCase() &&
                                                            materia.moduleNumber === parseInt(hour) &&
                                                            materia.course_id === course.value
                                                        );

                                                        // Definir el sujeto basado en la materia coincidente
                                                        const displaySubject = matchingMateria ? {
                                                            value: matchingMateria.subject_name,
                                                            abreviation: matchingMateria.subject_abreviation,
                                                            color: matchingMateria.subject_color || 'white',
                                                            avatar: <Avatar size={'small'} icon={<UserOutlined />} />,
                                                            teacher: matchingMateria.nombre,
                                                        } : subject;

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
                                                                {/* Dropdown para seleccionar materias o Tooltip */}
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
                                                                                <p style={{ color: '#444', marginBlock: 5 }}>{`${day} ${hour} módulo, ${course.label}`}</p>
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
                                                </Row>
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                );
                            })}
                        </Col>
                    ))}
                </Row>
            </Row>
        </div>
    );
}
