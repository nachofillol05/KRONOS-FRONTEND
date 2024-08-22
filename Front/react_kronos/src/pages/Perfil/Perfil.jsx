import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Select, Input, Image, Flex, Space, FloatButton, Drawer, Upload, Tabs, Row, Col, Alert } from 'antd';
import { ClockCircleOutlined, UploadOutlined } from '@ant-design/icons';
import './Perfil.scss';
import FormDisponibilidad from './FormDisponibilidad';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [form] = Form.useForm();
  const [formSchool] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState(null);
  const [escuelaCompleta, setEscuelaCompleta] = useState(null);




  useEffect(() => {
    const schools = JSON.parse(localStorage.getItem('schools') || '[]');
    const actualSchoolPk = parseInt(sessionStorage.getItem('actual_school'), 10);
    if (schools && actualSchoolPk) {
        const selectedSchool = schools.find(school => school.pk === actualSchoolPk);
        formSchool.setFieldsValue({
          ...selectedSchool,
          city: selectedSchool.contactInfo.city,
          postalCode: selectedSchool.contactInfo.postalCode,
          province: selectedSchool.contactInfo.province,
          street: selectedSchool.contactInfo.street,
          streetNumber: selectedSchool.contactInfo.streetNumber
        });
        setEscuelaCompleta(selectedSchool.logo);
    }
}, []);



  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/profile/', {
      method: "GET",
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token'),
        'School-ID': sessionStorage.getItem('actual_school'),
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
          documentType: data.documentType.name,
          phone: data.phone,
          hoursToWork: 12,//IMPPPPPPPPP ESTO DEBERA SER CAMBIADO POR UN CALCULO DE LAS HORAS OCUPADAS IMPPPPPPPPPPPPPPPPPPPPPPPPPPPP
          profile_picture: data.profile_picture,
          nationality: data.nationality.name,
          city: data.contactInfo.city,
          postalCode: data.contactInfo.postalCode,
          province: data.contactInfo.province,
          street: data.contactInfo.street,
          streetNumber: data.contactInfo.streetNumber,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const tiposDoc = [
    { value: 'DNI', label: 'DNI' },
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'Cedula', label: 'Cedula' },
  ];

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleFinishUser = (values) => {
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
        'School-ID': sessionStorage.getItem('actual_school'),
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
    borderColor: 'transparent',
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

  return (
    <>
      <Tabs onChange={() => {setIsEditing(false) }} defaultActiveKey="1" style={{ margin: '20px 100px' }}>
        <Tabs.TabPane tab="Datos personales" key="1">
          <Card
            title='Información Personal'
            extra={
              <>
                {isEditing ? (
                  <>
                    <Button
                      style={{ width: '100px', marginRight: '10px' }}
                      onClick={toggleEditMode}
                      danger
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="primary"
                      style={{ width: '100px' }}
                      onClick={() => form.submit()}
                    >
                      Guardar
                    </Button>
                  </>
                ) : (
                  <Button
                    style={{ width: '100px' }}
                    onClick={toggleEditMode}
                  >
                    Editar
                  </Button>
                )}
              </>
            }


          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinishUser}
              style={{ flexGrow: 1 }}
            >
              <Flex gap={25} align='start'>

                <Flex gap={25} vertical>
                  <Image
                    width={250}
                    height={250}
                    style={{ minWidth: 250, minHeight: 250 }}
                    src="https://via.placeholder.com/150"
                  />
                  {isEditing ?
                    <Upload maxCount={1} style={{ width: '100%' }}>
                      <Button
                        style={{ minWidth: 250 }}
                        icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> : null}

                </Flex>

                <Flex vertical>

                  <Flex gap={50} >
                    <Form.Item align='end' label="Nombre" name="first_name" layout='horizontal' style={{ width: '50%' }} className="formItemProfile" >
                      <Input
                        size='large'
                        autoSize
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item label="Apellido" name="last_name" layout='horizontal' style={{ width: '50%' }} className="formItemProfile">
                      <Input
                        size='large'
                        autoSize
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                  </Flex>
                  <Flex gap={50}>
                    <Form.Item label="Email" name="email" layout='horizontal' style={{ width: '50%' }} className="formItemProfile">
                      <Input
                        size='large'
                        autoSize
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item label="Teléfono" name="phone" layout='horizontal' style={{ width: '50%' }} className="formItemProfile">
                      <Input
                        size='large'
                        autoSize
                        type='number'
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                  </Flex>
                  <Flex gap={50}>
                    <Form.Item layout="horizontal" label="Tipo de documento" name="documentType" style={{ width: '50%' }} className="formItemProfile">
                      {isEditing ? (
                        <Select style={{ flexGrow: 1, height: '38px' }} options={tiposDoc} size='large' />
                      ) : (
                        <Input
                          size='large'
                          value={profileData.documentType}
                          disabled
                          style={{ height: '38px', ...customDisabledStyle, }}
                        />
                      )}
                    </Form.Item>
                    <Form.Item label='Documento' layout="horizontal" name="document" style={{ width: '50%' }} className="formItemProfile">
                      <Input
                        size='large'
                        autoSize
                        type="number"
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>

                  </Flex>
                  <Flex gap={25}>
                    <Form.Item label="Género" name="gender" layout='horizontal' style={{ width: '30%' }} className="formItemProfile">
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item label="Nacionalidad" name="nationality" layout='horizontal' style={{ width: '30%' }} className="formItemProfile">
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item label="Horas semanales" name="hoursToWork" layout='horizontal' style={{ width: '40%' }} className="formItemProfile">
                      <Input
                        size='large'
                        type="number"
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                  </Flex>
                  <Flex gap={50}>
                    <Form.Item label="Provincia" name="province" layout='horizontal' className="formItemProfile">
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item label="Ciudad" name="city" layout='horizontal' className="formItemProfile">
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>

                  </Flex>
                  <Flex gap={25}>

                    <Form.Item label="Calle" name="street" layout='horizontal' className="formItemProfile">
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item label="Número" name="streetNumber" layout='horizontal' className="formItemProfile">
                      <Input
                        size='large'
                        type="number"
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item label="Código postal" name="postalCode" layout='horizontal' className="formItemProfile">
                      <Input
                        size='large'
                        type="number"
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                  </Flex>
                </Flex>
              </Flex>
            </Form>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Datos del colegio" key="2">
  <Card
    title='Información del Colegio'
  >
    <Form
      form={formSchool}
      layout="vertical"
      style={{ flexGrow: 1 }}
    >
      <Flex gap={25} align='start' >
        <Flex gap={10} vertical>
          <Image
            width={180}
            height={180}
            style={{
              minWidth: 180,
              minHeight: 180,
            }}
            src="https://via.placeholder.com/150"
          />
        </Flex>

        <Flex vertical gap={10} style={{ width: '100%' }}>
          <Flex gap={50}>
            <Form.Item style={{ width: '65%' }} label="Nombre" name="name" layout='horizontal' className="formItemProfile">
              <Input
                size='large'
                autoSize
                style={customDisabledStyle}
                disabled
              />
            </Form.Item>
            <Form.Item style={{ width: '35%' }} label="Abreviación" name="abbreviation" layout='horizontal' className="formItemProfile">
              <Input
                size='large'
                autoSize
                style={customDisabledStyle}
                disabled
              />
            </Form.Item>
          </Flex>
          <Form.Item label="Email" name="email" layout='horizontal' style={{ width: '100%' }} className="formItemProfile">
            <Input
              size='large'
              autoSize
              style={customDisabledStyle}
              disabled
            />
          </Form.Item>

          <Flex gap={50}>
            <Form.Item style={{ width: '50%' }} label="Provincia" name="province" layout='horizontal' className="formItemProfile">
              <Input
                size='large'
                style={customDisabledStyle}
                disabled
              />
            </Form.Item>
            <Form.Item style={{ width: '50%' }} label="Ciudad" name="city" layout='horizontal' className="formItemProfile">
              <Input
                size='large'
                style={customDisabledStyle}
                disabled
              />
            </Form.Item>
          </Flex>
          <Flex gap={25}>
            <Form.Item label="Calle" name="street" layout='horizontal' className="formItemProfile">
              <Input
                size='large'
                style={customDisabledStyle}
                disabled
              />
            </Form.Item>
            <Form.Item label="Número" name="streetNumber" layout='horizontal' className="formItemProfile">
              <Input
                size='large'
                type="number"
                style={customDisabledStyle}
                disabled
              />
            </Form.Item>
            <Form.Item label="Código postal" name="postalCode" layout='horizontal' className="formItemProfile">
              <Input
                size='large'
                type="number"
                style={customDisabledStyle}
                disabled
              />
            </Form.Item>
          </Flex>
        </Flex>
      </Flex>
    </Form>
  </Card>
</Tabs.TabPane>

      </Tabs >
      {sessionStorage.getItem('rol') === 'Profesor' ? (
        <>
        <FloatButton
        icon={<ClockCircleOutlined />}
        tooltip="Cargar disponibilidad"
        onClick={() => showDrawer(
            <FormDisponibilidad onClose={onClose}/>
            ,"Disponibilidad")}
        />
        <Drawer width={600} title={drawerTitle} onClose={onClose} open={open}>
            <div style={{ width: '100%', height: '100%' }}>
                {drawerContent}
            </div>
        </Drawer>
        </>
      ) : null}
      
    </>
  );
};
