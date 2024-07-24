import React, { useState } from 'react';
import { Button, Card, Form, Select, Input, Row, Col, Flex } from 'antd';
import './Perfil.scss';

export default function Profile () {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    last_name: 'Fillol',
    gender: 'Masculino',
    documentType: 'DNI',
    document: '123456789',
    nationality: 'Argentino',
    contactInfo: 'Calle falsa 123',
    hoursToWork: 40,
    postalCode: '1234',
    street: 'Calle falsa',
    streetNumber: '123',
    city: 'Springfield',
    province: 'Springfield',
  });

  const tiposDoc = [
    { value: 'DNI', label: 'DNI' },
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'Cedula', label: 'Cedula' },
  ];

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleFinish = (values) => {
    setProfileData(values);
    setIsEditing(false);
  };

  const customDisabledStyle = {
    backgroundColor: 'transparent',
    color: 'black',
    border: 'none',
    cursor: 'default',
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={12}>
        <Card
          title='Informacion Personal'
          extra={
            
            <Button type="primary" onClick={toggleEditMode}>
              {isEditing ? 'Cancelar' : 'Editar'}
            </Button>
          }
        >
          
          <Form
            form={form}
            layout="vertical"
            initialValues={profileData}
            onFinish={handleFinish}
          >
            
            
            <Flex vertical gap='large' align='center'>
              <img src="https://via.placeholder.com/150" alt="Profile" className="profile-image" />
              <Flex gap='large'>
                <Form.Item label="Nombre" name="name">
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
                </Flex>
                <Flex gap='large'>
                <Form.Item label="Teléfono" name="phone">
                  <Input
                    style={!isEditing ? customDisabledStyle : {}}
                    disabled={!isEditing}
                  />
                </Form.Item>
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
                </Flex>
                <Flex gap='large'>
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
                </Flex>
                <h1>Informacion de contacto</h1>
                <Flex gap='large'>
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
                </Flex>
                <Flex gap='large'>
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
                </Flex>
                </Flex>
                
                <Form.Item style={{ visibility: isEditing ? 'visible' : 'hidden' }}>
                  <Button type="primary" htmlType="submit">
                    Guardar
                  </Button>
                </Form.Item>
                
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
