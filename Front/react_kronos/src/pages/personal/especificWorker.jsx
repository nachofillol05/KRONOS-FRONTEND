import React, { useState, useEffect } from 'react';
import { Button, Flex, Divider, Col, Row, Tooltip, Image } from 'antd';
import { RollbackOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';
import './personal.scss';

export default function EspecificWorker({ handleVolverInfo, dni, onClose }) {
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
                    console.log(filteredWorker);
                } else {
                    console.log('Worker not found');
                    setWorker(null); // O maneja el caso donde no se encuentra el trabajador
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [dni]);




    return (
        <>
            <Flex vertical gap={10}>
                <Flex align='center' gap={30} style={{ width: '70%', height: '50px' }}>
                    <label >Foto de perfil:</label>
                    <img
                        width={50}
                        height={50}
                        src="https://via.placeholder.com/150"
                        style={{ borderRadius: '50%' }}
                    />
                </Flex>
                <Flex gap={30}>
                <label>Nombre: {worker.first_name} {worker.last_name}</label>
                <label>Documento: {worker?.documentType?.name},  {worker.document}</label>
                </Flex>
                <Flex gap={30}>
                <label>Telefono:  {worker.email}</label>
                <label>Email: {worker.email}</label>
                </Flex>
                <Flex gap={30}>
                        <label >Genero: {worker.gender}</label><label >Nacionalidad: {worker?.nationality?.name}</label>
                </Flex>
                <Flex gap={30}>
                    <label >Provincia: {worker?.contactInfo?.province}</label><label >Ciudad: {worker?.contactInfo?.city}</label>
                </Flex>
                <Flex gap={30} >
                    <label >Calle: {worker?.contactInfo?.street}</label><label >Numero: {worker?.contactInfo?.streetNumber}</label><label >Codigo postal: {worker?.contactInfo?.postalCode}</label>
                </Flex>





            </Flex>
            <Divider orientation='left' >Disponiblidad horaria</Divider>
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
                                
                                key={`${day}-${module}`}
                                className={selectedCells.includes(`${day}-${module}`) ? 'selected desabilitados' : 'NotSelected desabilitados'}
                            ></Button>
                        </Col>

                    ))}
                </Row>
            ))}
            <br />
            <Flex justify='flex-end' gap={10}>
                <Tooltip label='volver'>
                    <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px", marginInline: "20px" }} onClick={onClose} />
                </Tooltip>
            </Flex>
            <br />
        </>
    );
}
