import React, { useState, useEffect } from 'react';
import { Row, Col, Tooltip } from 'antd';
import './Calendario.scss';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const materias = [
    // Lunes
    { day: 'Lunes', moduleNumber: 1, course_id: 1, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Juan' },
    { day: 'Lunes', moduleNumber: 2, course_id: 1, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Juan' },
    { day: 'Lunes', moduleNumber: 3, course_id: 1, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Juan' },
    { day: 'Lunes', moduleNumber: 4, course_id: 3, subject_name: 'Fisica', subject_abreviation: 'FIS', subject_color: '#808080', nombre: 'Monica' },
    { day: 'Lunes', moduleNumber: 5, course_id: 2, subject_name: 'Física', subject_abreviation: 'FIS', subject_color: '#808080', nombre: 'Ethel' },

    // Martes
    { day: 'Martes', moduleNumber: 2, course_id: 2, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Juan' },
    { day: 'Martes', moduleNumber: 3, course_id: 1, subject_name: 'Química', subject_abreviation: 'QIM', subject_color: '#00FF00', nombre: 'Monica' },
    { day: 'Martes', moduleNumber: 4, course_id: 1, subject_name: 'Química', subject_abreviation: 'QIM', subject_color: '#00FF00', nombre: 'Monica' },

    // Miércoles
    { day: 'Miércoles', moduleNumber: 1, course_id: 2, subject_name: 'Física', subject_abreviation: 'FIS', subject_color: '#808080', nombre: 'Ethel' },
    { day: 'Miércoles', moduleNumber: 2, course_id: 2, subject_name: 'Física', subject_abreviation: 'FIS', subject_color: '#808080', nombre: 'Ethel' },
    { day: 'Miércoles', moduleNumber: 3, course_id: 1, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Pedro' },
    { day: 'Miércoles', moduleNumber: 4, course_id: 1, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Juan' },

    // Jueves
    { day: 'Jueves', moduleNumber: 1, course_id: 2, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Juan' },
    { day: 'Jueves', moduleNumber: 2, course_id: 2, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Juan' },
    { day: 'Jueves', moduleNumber: 5, course_id: 1, subject_name: 'Química', subject_abreviation: 'QIM', subject_color: '#00FF00', nombre: 'Monica' },

    // Viernes
    { day: 'Viernes', moduleNumber: 2, course_id: 1, subject_name: 'Química', subject_abreviation: 'QIM', subject_color: '#00FF00', nombre: 'Monica' },
    { day: 'Viernes', moduleNumber: 4, course_id: 1, subject_name: 'Matemática', subject_abreviation: 'MAT', subject_color: '#FF0000', nombre: 'Juan' },
    { day: 'Viernes', moduleNumber: 5, course_id: 3, subject_name: 'Física', subject_abreviation: 'FIS', subject_color: '#808080', nombre: 'Ethel' }
];
export default function CalendarioProfesor() {
    const [modulesData, setModulesData] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem('rol') !== "Profesor") {
            window.location.reload();
        }
    }, []);

    const getSubjectForDayAndModule = (day, moduleNumber) => {
        return materias.find(
            (subject) => subject.day === day && subject.moduleNumber === moduleNumber
        );
    };

    const makeColorTransparent = (color, opacity) => {
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
            return `rgba(${r},${g},${b},${opacity})`;
        };
        return hexToRgba(color);
    };

    return (
        <div className="Calendario CalendarioProfesor">
            <Row style={{ marginTop: '50px' }}>
                {days.map((day) => (
                    <Col key={day} style={{ flexGrow: 1 }}>
                        <Row className="casilla encabezado casillaProfesor">{day}</Row>
                        {[1, 2, 3, 4, 5].map((moduleNumber) => {
                            const subject = getSubjectForDayAndModule(day, moduleNumber);
                            const backgroundColor = subject
                                ? makeColorTransparent(subject.subject_color, 0.1)
                                : 'white';
                            const textColor = subject ? subject.subject_color : '#000';
                            return (
                                <Col key={`${day}-${moduleNumber}`} className="casilla casillaProfesor">
                                        <div
                                            className="espacioProfesor"
                                            style={{
                                                backgroundColor,
                                                color: textColor,
                                                borderRadius: '5px',
                                                flexGrow: 1,
                                            }}
                                        >
                                            {subject ? subject.subject_abreviation : ''}
                                        </div>
                                </Col>
                            );
                        })}
                    </Col>
                ))}
            </Row>
        </div>
    );
}
