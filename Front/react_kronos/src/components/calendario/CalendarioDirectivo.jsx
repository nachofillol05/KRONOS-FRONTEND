import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Col, Dropdown, Menu, Avatar, Tooltip, Button } from 'antd';
import { UserOutlined, FilterOutlined } from '@ant-design/icons';
import './Calendario.scss';


const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];



export default function Calendario({ materias, mibooleano, setMaterias }) {
    const [selectedItems, setSelectedItems] = useState({});
    const [coursesDinamic, setCoursesDinamic] = useState([]);
    const [modulesData, setModulesData] = useState([]);
    const [mostrarAceptar, setMostrarAceptar] = useState(false);
    const [incomplete, setIncomplete] = useState([]);
    const [menu, setMenu] = useState(null); // Estado para guardar el menú

    // Función para crear el menú dinámicamente al hacer clic
    const handleDropdownClick = (moduleId, courseId, key) => {
        setMenu(null); // Resetea el menú
        const url = new URL('http://localhost:8000/api/subjectpermodule/');
        const params = { module_id: moduleId, course_id: courseId };
        Object.keys(params).forEach(paramKey => url.searchParams.append(paramKey, params[paramKey]));

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
            if (data && Array.isArray(data) && data.length > 0) {
                const generatedMenu = (
                    <Menu onClick={(e) => handleMenuClick(moduleId, courseId, e)}>
                        {data.map((subject) => (
                            <Menu.Item key={subject.id} value={subject.id}>
                                {subject.name}
                            </Menu.Item>
                        ))}
                    </Menu>
                );
                setMenu(generatedMenu);
            } else {
                setMenu(
                    <Menu>
                        <Menu.Item disabled key="no-data">No hay materias disponibles</Menu.Item>
                    </Menu>
                );
            }
        })
        .catch(error => {
            setMenu(
                <Menu>
                    <Menu.Item disabled key="error">Error al cargar materias</Menu.Item>
                </Menu>
            );
        });
    };

    const handleMenuClick = useCallback((moduleId, courseId, e) => {
        console.log(moduleId, courseId, e);
        const selectedSubjectId = e.key;

        fetch(`http://localhost:8000/api/subjectpermodule/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
            body: JSON.stringify({
                "schedules":[{
                    subject_id: selectedSubjectId,
                    course_id: courseId,
                    module_id: moduleId
                }]
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Data actualizada: ', data);
            console.log(materias)
            setMaterias((prevMaterias) => [...prevMaterias, data]);
            // Aquí puedes actualizar el calendario con los datos devueltos
        })
        .catch(error => {
            console.error('Error fetching schedule data:', error);
        });
    }, []);
    
    

    useEffect(() => {
        if(sessionStorage.getItem('rol') === "Profesor"){
            console.log("No deberiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            window.location.reload();
        }
    }, []);


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

   /* const handleMenuClick = useCallback((e, key,courseId) => {
        console.log(e)
        console.log(key)
        console.log(courseId)
        console.log("se añadio la materia")
        //La key sera el id de la materia y puedo llegar a sacar el id del curso y de ahi saco el id del curso y ya tengo la que nceesito y hago el fetch
        setSelectedItems(prevState => ({
            ...prevState,
            [key]: e.key
        }));
    }, []);*/

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


    const memoizedDays = useMemo(() => days, []);
    const memoizedCourses = useMemo(() => coursesDinamic, [coursesDinamic]);
    console.log(materias)
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

                                                // Buscar la materia que coincida con el día, módulo y curso
                                                const matchingMateria = materias.find(materia =>
                                                    materia.day.toLowerCase() === day.toLowerCase() &&
                                                    materia.moduleNumber === parseInt(module.moduleNumber) &&
                                                    materia.course_id === course.value
                                                );
                                                
                                                

                                                // Definir el sujeto basado en la materia coincidente
                                                const displaySubject = matchingMateria ? {
                                                    value: matchingMateria.subject_name,
                                                    abreviation: matchingMateria.subject_abreviation,
                                                    color: matchingMateria.subject_color || 'white',
                                                    avatar: (
                                                        matchingMateria.profile_picture 
                                                            ? <Avatar size={'small'} src={matchingMateria.profile_picture} /> 
                                                            : <Avatar size={'small'} icon={<UserOutlined />} />
                                                    ),
                                                    teacher: matchingMateria.nombre,
                                                } : null;

                                                return (
                                                    <Col key={key}>
                                                        {mibooleano ? (
                                                            <Dropdown
                                                            overlay={menu || <Menu><Menu.Item disabled>Cargando...</Menu.Item></Menu>} // Menú por defecto mientras se carga
                                                            trigger={['click']}
                                                            onVisibleChange={(visible) => {
                                                                if (visible) {
                                                                    handleDropdownClick(module.id, course.value, key);
                                                                }
                                                            }}
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
            
        </>
    );

}
