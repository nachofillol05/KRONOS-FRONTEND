import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Dropdown, Input, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Calendario.css';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const hours = ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°', '10°', '11°'];
const courses = [
    '1°A', '1°B', '1°C',
    '2°A', '2°B', '2°C',
    '3°A', '3°B', '3°C',
    '4°A', '4°B', '4°C',
    '5°A', '5°B', '5°C',
    '6°A', '6°B', '6°C',
    '7°A', '7°B', '7°C'
];
const subjects = [
    { value: 'MAT', label: 'Matemática', color: '#FFF', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'LEN', label: 'Lengua', color: '#0000FF', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'BIO', label: 'Biología', color: '#FFFF00', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'QIM', label: 'Química', color: '#000000', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'MUS', label: 'Música', color: '#AA22CC', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'FIS', label: 'Fisica', color: '#808080', avatar: <Avatar size={'small'} icon={<UserOutlined />} /> }
];

function Calendario() {
    const [selectedItems, setSelectedItems] = useState({});

    const obtenerMaterias = (course, modulo) => {
        //console.log('obtenerMaterias', course, modulo);
        /*
        fetch('http://127.0.0.1:8000/api/subjectpermodule/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },body: JSON.stringify({ course_id: course, module_id: modulo })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data)
            return data;
        })
        .catch(error => console.error('Error fetching data:', error));*/
    };

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
        } else if (/^rgba?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(,\s*\d?\d?\d?\d?)?\)$/.test(color)) {
            const rgbaMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d?\.?\d+))?\)$/);
            const r = rgbaMatch[1];
            const g = rgbaMatch[2];
            const b = rgbaMatch[3];
            return `rgba(${r},${g},${b},${alpha})`;
        } else {
            throw new Error('Unsupported color format');
        }
    }, []);

    return (
        <div className="Calendario">
            <Row wrap={false}>
                <Col className='columna'>
                    <Row className='esquina' style={{ width: '200px' }}>
                        <Row className='casilla esquina'>Día</Row>
                        <Row className='casilla esquina'>Hora</Row>
                    </Row>
                    {days.map((day, dayIndex) => (
                        <Row key={dayIndex}>
                            <Col className='casilla columna'>{day}</Col>
                            <Col className='hora'>
                                {hours.map((module, moduleIndex) => (
                                    <Row className='casilla columna' key={moduleIndex}>
                                        {module}
                                    </Row>
                                ))}
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Row wrap={false}>
                    {courses.map((course, courseIndex) => (
                        <Col key={courseIndex}>
                            <Row className='casilla encabezado'>{course}</Row>
                            {days.map((day, dayIndex) => (
                                <React.Fragment key={dayIndex}>
                                    {hours.map((hour, hourIndex) => {
                                        const key = `${dayIndex}-${hourIndex}-${courseIndex}`;
                                        const materias = obtenerMaterias(courseIndex, hourIndex);
                                        const selectedSubject = selectedItems[key];
                                        const subject = subjects.find(sub => sub.value === selectedSubject);
                                        
                                        const menu = (
                                            <Menu onClick={(e) => handleMenuClick(e, key)}>
                                                {subjects.map((subject) => (
                                                    <Menu.Item key={subject.value}>
                                                        {subject.label}
                                                    </Menu.Item>
                                                ))}
                                            </Menu>
                                        );

                                        return (
                                            <Dropdown overlay={menu} trigger={['click']} key={key}>
                                                <a className='espacio' style={{
                                                    color: subject ? subject.color : 'black',
                                                    backgroundColor: subject ? makeColorTransparent(subject.color, 0.1) : null,
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                        {subject ? subject.avatar : null}
                                                        {selectedSubject}
                                                    </div>
                                                </a>
                                            </Dropdown>
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

export default Calendario;
