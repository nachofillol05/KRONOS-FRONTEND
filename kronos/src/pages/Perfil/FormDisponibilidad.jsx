import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Row, Col, Alert, Modal } from 'antd';
import { RollbackOutlined,ScheduleOutlined } from '@ant-design/icons';
import { theme } from 'antd';

export default function FormDisponibilidad({ onClose }) {
    const [selectedCells, setSelectedCells] = useState([]);
    const [modulesData, setModulesData] = useState([]);
    const [asignadoCells, setAsignadoCells] = useState([]);
    const [initialSelectedCells, setInitialSelectedCells] = useState([]); // Estado para celdas seleccionadas iniciales
    const [addedCells, setAddedCells] = useState([]);
    const [removedCells, setRemovedCells] = useState([]);
    const { token } = theme.useToken();
    const primaryColor = token.colorPrimary;

    const showModal = () => {
        Modal.confirm({
            title: 'Declaración de disponibilidad',
            content: (
                <p>Recuerda que esta información es de carácter <b>legal</b></p>
            ),
            closable: true,
            okText: 'Confirmar',
            onOk: () => confirmarCambios(),
            cancelText: 'Cancelar',
        });
    };

    const confirmarCambios = () => {
        const nuevasCeldas = selectedCells.filter((cell) => !initialSelectedCells.includes(cell));
        const celdasRemovidas = initialSelectedCells.filter((cell) => !selectedCells.includes(cell));
        
        setAddedCells(nuevasCeldas);
        setRemovedCells(celdasRemovidas);

        const jsonData = JSON.stringify({ teacher_availability: selectedCells });
        /*addedRoles.forEach(role => {
            const data = { "role":role, "user_id": user.id };
            
            if (role === "Preceptor") {
                // Agregar el ID del curso seleccionado para el rol de Preceptor
                data.year_id = selectedYear; // Asigna el ID del curso seleccionado
            }
    
            fetch("http://127.0.0.1:8000/api/addrole/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token " + localStorage.getItem("token"),
                    "School-ID": sessionStorage.getItem("actual_school"),
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) throw new Error(`Error asignando rol: ${role}`);
                return response.json();
            })
            .then(data => console.log(`Rol ${role} asignado exitosamente`, data))
            .catch(error => console.error("Error:", error));
        });*/
        //PASAR EL ESTADOOOOOOOOOOOOOOOOOOOO
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

    const actualizarAvailability = () => {
        
    };

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

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
                const preselectedCells = data
                    .filter((module) => module.availabilityState.name === 'Disponible')
                    .map((module) => module.module.id);
                const asignadoCells = data
                    .filter((module) => module.availabilityState.name === 'Asignado')
                    .map((module) => module.module.id);
                
                setSelectedCells(preselectedCells);
                setInitialSelectedCells(preselectedCells); // Guarda el estado inicial
                setAsignadoCells(asignadoCells);
            });
    }, []);

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

    const maxModulesCount = Math.max(
        ...days.map((day) =>
            modulesData.filter((data) => data.day.toLowerCase() === day.toLowerCase()).length
        )
    );
    const customDisabledStyle = {
        backgroundColor: '#e40d0fc5',
        color: 'white',
        border: '#e40d0fff 1px solid',
        borderRadius: '0',
        cursor: 'default',
        width:'100%'
    };

    return (
        <>
            <Row>
                {/* Columna para los números basados en la máxima cantidad de módulos */}
                <Col style={{ flexGrow: 1 }}>
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>Módulo</Row>
                    {Array.from({ length: maxModulesCount }, (_, i) => (
                        <Col key={i} style={{ width: '100%', paddingInline: 3 }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 32,
                                }}
                            >
                                {i + 1} {/* Muestra números del 1 al máximo de módulos */}
                            </div>
                        </Col>
                    ))}
                </Col>

                {/* Renderización de los días con sus módulos */}
                {days.map((day) => {
                    const moduleData = modulesData.filter(
                        (data) => data.day.toLowerCase() === day.toLowerCase()
                    );

                    return (
                        <Col key={day} style={{ flexGrow: 1 }}>
                            <Row style={{ display: 'flex', justifyContent: 'center' }}>{day}</Row>
                            {moduleData.map((module) => (
                                <Col key={`${day}-${module.id}`} style={{ width: '100%', paddingInline: 3 }}>
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
                                    >
                                        {/*{module.moduleNumber}Ver si dejamos oooooo no capaz poner las horas al costado nose*/}
                                    </Button>
                                </Col>
                            ))}
                        </Col>
                    );
                })}
            </Row>

            <br/><br />
            <Alert
                style={{ position: 'absolute', bottom: '50px', marginInline: '25px' }}
                message="Atención!"
                description="Esta información es de carácter legal, asegúrese de que sea correcta, aunque podrá ser modificada en el momento que lo desee"
                type="info"
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