import React, { useState } from 'react';
import { Button, Flex, Divider, Col, Row, Menu, Image } from 'antd';
import { RollbackOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

export default function EspecificWorker({ handleVolver, handleAgregar, handleContactar, user, showModal }) {
    const [selectedCells, setSelectedCells] = useState([]);

    const data = user.subjects.map(subject => `${subject.subject_name} - ${subject.school_name}`);

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const modules = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5'];

    const menu = (
        <Menu onClick={(e) => {
            handleAgregar(e);
        }}>
            <Menu.Item key="Profesor">Profesor</Menu.Item>
            <Menu.Item key="Preceptor">Preceptor</Menu.Item>
            <Menu.Item key="Directivo">Directivo</Menu.Item>
        </Menu>
    );
    console.log(user);
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
                        <p style={{ width: '50%' }}>Nombre: {user.first_name}</p><p style={{ width: '50%' }}>Apellido: {user.last_name}</p>
                    </Flex>
                    <p style={{ width: '100%' }}>Documento: {user.document}</p>
                    <p style={{ width: '100%' }}>Telefono: (falta el tipo de documento) {user.document}</p>
                    <p style={{ width: '100%' }}>Email: {user.email}</p>
                    <Flex gap={30} justify='space-between'>
                        <p style={{ width: '40%' }}>Genero: {user.gender}</p><p style={{ width: '60%' }}>Nacionalidad: </p>
                    </Flex>
                </Flex>
            </Flex>
            <br />
            <Flex vertical style={{ width: '100%' }} gap={30}>
                <Flex gap={30} justify='space-between'>
                    <p style={{ width: '50%' }}>Provincia:</p><p style={{ width: '50%' }}>Ciudad: </p>
                </Flex>
                <Flex gap={30} justify='space-between'>
                    <p style={{ width: '50%' }}>Calle:</p><p style={{ width: '50%' }}>Numero: </p><p style={{ width: '50%' }}>Codigo postal: </p>
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
