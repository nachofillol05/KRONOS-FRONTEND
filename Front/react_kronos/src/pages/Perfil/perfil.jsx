import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Select, Input, Image, Flex, Space, FloatButton, Drawer, Upload, Tabs } from 'antd';
import { ClockCircleOutlined, UploadOutlined } from '@ant-design/icons';
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

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const modules = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5'];
  console.log(selectedCells);

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
                      onClick={toggleEditMode}
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
              onFinish={handleFinish}
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
                      onClick={toggleEditMode}
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
              onFinish={handleFinish}
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
                  {isEditing ?
                    <Upload maxCount={1} style={{ width: '150%' }}>
                      <Button
                        style={{ minWidth: 180 }}
                        icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> : null}
                </Flex>

                <Flex vertical gap={10} style={{ width: '100%' }}>
                  <Flex gap={50}>
                    <Form.Item style={{ width: '65%' }} label="Nombre" name="name" layout='horizontal'  className="formItemProfile">
                      <Input
                        size='large'
                        autoSize
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item style={{ width: '35%' }} label="Abreviación" name="abbreviation" layout='horizontal'  className="formItemProfile">
                      <Input
                        size='large'
                        autoSize
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                        
                        count={isEditing ? { show: true, max: 7 } : null}

                      />
                    </Form.Item>
                  </Flex>
                  <Form.Item label="Email" name="email" layout='horizontal' style={{ width: '100%' }} className="formItemProfile">
                    <Input
                      size='large'
                      autoSize
                      style={!isEditing ? customDisabledStyle : {}}
                      disabled={!isEditing}
                    />
                  </Form.Item>

                  <Flex gap={50}>
                    <Form.Item style={{ width: '50%' }} label="Provincia" name="province" layout='horizontal' className="formItemProfile">
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item style={{ width: '50%' }} label="Ciudad" name="city" layout='horizontal' className="formItemProfile">
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
      </Tabs >
    </>
  );
};
