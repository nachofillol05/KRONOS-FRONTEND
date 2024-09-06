import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Col, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import { UserOutlined, FilterOutlined } from '@ant-design/icons';
import './Calendario.scss';

const subjects = [
    { value: 'MAT', label: 'Matemática', color: '#FF0000', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'LEN', label: 'Lengua', color: '#0000FF', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'BIO', label: 'Biología', color: '#FFFF00', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'QIM', label: 'Química', color: '#00FF00', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'MUS', label: 'Música', color: '#FF00FF', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'FIS', label: 'Fisica', color: '#808080', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> }
];

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const hours = ['1°', '2°', '3°', '4°', '5°'];

export default function Calendario({ mibooleano }) {
    const [selectedItems, setSelectedItems] = useState({});
    const [coursesDinamic, setCoursesDinamic] = useState([]);
    const [modulesData, setModulesData] = useState([]);

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
                console.log(data);
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
    const memoizedDays = useMemo(() => days, []);
    const memoizedHours = useMemo(() => hours, []);
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
                            {memoizedHours.map((hour, hourIndex) => (
                            
                                <Row className='casilla columna'>{hour}</Row>
                            
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
                                    {memoizedHours.map((hour, hourIndex) => {
                                        const key = getCellKey(dayIndex, hourIndex, courseIndex);
                                        const selectedSubjectValue = selectedItems[key];
                                        const subject = memoizedSubjects.find(sub => sub.value === selectedSubjectValue);

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
                                                            color: subject ? subject.color : 'black',
                                                            backgroundColor: subject ? makeColorTransparent(subject.color, 0.1) : null,
                                                        }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                                {subject ? subject.avatar : null}
                                                                {subject ? subject.value : ""}
                                                            </div>
                                                        </a>
                                                    </Dropdown>
                                                ) : (
                                                    <Tooltip
                                                        arrow={false}
                                                        trigger={'click'}
                                                        title={subject ? (
                                                            <div style={{ color: '#8e96a3' }}>
                                                                <b style={{ color: '#444' }}>{subject.label}</b>
                                                                <p style={{ marginBlock: 5 }}> {`${day} ${hour} módulo, ${course.label}`}</p>
                                                                <a style={{ color: '#227cae', textDecoration: 'none' }}>
                                                                    <FilterOutlined /> Filtrar por este profesor
                                                                </a>
                                                            </div>
                                                        ) : ""}
                                                        color='#ffffff'
                                                        overlayClassName='calendar-tooltip'
                                                    >
                                                        <a className='espacio' style={{
                                                            color: subject ? subject.color : 'black',
                                                            backgroundColor: subject ? makeColorTransparent(subject.color, 0.1) : null,
                                                        }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                                {subject ? subject.avatar : null}
                                                                {subject ? subject.value : ""}
                                                            </div>
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
