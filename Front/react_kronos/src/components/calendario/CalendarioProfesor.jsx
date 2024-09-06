import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import './Calendario.scss';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export default function CalendarioProfesor({ mibooleano }) {
    const [modulesData, setModulesData] = useState([
        {
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
        }
    ]);


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


    return (
        <div className="Calendario CalendarioProfesor">
            {/* Header with days */}
            <Row style={{marginTop: '50px'}}>
                 {/* Empty corner for the hours */}
                {days.map((day) => {
                const moduleData = modulesData.filter(
                    (data) => data.day.toLowerCase() === day.toLowerCase()
                );
                return(
                    <Col style={{flexGrow:1}}>
                    <Row className='casilla encabezado casillaProfesor'>{day}</Row>
                    <React.Fragment key={day}>
                        {moduleData.map((module) => (
                                <Col className='casilla espacioProfesor' key={`${day}-${module.id}`}>
                                </Col>
                        ))}
                    </React.Fragment>
                    </Col>  
                );
            })}
            </Row>
        </div>
    );
}
