import React, { useState } from 'react';
import { Row, Col, Dropdown, Input, Menu, Avatar, Flex } from 'antd';
import {UserOutlined} from '@ant-design/icons';
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
    { value: 'MAT', label: 'Matemática', color: '#FFF', avatar:<Avatar style={{zIndex: -1}} size={'small'} icon={<UserOutlined />} /> },
    { value: 'LEN', label: 'Lengua', color: '#0000FF', avatar:<Avatar size={'small'} icon={<UserOutlined />} />  },
    { value: 'BIO', label: 'Biología', color: '#FFFF00', avatar:<Avatar size={'small'} icon={<UserOutlined />} />  },
    { value: 'QIM', label: 'Química', color: '#000000', avatar:<Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'MUS', label: 'Música', color: '#AA22CC', avatar:<Avatar size={'small'} icon={<UserOutlined />} /> },
    { value: 'FIS', label: 'Fisica', color: '#808080', avatar:<Avatar size={'small'} icon={<UserOutlined />} /> }
];

function Calendario() {
    const [searchText, setSearchText] = useState('');
    const [selectedItems, setSelectedItems] = useState({}); // Para almacenar el valor seleccionado por celda

    const filteredSubjects = subjects.filter(
        (subject) =>
            subject.label.toLowerCase().includes(searchText.toLowerCase()) ||
            subject.value.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleMenuClick = (e, dayIndex, hourIndex, courseIndex) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [`${dayIndex}-${hourIndex}-${courseIndex}`]: e.key // Usa la combinación de día, hora y curso como clave
        }));
    };

    function makeColorTransparent(color, alpha) {
        // Normalizar la opacidad
        alpha = Math.max(0, Math.min(1, alpha));

        // Función para convertir un color hex a RGBA
        function hexToRgba(hex) {
            let r = 0, g = 0, b = 0;

            // 3 digits
            if (hex.length === 4) {
                r = parseInt(hex[1] + hex[1], 16);
                g = parseInt(hex[2] + hex[2], 16);
                b = parseInt(hex[3] + hex[3], 16);
            }
            // 6 digits
            else if (hex.length === 7) {
                r = parseInt(hex[1] + hex[2], 16);
                g = parseInt(hex[3] + hex[4], 16);
                b = parseInt(hex[5] + hex[6], 16);
            }

            return `rgba(${r},${g},${b},${alpha})`;
        }

        // Verificar formato de color
        if (/^#[0-9A-Fa-f]{3,6}$/.test(color)) {
            // Formato hexadecimal
            return hexToRgba(color);
        } else if (/^rgba?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(,\s*\d?\d?\d?\d?)?\)$/.test(color)) {
            // Formato RGB o RGBA
            let rgbaMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d?\.?\d+))?\)$/);
            let r = rgbaMatch[1];
            let g = rgbaMatch[2];
            let b = rgbaMatch[3];
            return `rgba(${r},${g},${b},${alpha})`;
        } else {
            throw new Error('Unsupported color format');
        }
    }

    return (
        <div className="Calendario">
            <Row wrap={false} >
                <Col className='columna' >
                    <Row className='esquina' wrap={true} style={{ width: '200px' }}>
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
                                        const menu = (
                                            <Menu onClick={(e) => handleMenuClick(e, dayIndex, hourIndex, courseIndex)}>
                                                <Menu.Item key="search" disabled>
                                                    <Input
                                                        size='large'
                                                        placeholder="Buscar materia"
                                                        value={searchText}
                                                        onChange={(e) => setSearchText(e.target.value)}
                                                    />
                                                </Menu.Item>
                                                {filteredSubjects.map((subject) => (
                                                    <Menu.Item key={subject.value}>
                                                        {subject.label}
                                                    </Menu.Item>
                                                ))}
                                            </Menu>
                                        );

                                        return (
                                            <Dropdown overlay={menu} trigger={['click']} key={`${dayIndex}-${hourIndex}-${courseIndex}`}>
                                                <a className='espacio' style={{
                                                    color: selectedItems[`${dayIndex}-${hourIndex}-${courseIndex}`] ? subjects.find((subject) => subject.value === selectedItems[`${dayIndex}-${hourIndex}-${courseIndex}`]).color : 'black',
                                                        backgroundColor: selectedItems[`${dayIndex}-${hourIndex}-${courseIndex}`] ? makeColorTransparent(subjects.find((subject) => subject.value === selectedItems[`${dayIndex}-${hourIndex}-${courseIndex}`]).color, 0.1) : null,
                                                }}>
                                                <Flex align='center' gap={5}>
                                                {selectedItems[`${dayIndex}-${hourIndex}-${courseIndex}`] ? subjects.find((subject) => subject.value === selectedItems[`${dayIndex}-${hourIndex}-${courseIndex}`]).avatar : null}
                                                {selectedItems[`${dayIndex}-${hourIndex}-${courseIndex}`]}

                                                </Flex>

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
