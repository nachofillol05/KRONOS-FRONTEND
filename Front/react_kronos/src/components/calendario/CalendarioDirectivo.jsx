import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'antd';
import './Calendario.scss';
import Celda from '../celda/Celda';

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

export default function Calendario({ mibooleano }) {
    const [isEditable, setIsEditable] = useState(mibooleano);
    const [cellStates, setCellStates] = useState({});

    useEffect(() => {
        setIsEditable(mibooleano);
    }, [mibooleano]);

    const handleCellClick = useCallback((key) => {
        setCellStates((prevStates) => ({
            ...prevStates,
            [key]: !prevStates[key] // Toggle cell state
        }));
    }, []);

    const getCellKey = (dayIndex, hourIndex, courseIndex) => `${dayIndex}-${hourIndex}-${courseIndex}`;

    return (
        <div className="Calendario" >
            <Row wrap={false} style={{ marginInline: 'auto'}}>
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
                                        const key = getCellKey(dayIndex, hourIndex, courseIndex);
                                        return (
                                            <Celda
                                                key={key}
                                                day={day}
                                                hour={hour}
                                                course={course}
                                                isEditable={isEditable}
                                                onClick={() => handleCellClick(key)}
                                                isActive={cellStates[key]}
                                            />
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
