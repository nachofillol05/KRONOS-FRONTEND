import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Select, Input, Image, Flex, Divider, FloatButton, Drawer, Upload, Tabs, Row, Col, Space } from 'antd';
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
        abreviacion: selectedSchool.abbreviation,
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
          document: data.document,
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
    height: '40px'
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
      <Tabs onChange={() => { setIsEditing(false) }} defaultActiveKey="1" style={{ width: 600, marginInline: 'auto', marginTop: '50px' }}>
        <Tabs.TabPane style={{ width: 600 }} tab="Datos personales" key="1">
          <Card
            className='CardProfile'
            title='Información Personal'
            extra={
              <>
                {isEditing ? (
                  <>
                    <Button
                      style={{ width: '100px', marginInline : '10px' }}
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
              style={{ height: '60vh', overflowY: 'auto', padding: '25px' }}
            >
              <Form.Item>
                <Flex align='center' justify='space-between'style={{ width: isEditing ? '100%' : '70%', height: '50px' }}>
                  <label >Foto de perfil:</label>
                  {isEditing ?
                    <Upload className='upload-profile' accept=".jpg,.jpeg,.png,.webp" maxCount={1}>
                      <Button
                        icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> : null}
                  <img
                    width={50}
                    height={50}
                    src="https://via.placeholder.com/150"
                    style={{ borderRadius: '50%' }}
                  />
                </Flex>
              </Form.Item>
              <Form.Item gap={25} style={{ width: '100%' }} layout='horizontal' label="Nombre" name="first_name" className="formItemProfile" >
                <Input
                  width={250}
                  size='large'
                  style={!isEditing ? customDisabledStyle : { flexGrow: 1, height: '40px' }}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Apellido" style={{ width: '100%' }} name="last_name" layout='horizontal' className="formItemProfile">
                <Input
                  size='large'
                  autoSize
                  style={!isEditing ? customDisabledStyle : { flexGrow: 1, height: '40px' }}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Form.Item style={{height: '40px'}} label="Documento" layout='horizontal' className='formItemProfile' >
                <Space.Compact style={{ width: '100%'}}>
                  <Form.Item
                    name='documentType'
                    style={{ width: '125px' }}
                  >
                    {isEditing ? (
                      <Select style={{ height: '40px' }} options={tiposDoc} size='large' />
                    ) : (
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : { height: '40px' }}
                        disabled={!isEditing}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    name='document'
                    className='formItemProfile'
                    style={{flexGrow: 1}}
                  >
                    <Input
                      size='large'
                      style={!isEditing ? customDisabledStyle : { height: '40px' }}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
              <Form.Item label="Email" name="email" layout='horizontal' style={{ width: '100%' }} className="formItemProfile">
                <Input
                  size='large'
                  autoSize
                  style={!isEditing ? customDisabledStyle : { height: '40px' }}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Teléfono" name="phone" layout='horizontal' style={{ width: '100%' }} className="formItemProfile">
                <Input
                  size='large'
                  autoSize
                  type='number'
                  style={!isEditing ? customDisabledStyle : { height: '40px' }}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Flex gap={25}>
                <Form.Item label="Horas semanales por colegio" name="hoursToWorkxSchool" layout='horizontal' style={{ flexGorw: 1 }} className="formItemProfile">
                  <Input
                    size='large'
                    type="number"
                    style={customDisabledStyle}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="Horas semanales en total" name="hoursToWorkTotaly" layout='horizontal' style={{ flexGorw: 1 }} className="formItemProfile">
                  <Input
                    size='large'
                    type="number"
                    style={customDisabledStyle}
                    disabled
                  />
                </Form.Item>
              </Flex>
              <Flex gap={25}>
                <Form.Item label="Género" name="gender" layout='horizontal' style={{ flexGrow: 1 }} className="formItemProfile">
                  <Input
                    size='large'
                    style={!isEditing ? customDisabledStyle : { height: '40px' }}
                    disabled={!isEditing}
                  />
                </Form.Item>
                <Form.Item label="Nacionalidad" name="nationality" layout='horizontal' style={{ flexGrow: 1 }} className="formItemProfile">
                  <Input
                    size='large'
                    style={!isEditing ? customDisabledStyle : { height: '40px' }}
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Flex>
              <Flex gap={25}>
                <Space.Compact style={{ width: '100%' }}>
                  <Form.Item style={{ flexGrow: 1 }} label="Calle" name="street" layout='horizontal' className="formItemProfile">
                    <Input
                      size='large'
                      style={!isEditing ? customDisabledStyle : {}}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                  <Form.Item style={{ width: 100 }} name="streetNumber" layout='horizontal' className="formItemProfile">
                    <Input
                      size='large'
                      type="number"
                      style={!isEditing ? customDisabledStyle : {}}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Space.Compact>
                <Form.Item label="Código postal" name="postalCode" layout='horizontal' className="formItemProfile">
                  <Input
                    size='large'
                    type="number"
                    style={!isEditing ? customDisabledStyle : {}}
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Flex>
            </Form>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane style={{ width: 600}} tab="Datos del colegio" key="2">
          <Card
            className='CardProfile'
            title='Información del Colegio'
          >
            <Form
              form={formSchool}
              layout="vertical"
              style={{ height: '60vh', overflowY: 'auto', padding: '25px' }}

            >
              <Form.Item>
                <Flex align='center' justify='space-between' style={{ width: '100%', height: '50px' }}>
                  <label >Logo del colegio:</label>
                  {isEditing ?
                    <Upload className='upload-profile' accept=".jpg,.jpeg,.png,.webp" maxCount={1}>
                      <Button
                        icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> : null}
                  <img
                    width={50}
                    height={50}
                    src="https://via.placeholder.com/150"
                    style={{ borderRadius: '50%' }}
                  />
                </Flex>
              </Form.Item>
              <Form.Item gap={25} style={{ width: '100%' }} layout='horizontal' label="Nombre" name="name" className="formItemProfile" >
                <Input
                  width={250}
                  size='large'
                  style={!isEditing ? customDisabledStyle : { flexGrow: 1, height: '40px' }}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Abreviacion" style={{ width: '100%' }} name="abreviacion" layout='horizontal' className="formItemProfile">
                <Input
                  size='large'
                  autoSize
                  style={!isEditing ? customDisabledStyle : { flexGrow: 1, height: '40px' }}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Email" name="email" layout='horizontal' style={{ width: '100%' }} className="formItemProfile">
                <Input
                  size='large'
                  autoSize
                  style={!isEditing ? customDisabledStyle : { height: '40px' }}
                  disabled={!isEditing}
                />
              </Form.Item>
        
              <Flex gap={25}>
                <Space.Compact style={{ width: '100%' }}>
                  <Form.Item style={{ flexGrow: 1 }} label="Calle" name="street" layout='horizontal' className="formItemProfile">
                    <Input
                      size='large'
                      style={!isEditing ? customDisabledStyle : {}}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                  <Form.Item style={{ width: 100 }} name="streetNumber" layout='horizontal' className="formItemProfile">
                    <Input
                      size='large'
                      type="number"
                      style={!isEditing ? customDisabledStyle : {}}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Space.Compact>
                <Form.Item label="Código postal" name="postalCode" layout='horizontal' className="formItemProfile">
                  <Input
                    size='large'
                    type="number"
                    style={!isEditing ? customDisabledStyle : {}}
                    disabled={!isEditing}
                  />
                </Form.Item>
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
              <FormDisponibilidad onClose={onClose} />
              , "Disponibilidad")}
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
