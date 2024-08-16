import React, { useState, useEffect } from 'react';
import { Button, Flex, Divider, Col, Row, Menu, Image } from 'antd';
import { RollbackOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

export default function EspecificWorker({ handleVolverInfo, dni  }) {
    const [selectedCells, setSelectedCells] = useState([]);
    const [worker, setWorker] = useState({});

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const modules = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5'];
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teachers/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const filteredWorker = data.find(worker => worker.document === dni);
                if (filteredWorker) {
                    setWorker(filteredWorker);
                    console.log( filteredWorker);
                } else {
                    console.log('Worker not found');
                    setWorker(null); // O maneja el caso donde no se encuentra el trabajador
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [dni]);
    
    
    

    return (
        <>
            <Flex horizontal gap={30}>
                <Image
                    width={200}
                    height={200}
                    style={{ minWidth: 200, minHeight: 200 }}
                    src="https://via.placeholder.com/150"
                />
                <Flex style={{ width: '100%' }} vertical justify='space-around'>
                    <Flex gap={30} justify='space-between'>
                        <p style={{ width: '50%' }}>Nombre: {worker.first_name}</p><p style={{ width: '50%' }}>Apellido: {worker.last_name} </p>
                    </Flex>
                    <p style={{ width: '100%' }}>Documento: {worker?.documentType?.name},  {worker.document}</p>
                    <p style={{ width: '100%' }}>Telefono:  </p>
                    <p style={{ width: '100%' }}>Email: {worker.email}</p>
                    <Flex gap={30} justify='space-between'>
                        <p style={{ width: '40%' }}>Genero: {worker.gender}</p><p style={{ width: '60%' }}>Nacionalidad: {worker?.nationality?.name}</p>
                    </Flex>
                </Flex>
            </Flex>
            <br />
            <Flex vertical style={{ width: '100%' }} gap={30}>
                <Flex gap={30} justify='space-between'>
                    <p style={{ width: '50%' }}>Provincia: {worker?.contactInfo?.province}</p><p style={{ width: '50%' }}>Ciudad: {worker?.contactInfo?.city}</p>
                </Flex>
                <Flex gap={30} justify='space-between'>
                    <p style={{ width: '50%' }}>Calle: {worker?.contactInfo?.street}</p><p style={{ width: '50%' }}>Numero: {worker?.contactInfo?.streetNumber}</p><p style={{ width: '50%' }}>Codigo postal: {worker?.contactInfo?.postalCode}</p>
                </Flex>
            </Flex>
            <Divider />
            <Row style={{ height: '30px' }} align={"middle"}>
                <Col span={3}></Col>
                {days.map((day) => (
                    <Col style={{ textAlign: 'center' }} span={4} key={day}>
                        {day}
                    </Col>
                ))}
            </Row>
            {modules.map((module) => (
                <Row key={module}>
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} span={3}>
                        <div className="header-cell">{module}</div>
                    </Col>
                    {days.map((day) => (
                        <Col span={4} key={`${day}-${module}`}>
                            <Button
                                disabled
                                type="tertiary"
                                style={{ width: '100%' }}
                                key={`${day}-${module}`}
                                className={selectedCells.includes(`${day}-${module}`) ? 'selected desabilitados' : 'NotSelected desabilitados'}
                            ></Button>
                        </Col>

                    ))}
                </Row>
            ))}
        </>
    );
}
