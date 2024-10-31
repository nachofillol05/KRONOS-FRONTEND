import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Row, Col, Alert, Modal, Flex } from 'antd';
import { ScheduleOutlined, RollbackOutlined } from '@ant-design/icons';

export default function FormDisponibilidad({ onClose }) {
    const [selectedCells, setSelectedCells] = useState([]);
    const [modulesData, setModulesData] = useState([]);
    const [asignadoCells, setAsignadoCells] = useState([]);

    const showModal = () => {
        Modal.confirm({
            title: 'Declaración de disponibilidad',
            content: (
                <p>Recuerda que esta información es de carácter <b>legal</b></p>
            ),
            closable: true,
            okText: 'Confirmar',
            onOk: () => actualizarAvailability(),
            cancelText: 'Cancelar',
        });
    };
    
    

    const actualizarAvailability = () => {
        const jsonData = JSON.stringify({ module: selectedCells });
        fetch('http://localhost:8000/api/teacheravailability/', {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
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
    useEffect(() => {
        fetch('http://localhost:8000/api/teacheravailability/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const preselectedCells = data.filter(
                (module) => module.availabilityState.name === 'Disponible'
            ).map((module) => module.module.id);
            const asignadoCells = data.filter(
                (module) => module.availabilityState.name === 'Asignado'
            ).map((module) => module.module.id);
            setSelectedCells(preselectedCells); 
            setAsignadoCells(asignadoCells);
        });
    }, []);

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    const customDisabledStyle = {
        backgroundColor: '#e40d0fc5',
        color: 'white',
        border: '#e40d0fff 1px solid',
        borderRadius: '0',
        cursor: 'default',
        width:'100%'
    };

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
                                        disabled={asignadoCells.includes(module.id)}
                                        type="primary"
                                        style={asignadoCells.includes(module.id)? customDisabledStyle : { width: '100%' }}
                                        className={
                                            selectedCells.includes(module.id)
                                                ? 'selected'
                                                : asignadoCells.includes(module.id)?
                                                'Ocupied'
                                                :'NotSelected'
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
