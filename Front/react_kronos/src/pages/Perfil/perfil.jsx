import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Select, Input, Row, Col, Space, FloatButton, Drawer, Alert, Tabs } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import './Perfil.scss';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [selectedCells, setSelectedCells] = useState([]);

    const ActualizarAvaibility = () => {
        console.log(selectedCells);
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
        } else {
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
        fetch('http://127.0.0.1:8000/api/profile/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 1,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setProfileData(data);
                form.setFieldsValue({
                    ...data,
                    city: data.contactInfo.city,
                    postalCode: data.contactInfo.postalCode,
                    province: data.contactInfo.province,
                    street: data.contactInfo.street,
                    streetNumber: data.contactInfo.streetNumber,
                });
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [form]);

    const tiposDoc = [
        { value: 'DNI', label: 'DNI' },
        { value: 'Pasaporte', label: 'Pasaporte' },
        { value: 'Cedula', label: 'Cedula' },
    ];

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleFinish = (values) => {
        const updatedProfile = {
            ...profileData,
            ...values,
            contactInfo: {
                ...profileData.contactInfo,
                city: values.city,
                postalCode: values.postalCode,
                province: values.province,
                street: values.street,
                streetNumber: values.streetNumber,
            }
        };

        fetch('http://127.0.0.1:8000/api/profile/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 1,
            },
            body: JSON.stringify(updatedProfile),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Profile updated successfully:', data);
                setProfileData(data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    const customDisabledStyle = {
        backgroundColor: 'transparent',
        color: 'black',
        border: 'none',
        cursor: 'default',
    };

    const showDrawer = (content, title) => {
        setDrawerTitle(title);
        setDrawerContent(content);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setDrawerContent(null);
    };

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const modules = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5'];
    console.log(selectedCells);

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={12}>
                <Card
                    title='Información Personal'
                    extra={
                        <Button type="primary" onClick={toggleEditMode}>
                            {isEditing ? 'Cancelar' : 'Editar'}
                        </Button>
                    }
                    style={{ height: '800px' }} // Establece una altura fija para la tarjeta
                >
                    <Tabs defaultActiveKey="1" centered>
                        <Tabs.TabPane tab="Datos personales" key="1">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleFinish}
                            >
                                <Space direction="vertical" size="large" align="center">
                                    <img src="https://via.placeholder.com/150" alt="Profile" className="profile-image" />
                                    <Space size="large">
                                        <Form.Item label="Nombre" name="first_name">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Apellido" name="last_name">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Email" name="email">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                    </Space>
                                    <Space size="large">
                                        <Form.Item label="Teléfono" name="phone">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                        <Space.Compact block>
                                            <Form.Item label="Tipo documento" name="documentType">
                                                {isEditing ? (
                                                    <Select options={tiposDoc} />
                                                ) : (
                                                    <Input
                                                        value={profileData.documentType}
                                                        disabled
                                                        style={customDisabledStyle}
                                                    />
                                                )}
                                            </Form.Item>
                                            <Form.Item label="Documento" name="document">
                                                <Input
                                                    type="number"
                                                    style={!isEditing ? customDisabledStyle : {}}
                                                    disabled={!isEditing}
                                                />
                                            </Form.Item>
                                        </Space.Compact>
                                    </Space>
                                    <Space size="large">
                                        <Form.Item label="Género" name="gender">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Nacionalidad" name="nationality">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Horas semanales" name="hoursToWork">
                                            <Input
                                                type="number"
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                    </Space>
                                </Space>
                                <Form.Item style={{ visibility: isEditing ? 'visible' : 'hidden' }}>
                                    <Button type="primary" htmlType="submit">
                                        Guardar
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Datos de contacto" key="2">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleFinish}
                                style={{ overflowY: 'auto', height: '100%' }}
                            >
                                <Space direction="vertical" size="large" align="center" style={{ height: '100%' }}>
                                    <h1>Datos de contacto</h1>
                                    <Space size="large">
                                        <Form.Item label="Código postal" name="postalCode">
                                            <Input
                                                type="number"
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Calle" name="street">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Número" name="streetNumber">
                                            <Input
                                                type="number"
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                    </Space>
                                    <Space size="large">
                                        <Form.Item label="Ciudad" name="city">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Provincia" name="province">
                                            <Input
                                                style={!isEditing ? customDisabledStyle : {}}
                                                disabled={!isEditing}
                                            />
                                        </Form.Item>
                                    </Space>
                                </Space>
                                <Form.Item style={{ visibility: isEditing ? 'visible' : 'hidden' }}>
                                    <Button type="primary" htmlType="submit">
                                        Guardar
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                    </Tabs>
                    <FloatButton
                        icon={<ClockCircleOutlined />}
                        tooltip="Cargar disponibilidad"
                        onClick={() => showDrawer(
                            <>
                                <h1>Cargue la disponibilidad</h1>
                                <Row>
                                    <Col span={3}></Col>
                                    {days.map((day) => (
                                        <Col span={3} key={day}>
                                            <div className="header-cell">{day}</div>
                                        </Col>
                                    ))}
                                </Row>
                                {modules.map((module) => (
                                    <Row key={module}>
                                        <Col span={3}>
                                            <div className="header-cell">{module}</div>
                                        </Col>
                                        {days.map((day) => (
                                            <Col span={3} key={`${day}-${module}`}>
                                                <Button
                                                    key={`${day}-${module}`}
                                                    onClick={(event) => handleCellClick(event, day, module)}
                                                    className={`grid-cell ${selectedCells.includes(`${day}-${module}`) ? 'selected' : ''}`}
                                                ></Button>
                                            </Col>
                                        ))}
                                    </Row>
                                ))}
                                <Button onClick={ActualizarAvaibility}>Actualizar</Button>
                                <Alert
                                    message="Atención!"
                                    description="Esta información es de carácter legal, asegúrese de que sea correcta, aunque podrá ser modificada en el momento que lo desee"
                                    type="warning"
                                />
                            </>, "Disponibilidad")}
                    />
                    <Drawer width={600} title={drawerTitle} onClose={onClose} open={open}>
                        <div style={{ width: '100%', height: '100%' }}>
                            {drawerContent}
                        </div>
                    </Drawer>
                </Card>
            </Col>
        </Row>
    );
};