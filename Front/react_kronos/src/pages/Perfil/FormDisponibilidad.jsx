import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Row, Col, Alert, Modal, Flex } from 'antd';
import { ScheduleOutlined, RollbackOutlined } from '@ant-design/icons';

export default function FormDisponibilidad({ onClose }) {
    const [selectedCells, setSelectedCells] = useState([]);
    const [modulesData, setModulesData] = useState([]);

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

    const actualizarAvailability = () => {
        const jsonData = JSON.stringify({ module: selectedCells });
        fetch('http://localhost:8000/api/contacting-staff/', {
            method: 'PUT',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const handleCellClick = (event, module) => {
        const key = module;
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
            console.log(Object.values(data));
        });
    }, []);

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    console.log(selectedCells);

    return (
        <>
        <Row>
            {days.map((day) => {
                const moduleData = modulesData.filter(
                    (data) => data.day.toLowerCase() === day.toLowerCase()
                );
                return(
                    <Col style={{flexGrow:1}}>
                    <Row style={{display:'flex', justifyContent:'center'}}>{day}</Row>
                    <React.Fragment key={day}>
                        {moduleData.map((module) => (
                                <Col style={{ width: '100%', paddingInline:3 }} key={`${day}-${module.id}`}>
                                    <Button
                                        type="primary"
                                        style={{ width: '100%' }}
                                        className={
                                            selectedCells.includes(`${module.id}`)
                                                ? 'selected'
                                                : 'NotSelected'
                                        }
                                        onClick={(event) => handleCellClick(event, module.id)}
                                    >{module.moduleNumber}</Button>
                                </Col>
                                     
                        ))}
                    </React.Fragment>
                    </Col>  
                );
            })}
        </Row>
            <br /><br />
            <Alert
                style={{ position: 'absolute', bottom: '50px', marginInline: '25px' }}
                message="Atención!"
                description="Esta información es de carácter legal, asegúrese de que sea correcta, aunque podrá ser modificada en el momento que lo desee"
                type="warning"
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Tooltip title="Volver">
                    <Button
                        size="large"
                        icon={<RollbackOutlined />}
                        style={{ width: '100px' }}
                        onClick={onClose}
                    />
                </Tooltip>
                <Tooltip title="Declarar disponibilidad">
                    <Button
                        type="primary"
                        size="large"
                        icon={<ScheduleOutlined />}
                        style={{ width: '100px' }}
                        onClick={showModal}
                    />
                </Tooltip>
                
            </div>
            
        </>
    );
}
