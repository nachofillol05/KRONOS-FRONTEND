import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Select, Input, Row, Col, Space } from 'antd';
import './Perfil.scss';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [form] = Form.useForm();

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

  console.log("este", profileData);

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
            onFinish={handleFinish}
          >
            <Space direction="vertical" size="large" align="center">
            <h1>Datos personales</h1>
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
              <Form.Item style={{ visibility: isEditing ? 'visible' : 'hidden' }}>
                <Button type="primary" htmlType="submit">
                  Guardar
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
