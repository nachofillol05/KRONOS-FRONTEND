import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Select, Input, Image, Flex, Space, FloatButton, Drawer, Upload, Tabs, Row, Col, Alert } from 'antd';
import { ClockCircleOutlined, UploadOutlined } from '@ant-design/icons';
import './Perfil.scss';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [form] = Form.useForm();
  const [formSchool] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [escuelaCompleta, setEscuelaCompleta] = useState(null);


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
  /* CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR PARA QUE CARGUE LOS DATOS DE LA ESCUELA SOLO ESTA MOSTRANDO EL NAME Y LOGO
  useEffect(() => {
    const schools = JSON.parse(sessionStorage.getItem('schools') || '[]');
    const actualSchoolPk = parseInt(sessionStorage.getItem('actual_school'), 10);
    if (schools && actualSchoolPk) {
        const selectedSchool = schools.find(school => school.pk === actualSchoolPk);
        console.log('seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: ',selectedSchool);
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
}, []);*/

  const handleCellClick = (event, day, module) => {
    const key = `${day}-${module}`;
    const button = event.target;

    if (button.classList.contains('selected')) {
      button.classList.remove('selected');
      button.classList.add('NotSelected');
    } else {
      button.classList.remove('NotSelected');
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
  /*const handleFinishSchool = (values) => {
    const updatedSchoolProfile = {
      ...profileData,
      ...values,
      schoolInfo: {
        ...profileData.schoolInfo,
        name: values.name,
        abbreviation: values.abbreviation,
        email: values.email,
        province: values.province,
        city: values.city,
        street: values.street,
        streetNumber: values.streetNumber,
        postalCode: values.postalCode,
      },
    };

    fetch('http://127.0.0.1:8000/api/school/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
        'School-ID': sessionStorage.getItem('actual_school'),
      },
      body: JSON.stringify(updatedSchoolProfile),
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
  };*/

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
                            className={ selectedCells.includes(`${day}-${module}`) ? 'selected' : 'NotSelected' }
                            onClick={(event) => handleCellClick(event, day, module)}
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
    </>
  );
};
