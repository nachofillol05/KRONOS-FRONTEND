import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Select, Input, Flex, FloatButton, Drawer, Upload, Tabs, Space, Spin,Modal,message } from 'antd';
import { ClockCircleOutlined, UploadOutlined, EditOutlined, UpOutlined,DownOutlined } from '@ant-design/icons';
import './Perfil.scss';
import FormDisponibilidad from './FormDisponibilidad';

export default function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [form] = Form.useForm();
  const [formCambio]=Form.useForm();
  const [formSchool] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState(null);
  const [escuelaCompleta, setEscuelaCompleta] = useState(null);
  const [tiposDocumentos, setTipoDocumentos] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [file, setFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actualizar,setActualizar] = useState(false)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await formCambio.validateFields();
      fetch('http://127.0.0.1:8000/api/changePassword/', {
        method: "POST",
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token'),
          'School-ID': sessionStorage.getItem('actual_school'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: values.currentPassword,
          new_password: values.newPassword,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            message.error('Contraseña actual incorrecta');
            return
          }
          return response.json();
        })
        .then((data) => {
          if(data!=undefined){
            message.success('Contraseña cambiada con éxito!');
            formCambio.resetFields();
            console.log('Password changed successfully:', data);
            setIsModalVisible(false);
          }
        });
    } catch (error) {
      console.error('Error en el formulario', error);
    } finally {
      //setLoading(false);
    }
  };



  const handleFileChange = (e) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa ", URL.createObjectURL(e.file.originFileObj))
    setFile(e.file);
    setProfilePicture(URL.createObjectURL(e.file.originFileObj));
  };


  /*const generos ={

  }*/

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
        streetNumber: selectedSchool.contactInfo.streetNumber,
        logo: selectedSchool.logo,
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
        setProfilePicture(data.profile_picture);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [actualizar]);
  useEffect(() => {
    const data = profileData;
    form.setFieldsValue({
      ...data,
      gender: isEditing? data.gender :data.gender?.charAt(0).toUpperCase() + data.gender?.slice(1) || '',
      documentType: data.documentType?.name || '',
      document: data.document || '',
      phone: data.phone || '',
      nationality: isEditing ? data.nationality?.id || '' : data.nationality?.name || '',
      city: data.contactInfo?.city || '',
      postalCode: data.contactInfo?.postalCode || '',
      province: data.contactInfo?.province || '',
      street: data.contactInfo?.street || '',
      streetNumber: data.contactInfo?.streetNumber || '',
    });
  }, [isEditing,profileData]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/documentTypes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        const datos = data.map((tipo) => ({
          value: tipo.id,
          label: tipo.name,
        }));
        setTipoDocumentos(datos);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/nationality/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        const datos = data.map((tipo) => ({
          value: tipo.id,
          label: tipo.name,
        }));
        setNationalities(datos);
      });
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  const generos = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' },
  ];

  const handleFinishUser = async (values) => {
    console.log(values)
    const body = {
      document: values.document,
      documentType: profileData.documentType.id,
      email: values.email,
      first_name: values.first_name,
      gender: values.gender,
      last_name: values.last_name,
      nationality: values.nationality,
      phone: values.phone || "",
      contactInfo: {
        city: values.city,
        postalCode: values.postalCode,
        province: values.province,
        street: values.street,
        streetNumber: values.streetNumber,
      }
    };
    console.log('Form values:', body);
    try {
      const profileResponse = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token'),
          'School-ID': sessionStorage.getItem('actual_school'),
        },
        body: JSON.stringify(body),
      });

      if (!profileResponse.ok) {
        console.log( await profileResponse.json())
        throw new Error('NO se pudieron actualizar los campos');
      }
      const profileDataResponse = await profileResponse.json();
      setActualizar(!actualizar)
      console.log('Profile updated successfully:', profileDataResponse);

      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", file)

      if (values.profile_picture && file) {
        const formData = new FormData();
        formData.append('profile_picture', file.originFileObj); // Usar originFileObj

        const pictureResponse = await fetch('http://127.0.0.1:8000/api/profilePicture/', {
          method: 'PUT',
          headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'School-ID': sessionStorage.getItem('actual_school'),
          },
          body: formData, // Enviar el FormData con el archivo
        });

        if (!pictureResponse.ok) {
          throw new Error('Network response was not ok for profile picture');
        }

        const pictureDataResponse = await pictureResponse.json();
        console.log('Profile picture updated successfully:', pictureDataResponse);
        setProfilePicture(pictureDataResponse.profile_picture);
      }

      setProfileData(profileDataResponse);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
    console.log("aca se cierra, show drawer")
  };

  const onClose = () => {
    setOpen(false);
    setDrawerContent(null);
    setDrawerTitle(null)
    console.log("aca se cierra, onclose")
  };
  const handleCancel = () => {
    console.log("gandle cancel")
    setIsModalVisible(false);
    formCambio.resetFields();
  };

  // Validar que la nueva contraseña y la confirmación coincidan
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('newPassword') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Las contraseñas no coinciden!'));
    },
  });

  return (
    (isLoading ?
      <div className="spinner-container">
        <Spin size="large" />
      </div>
      :
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
                        style={{ width: '100px', marginInline: '10px' }}
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
                <Form.Item name="profile_picture">
                  <Flex align='center' justify='space-between' style={{ width: isEditing ? '100%' : '70%', height: '50px' }}>
                    <label >Foto de perfil:</label>
                    {isEditing ?
                      <Upload className='upload-profile' accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload> : null}
                    <div style={{ borderRadius: '50%', width: 50, height: 50 }}>
                      <img
                        src={profilePicture ? profilePicture : "https://via.placeholder.com/150"}
                        style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
                      />
                    </div>

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
                <Form.Item style={{ height: '40px' }} label="Documento" layout='horizontal' className='formItemProfile' >
                  <Space.Compact style={{ width: '100%' }}>
                    <Form.Item
                      name='documentType'
                      style={{ width: '125px' }}
                    >
                      
                        <Input
                          size='large'
                          style={customDisabledStyle}
                        />
                      
                    </Form.Item>
                    <Form.Item
                      name='document'
                      className='formItemProfile'
                      style={{ flexGrow: 1 }}
                    >
                      <Input
                        size='large'
                        style={customDisabledStyle}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>
                <Form.Item label="Email" name="email" layout='horizontal' style={{ width: '100%' }} className="formItemProfile">
                  <Input
                    size='large'
                    autoSize
                    style={customDisabledStyle}
                    disabled={true}
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
                  <Form.Item label="Horas semanales por colegio" name="hoursToWorkBySchool" layout='horizontal' style={{ flexGorw: 1 }} className="formItemProfile">
                    <Input
                      size='large'
                      type="number"
                      style={customDisabledStyle}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="Horas semanales en total" name="hoursToWork" layout='horizontal' style={{ flexGorw: 1 }} className="formItemProfile">
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
                    {isEditing ? (
                      <Select style={{ height: '40px' }} options={generos} size='large' />
                    ) : (
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : { height: '40px' }}
                        disabled={!isEditing}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Nacionalidad" name="nationality" layout='horizontal' style={{ flexGrow: 1 }} className="formItemProfile">
                    {isEditing ? (
                      <Select style={{ height: '40px' }} options={nationalities} size='large' />
                    ) : (
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : { height: '40px' }}
                        disabled={!isEditing}
                      />
                    )}
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
                <Flex gap={25}>
                  <Form.Item label="Provincia" name="province" layout='horizontal' style={{ flexGrow: 1 }} className="formItemProfile">
                    <Input
                      size='large'
                      style={!isEditing ? customDisabledStyle : { height: '40px' }}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                  <Form.Item label="Ciudad" name="city" layout='horizontal' style={{ flexGrow: 1 }} className="formItemProfile">
                    <Input
                      size='large'
                      style={!isEditing ? customDisabledStyle : { height: '40px' }}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Flex>
              </Form>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane style={{ width: 600 }} tab="Datos del colegio" key="2">
            <Card
              className='CardProfile'
              title='Información del Colegio'
            >
              <Form
                form={formSchool}
                layout="vertical"
                style={{ height: '60vh', overflowY: 'auto', padding: '25px' }}

              >
                <Form.Item name="name">
                  <Flex align='center' justify='space-between' style={{ width: '100%', height: '50px' }}>
                    <label >Logo del colegio:</label>
                    {isEditing ?
                      <Upload className='upload-profile' accept=".jpg,.jpeg,.png" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload> : null}
                    <img
                      width={50}
                      height={50}
                      src={escuelaCompleta || "https://via.placeholder.com/150"}
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
        <FloatButton.Group
                visibilityHeight={1500}
                trigger="click"
                type="primary"
                closeIcon={<DownOutlined />}
                icon={<UpOutlined />}
              >
        {sessionStorage.getItem('rol') === 'Profesor' ? (
            <FloatButton
              icon={<ClockCircleOutlined />}
              tooltip="Cargar disponibilidad"
              onClick={() => showDrawer(
                <FormDisponibilidad onClose={onClose}/>
                , "Disponibilidad")}
            />
        ) : null}
        <FloatButton
              icon={<EditOutlined />}
              tooltip="Cambiar contraseña"
              onClick={() => showModal()}
          />
        </FloatButton.Group>
        <Drawer width={600} title={drawerTitle} onClose={onClose} open={open}>
              <div style={{ width: '100%', height: '100%' }}>
                {drawerContent}
              </div>
            </Drawer>
        <Modal
          title="Cambiar Contraseña"
          visible={isModalVisible}
          onOk={handleOk}
          confirmLoading={isLoading}
          onCancel={handleCancel}
          okText="Cambiar"
          cancelText="Cancelar"
        >
          <Form form={formCambio} layout="vertical">
            <Form.Item
              name="currentPassword"
              label="Contraseña Actual"
              rules={[
                { required: true, message: 'Por favor ingrese su contraseña actual' },
              ]}
            >
              <Input.Password placeholder="Contraseña actual" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="Nueva Contraseña"
              rules={[
                { required: true, message: 'Por favor ingrese la nueva contraseña' },
                { min: 9, message: 'La contraseña debe tener al menos 9 caracteres' },
              ]}
            >
              <Input.Password placeholder="Nueva contraseña" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirmar Nueva Contraseña"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Por favor confirme su nueva contraseña' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirmar nueva contraseña" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  );
};
