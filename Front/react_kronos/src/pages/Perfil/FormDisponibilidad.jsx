import React, { useState } from 'react';
import { Flex, Button, Tooltip, Space, Row, Col, Alert, Modal } from 'antd';
import { ScheduleOutlined, RollbackOutlined } from '@ant-design/icons';



export default function FormDisponibilidad({ onClose }) {
    const [selectedCells, setSelectedCells] = useState([]);


    const showModal = () => {
        Modal.confirm({
            title: 'Declaración de disponibilidad',
            content: (
                <p>Recuerda que esta información es de carácter <b>legal</b></p>
            ),
            closable: true,
            okText: 'Confirmar',
            onOk: () => onClose(),
            cancelText: 'Cancelar',
        });
    };

    const ActualizarAvaibility = () => {
        const jsonData = JSON.stringify({ module: selectedCells });
        fetch('http://localhost:8000/api/contacting-staff/', {
            method: 'PUT',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const handleCellClick = (event, day, module) => {
        const key = `${day}-${module}`;
        const button = event.target;

        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            button.classList.add('NotSelected');
        } else {
            button.classList.remove('NotSelected');
            button.classList.add('selected');
        }

        setSelectedCells((prevSelectedCells) => {
            if (prevSelectedCells.includes(key)) {
                return prevSelectedCells.filter((cell) => cell !== key);
            } else {
                return [...prevSelectedCells, key];
            }
        });
    };

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const modules = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5'];


    return (
        <>
            <Row style={{ height: '30px' }} align={"middle"}>
                <Col span={4}></Col>
                {days.map((day) => (
                    <Col style={{ textAlign: 'center' }} span={4} key={day}>
                        {day}
                    </Col>
                ))}
            </Row>
            {modules.map((module) => (
                <Row key={module}>
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} span={4}>
                        <div className="header-cell">{module}</div>
                    </Col>
                    {days.map((day) => (
                        <Col span={4} key={`${day}-${module}`}>
                            <Button
                                type="primary"
                                style={{ width: '100%' }}
                                key={`${day}-${module}`}
                                className={selectedCells.includes(`${day}-${module}`) ? 'selected' : 'NotSelected'}
                                onClick={(event) => handleCellClick(event, day, module)}
                            ></Button>
                        </Col>

                    ))}
                </Row>
            ))}
            <br />  <br />
            <Flex justify='end' gap={10} >
                <Tooltip title="Volver" >
                    <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={onClose} />
                </Tooltip>
                <Tooltip title="Declarar disponibilidad" >
                    <Button type='primary' size='large' iconPosition='end' icon={<ScheduleOutlined />} style={{ width: "100px" }} onClick={showModal}/>
                </Tooltip>
            </Flex>
            <Alert style={{ position: 'absolute', bottom: '50px', marginInline: '25px' }}
                message="Atención!"
                description="Esta información es de carácter legal, asegúrese de que sea correcta, aunque podrá ser modificada en el momento que lo desee"
                type="warning"
            />
        </>
    );
}
