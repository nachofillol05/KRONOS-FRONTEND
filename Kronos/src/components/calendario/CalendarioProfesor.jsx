import React, { useState, useEffect } from 'react';
import { Row, Col, Tooltip, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Calendario.scss';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export default function CalendarioProfesor({ subjects }) {
    const [modulesData, setModulesData] = useState([]);
    const [maxDay, setMaxDay] = useState(null);

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
        if (sessionStorage.getItem('rol') !== "Profesor") {
            window.location.reload();
        }
    }, []);

    const getSubjectForDayAndModule = (day, moduleNumber) => {
        return subjects.find(
            (subject) => subject.day.toLowerCase() === day.toLowerCase() && subject.moduleNumber === moduleNumber
        );
    };

    useEffect(() => {
        if (modulesData.length > 0) {
            const dayCounts = modulesData.reduce((acc, module) => {
                acc[module.day] = (acc[module.day] || 0) + 1;
                return acc;
            }, {});

            const aux = Object.keys(dayCounts).reduce((max, day) =>
                dayCounts[day] > dayCounts[max] ? day : max
            );

            setMaxDay(aux);
        }
    }, [modulesData]); // Dependencia en modulesData

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

    const uniqueModules = Array.from(
        new Map(
            modulesData.map((module) => [`${module.startTime}-${module.endTime}`, module])
        ).values()
    );



    console.log("modulesData:", modulesData);

    return (
        <div className="Calendario" style={{ margin: 'auto' }}>
            <div className="Calendario CalendarioProfesor">
                <Row style={{ marginTop: '50px' }} wrap={false}>
                    {/* Columna de Módulos */}
                    <Col style={{ flexGrow: 1 }}>
                        <Row className="casilla esquina casillaProfesor" style={{ display: 'flex', justifyContent: 'center' }}>
                            Módulo
                        </Row>
                        {uniqueModules.map((module, i) => (
                            <Col key={i} style={{ width: '100%' }}>
                                <div
                                    className="espacioProfesor columna"
                                    style={{
                                        backgroundColor: 'white',
                                    }}
                                >
                                    {module.startTime} - {module.endTime}
                                </div>
                            </Col>
                        ))}
                    </Col>


                    {/* Columnas de Días */}
                    {days.map((day) => {
                        const daySubjects = subjects.filter(
                            (subject) => subject.day.toLowerCase() === day.toLowerCase()
                        );

                        // Crear un array con espacios vacíos y rellenar con materias existentes
                        const slots = Array.from({ length: uniqueModules.length }, (_, i) => {
                            const moduleNumber = i + 1; // Asume que los módulos están numerados desde 1
                            return (
                                daySubjects.find((subject) => subject.moduleNumber === moduleNumber) || {
                                    isEmpty: true, // Marcar celdas vacías
                                }
                            );
                        });

                        return (
                            <Col key={day} style={{ flexGrow: 1 }}>
                                <Row className="casilla encabezado casillaProfesor">{day}</Row>
                                {slots.map((slot, i) => (
                                    <Col key={`${day}-${i}`} className="casilla casillaProfesor">
                                        <div
                                            className="espacioProfesor"
                                            style={{
                                                backgroundColor: slot.isEmpty
                                                    ? ' '
                                                    : makeColorTransparent(slot.subject_color, 0.1),
                                                color: slot.isEmpty ? 'white' : slot.subject_color,
                                                borderRadius: '5px',
                                                flexGrow: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: slot.isEmpty ? '0' : '10px',
                                                height: 37,
                                            }}
                                        >
                                            {slot.isEmpty ? (
                                                ' ' // Espacio vacío
                                            ) : (
                                                <>
                                                    {slot.subject_abreviation}  {slot.course_name}
                                                </>
                                            )}
                                        </div>
                                    </Col>
                                ))}
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );

}
