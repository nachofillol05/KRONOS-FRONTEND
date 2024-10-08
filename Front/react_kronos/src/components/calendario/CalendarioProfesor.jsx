import React, { useState, useEffect } from 'react';
import { Row, Col, Tooltip, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Calendario.scss';

const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

export default function CalendarioProfesor({ subjects }) {

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
                        {subjects.filter((module) => module.day === day).map((module) => {
                            const subject = getSubjectForDayAndModule(day, module.moduleNumber);
                            const backgroundColor =  subject
                                ? makeColorTransparent(subject.subject_color, 0.1)
                                : 'white';
                            const textColor = subject ? subject.subject_color : '#000';
                            return (
                                <Col key={`${day}-${module}`} className="casilla casillaProfesor">
                                    <div
                                        className="espacioProfesor"
                                        style={{
                                            backgroundColor,
                                            color: textColor,
                                            borderRadius: '5px',
                                            flexGrow: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}
                                    >
                                        {subject ? (
                                            <Avatar size={'small'} icon={<UserOutlined />} />
                                        ) : (
                                            ''
                                        )}
                                        {subject ? (
                                            <>
                                                {subject.subject_abreviation} - {subject.course_name}
                                            </>
                                        ) : (
                                            ''
                                        )}
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