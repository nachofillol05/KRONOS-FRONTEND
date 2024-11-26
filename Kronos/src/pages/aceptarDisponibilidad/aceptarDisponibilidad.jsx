import React, { useEffect, useState } from "react";
import { Row, Col, Alert, List, Button, Select } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Option } = Select;

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const materias = [
    'Matemáticas 1A',
    'Física 2A',
];

export default function AceptarDisponibilidad() {
    const [modulesData, setModulesData] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [selectedCells, setSelectedCells] = useState([80, 85, 86, 81]);

    useEffect(() => {
        // Fetch de módulos
        fetch('https://kronos-backend.onrender.com/api/modules/', {
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

        // Fetch de profesores
        fetch('https://kronos-backend.onrender.com/api/professors/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setProfessors(data);
        });
    }, []);

    const handleAcceptChange = () => {
        console.log("Cambios aceptados:", selectedCells);
        console.log("Profesor seleccionado:", selectedProfessor);
        // Aquí puedes manejar la lógica de enviar los datos seleccionados
    };

    const handleProfessorChange = (value) => {
        setSelectedProfessor(value);
    };

    return (
        <>
            <div>
                <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    Petición de:
                </h1>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Selecciona un profesor"
                        onChange={handleProfessorChange}
                    >
                        {professors.map((professor) => (
                            <Option key={professor.id} value={professor.id}>
                                {professor.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* Contenedor para centrar los bloques */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: '45%' }}>
                    <h3 style={{ textAlign: 'center' }}>Anterior</h3>
                    <Row>
                        {days.map((day) => {
                            const moduleData = modulesData.filter(
                                (data) => data.day.toLowerCase() === day.toLowerCase()
                            );
                            return (
                                <Col style={{ flexGrow: 1 }} key={day}>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>{day}</Row>
                                    <React.Fragment key={day}>
                                        {moduleData.map((module) => (
                                            <Col
                                                style={{ width: '100%', paddingInline: 3 }}
                                                key={`${day}-${module.id}`}
                                            >
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px',
                                                        borderRadius: '4px',
                                                        backgroundColor: selectedCells.includes(module.id)
                                                            ? '#1890ff'
                                                            : '#f0f0f0',
                                                        color: selectedCells.includes(module.id)
                                                            ? '#fff'
                                                            : '#000',
                                                        textAlign: 'center',
                                                        pointerEvents: 'none', // Evita que sea clickeable
                                                        border: '1px solid #d9d9d9'
                                                    }}
                                                >
                                                    {module.moduleNumber}
                                                </div>
                                            </Col>
                                        ))}
                                    </React.Fragment>
                                </Col>
                            );
                        })}
                    </Row>
                </div>

                {/* Flecha centrada verticalmente */}
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        verticalAlign: 'middle',
                        padding: '0 20px',
                    }}
                >
                    <ArrowRightOutlined />
                </div>

                <div style={{ display: 'inline-block', verticalAlign: 'top', width: '45%' }}>
                    <h3 style={{ textAlign: 'center' }}>Nuevo</h3>
                    <Row>
                        {days.map((day) => {
                            const moduleData = modulesData.filter(
                                (data) => data.day.toLowerCase() === day.toLowerCase()
                            );
                            return (
                                <Col style={{ flexGrow: 1 }} key={day}>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>{day}</Row>
                                    <React.Fragment key={day}>
                                        {moduleData.map((module) => (
                                            <Col
                                                style={{ width: '100%', paddingInline: 3 }}
                                                key={`${day}-${module.id}`}
                                            >
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px',
                                                        borderRadius: '4px',
                                                        backgroundColor: selectedCells.includes(module.id)
                                                            ? '#1890ff'
                                                            : '#f0f0f0',
                                                        color: selectedCells.includes(module.id)
                                                            ? '#fff'
                                                            : '#000',
                                                        textAlign: 'center',
                                                        pointerEvents: 'none',
                                                        border: '1px solid #d9d9d9'
                                                    }}
                                                >
                                                    {module.moduleNumber}
                                                </div>
                                            </Col>
                                        ))}
                                    </React.Fragment>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>

            {/* Ajuste del ancho del Alert */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Alert
                    style={{ width: '50%', margin: 'auto' }}
                    message="¡Atención!"
                    description={
                        <>
                            <p>Las siguientes materias se saldrán:</p>
                            <List
                                size="small"
                                bordered
                                dataSource={materias}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />
                        </>
                    }
                    type="error"
                />
            </div>

            {/* Botón de "Aceptar cambio" */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button
                    type="primary"
                    onClick={handleAcceptChange}
                    disabled={!selectedProfessor} // Deshabilitar si no hay profesor seleccionado
                >
                    Aceptar cambio
                </Button>
            </div>
        </>
    );
}
