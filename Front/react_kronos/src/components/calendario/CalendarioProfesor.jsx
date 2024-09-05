import React from 'react';
import { Row, Col } from 'antd';
import './Calendario.scss';
import Celda from '../celda/Celda';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const hours = ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°', '10°', '11°'];

export default function CalendarioProfesor({ mibooleano }) {
    return (
        <div className="Calendario CalendarioProfesor" styles={{ width: '100% '}}>
            {/* Header with days */}
            <Row>
                <Col className='casilla encabezado'></Col> {/* Empty corner for the hours */}
                {days.map((day, index) => (
                    <Col className='casilla encabezado' key={index} span={4}>
                        <div className="calendario-day-header">{day}</div>
                    </Col>
                ))}
            </Row>

            {/* Rows for each hour */}
            {hours.map((hour, rowIndex) => (
                <Row key={rowIndex} className="calendario-row">
                    <Col className='casilla columna'>
                        <div className="calendario-hour-header">{hour}</div>
                    </Col>
                    {days.map((day, colIndex) => (
                        <Col className='espacioProfesor' key={colIndex} span={4}>
                            {/*div*/}
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
}
