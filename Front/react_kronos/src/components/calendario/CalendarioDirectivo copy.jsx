import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Col, Dropdown, Menu, Tooltip } from 'antd';
import './Calendario.scss';

export default function Calendario({ materias, mibooleano }) {
    const [selectedItems, setSelectedItems] = useState({});
    const [coursesDinamic, setCoursesDinamic] = useState([]);
    const [modulesData, setModulesData] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState({}); // Almacena materias disponibles por módulo y curso

    // Fetch para obtener cursos dinámicos
    useEffect(() => {
        fetch('http://localhost:8000/api/courses/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then(response => response.json())
            .then(data => {
                const courses = data.map(curs => ({
                    value: curs.id,
                    label: curs.name,
                }));
                setCoursesDinamic(courses);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Fetch para obtener módulos (horarios)
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
            setModulesData(Object.values(data)); // Guarda los módulos obtenidos
        })
        .catch(error => console.error('Error fetching modules:', error));
    }, []);

    // Función para obtener las materias disponibles para un módulo y curso específicos
    const obtenerMateriasModule = (moduleId, courseId) => {
        const url = new URL('http://localhost:8000/api/subjectpermodule/');
        const params = { module_id: moduleId, course_id: courseId };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then((response) => response.json())
            .catch(error => console.error('Error fetching subjects:', error));
    };

    const handleMenuClick = useCallback((e, key) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [key]: e.key
        }));
    }, []);

    const getCellKey = useCallback((hour, course) => {
        return `${hour}-${course}`;
    }, []);

    const handleDropdownClick = async (hour, course) => {
        const moduleId = hour; // Módulo = hora
        const courseId = course.value;

        if (!availableSubjects[getCellKey(hour, course)]) {
            const subjects = await obtenerMateriasModule(moduleId, courseId);
            setAvailableSubjects(prev => ({
                ...prev,
                [getCellKey(hour, course)]: subjects
            }));
        }
    };

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

    const memoizedDays = useMemo(() => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], []);
    const memoizedCourses = useMemo(() => coursesDinamic, [coursesDinamic]);

    return (
        <div className="Calendario" style={{ margin: 'auto' }}>
            <Row wrap={false}>
                <Col className='columna'>
                    <Row className='esquina' style={{ width: '200px' }}>
                        <Row className='casilla esquina'>Día</Row>
                        <Row className='casilla esquina'>Hora</Row>
                    </Row>
                    {memoizedDays.map((day, dayIndex) => (
                        <Row key={dayIndex}>
                            <Col className='casilla columna'>{day}</Col>
                            <Col key={dayIndex}>
                                {modulesData.filter(module => module.day === day.toLowerCase()).map((module, moduleIndex) => (
                                    <Row key={moduleIndex} className='casilla columna'>{module.moduleNumber}</Row>
                                ))}
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Row wrap={false}>
                    {memoizedCourses.map((course, courseIndex) => (
                        <Col key={courseIndex}>
                            <Row className='casilla encabezado'>{course.label}</Row>
                            {memoizedDays.map((day, dayIndex) => (
                                <React.Fragment key={dayIndex}>
                                    {modulesData.filter(module => module.day === day.toLowerCase()).map((module, moduleIndex) => {
                                        const key = getCellKey(module.moduleNumber, courseIndex);
                                        const selectedSubjectValue = selectedItems[key];

                                        const subjectsForModule = availableSubjects[key] || [];

                                        const menu = (
                                            <Menu onClick={(e) => handleMenuClick(e, key)}>
                                                {subjectsForModule.map((subject) => (
                                                    <Menu.Item key={subject.value}>
                                                        {subject.label}
                                                    </Menu.Item>
                                                ))}
                                            </Menu>
                                        );

                                        return (
                                            <Col key={key}>
                                                {mibooleano ? (
                                                    <Dropdown
                                                        overlay={menu}
                                                        trigger={['click']}
                                                        onClick={() => handleDropdownClick(module.moduleNumber, course)}
                                                    >
                                                        <a className='espacio' style={{
                                                            color: selectedSubjectValue ? selectedSubjectValue.color : "",
                                                            backgroundColor: makeColorTransparent(selectedSubjectValue ? selectedSubjectValue.color : "white", 0.1),
                                                        }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                                {selectedSubjectValue ? selectedSubjectValue.avatar : ""}
                                                                {selectedSubjectValue ? selectedSubjectValue.abreviation : ""}
                                                            </div>
                                                        </a>
                                                    </Dropdown>
                                                ) : (
                                                    <Tooltip title="Información de la materia">
                                                        <a className='espacio'>
                                                            {/* Mostrar información de la materia */}
                                                        </a>
                                                    </Tooltip>
                                                )}
                                            </Col>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </Col>
                    ))}
                </Row>
            </Row>
        </div>
    );
}
