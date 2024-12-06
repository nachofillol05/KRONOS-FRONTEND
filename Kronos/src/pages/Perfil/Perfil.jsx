import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Select, Input, Flex, FloatButton, Drawer, Upload, Tabs, Space, Spin, Modal, message } from 'antd';
import { ClockCircleOutlined, UploadOutlined, EditOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import './Perfil.scss';
import FormDisponibilidad from './FormDisponibilidad';

export default function Profile() {

  const [isErrorShown, setIsErrorShown] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [form] = Form.useForm();
  const [formCambio] = Form.useForm();
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
  const [actualizar, setActualizar] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState(null);
  const [fileChanged, setFileChanged] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    console.log(open, "  open")
    console.log(isModalVisible, "   ismodalvisible")
    console.log(drawerContent, "    drawer content")
    console.log(drawerTitle, "    drawerTitle")
  }, [open, isModalVisible, drawerContent, drawerTitle])

  const handleOk = async () => {
    try {
      const values = await formCambio.validateFields();
      fetch(process.env.REACT_APP_API_URL + '/api/changePassword/', {
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
          if (data != undefined) {
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

    
    const file = e.file.originFileObj;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
    if (file) {
      // Verificar si el tipo de archivo es permitido
      if (!allowedTypes.includes(file.type)) {
        if (!isErrorShown) {
          message.error("Solo se permiten archivos JPG, JPEG, PNG o WEBP.");
          setIsErrorShown(true); // Marcar que se mostró el mensaje de error
        }
      } else {
        setFile(e.file);
        console.log(profilePicture);
        setProfilePicture(URL.createObjectURL(file));
        setFileChanged(true);
        console.log(URL.createObjectURL(file))
        setIsErrorShown(false); 
      }
    }
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
    fetch(process.env.REACT_APP_API_URL + '/api/profile/', {
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
    setTipoDocumento(data.documentType?.name || 'Documento')
    form.setFieldsValue({
      ...data,
      gender: isEditing ? data.gender : data.gender?.charAt(0).toUpperCase() + data.gender?.slice(1) || '',
      documentType: data.documentType?.name || '',
      document: data.document || '',
      phone: data.phone || '',
      nationality: isEditing ? data.nationality?.id || '' : data.nationality?.name || '',
      city: data.contactInfo?.city || '',
      postalCode: data.contactInfo?.postalCode || '',
      province: data.contactInfo?.province || '',
      street: data.contactInfo?.street || '',
      streetNumber: data.contactInfo?.streetNumber || '',
      //Porner aca ek profile oicuuuuuuuuuuuuuuuuuureeeeeee
      //profilePicture: isEditing?
    });
  }, [isEditing, profileData]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/documentTypes/', {
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
    fetch(process.env.REACT_APP_API_URL + '/api/nationality/', {
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
  const CancelarEdit = () => {
    //setProfilePicture(profileData.profile_picture); acaaaa
    //setProfilePicture(null)
    setFileChanged(false);
    setActualizar(!actualizar)
    setIsEditing(false);
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
      const profileResponse = await fetch(process.env.REACT_APP_API_URL + '/api/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token'),
          'School-ID': sessionStorage.getItem('actual_school'),
        },
        body: JSON.stringify(body),
      });

      if (!profileResponse.ok) {
        console.log(await profileResponse.json())
        throw new Error('NO se pudieron actualizar los campos');
      }
      const profileDataResponse = await profileResponse.json();
      setActualizar(!actualizar)
      console.log('Profile updated successfully:', profileDataResponse);

      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", file)

      if (values.profile_picture && file&&fileChanged) {
        const formData = new FormData();
        formData.append('profile_picture', file.originFileObj); // Usar originFileObj

        const pictureResponse = await fetch(process.env.REACT_APP_API_URL + '/api/profilePicture/', {
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
        <Tabs onChange={() => { setIsEditing(false) }} defaultActiveKey="1" style={{ marginInline: 'auto', marginTop: '50px' }}>
          <Tabs.TabPane tab="Datos personales" key="1">
            <Card
              className='CardProfile'
              title='Información Personal'
              extra={
                <>
                  {isEditing ? (
                    <>
                      <Button
                        style={{ width: '100px', marginInline: '10px' }}
                        onClick={CancelarEdit}
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
                    requiredMark={false}
                form={form}
                onFinish={handleFinishUser}
                style={{ height: '60vh', overflowY: 'auto', padding: '25px' }}
              >
                <Flex>
                  <Form.Item name="profile_picture">
                    <Flex vertical align='center' justify='space-between' style={{ height: "100%" }} gap={30}>
                      <label >Foto de perfil:</label>

                      <div style={{ borderRadius: '50%', width: 200, height: 200 }}>
                        <img
                          src={profilePicture ? profilePicture : "https://via.placeholder.com/150"}
                          style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                      </div>
                      {isEditing ?
                        <Upload className='upload-profile' accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} maxCount={1}>
                          <Button icon={<UploadOutlined />}>Subir imagen</Button>
                        </Upload>
                        : null}
                    </Flex>
                  </Form.Item>



                  <div
  style={{
    marginLeft: 50,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 30,
  }}
>
  <Form.Item
    style={{ width: '275px' }}
    layout="vertical"
    label="Nombre"
    name="first_name"
    className="formItemProfile"
    rules={[
      {
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/g,        message: 'Sólo se permiten letras.',
      },
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    <Input
      size="large"
      style={!isEditing ? customDisabledStyle : { height: '40px' }}
      disabled={!isEditing}
    />
  </Form.Item>

  <Form.Item
    style={{ width: '275px' }}
    label="Apellido"
    name="last_name"
    layout="vertical"
    className="formItemProfile"
    rules={[
      {
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/g,        message: 'Sólo se permiten letras.',
      },
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    <Input
      size="large"
      style={!isEditing ? customDisabledStyle : { height: '40px' }}
      disabled={!isEditing}
    />
  </Form.Item>

  <Form.Item
    style={{ width: '275px' }}
    label="Teléfono"
    name="phone"
    layout="vertical"
    className="formItemProfile"
    rules={[
      {
        pattern: /^[0-9]+$/g,
        message: 'Solo se permiten números.',
      },
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    <Input
      size="large"
      type="number"
      style={!isEditing ? customDisabledStyle : { height: '40px' }}
      disabled={!isEditing}
    />
  </Form.Item>
  <Form.Item
                        layout='vertical'
                        label={tipoDocumento}
                        style={{ width: '275xp' }}
                        name='document'
                        className='formItemProfile'
                      >

                        <Input
                          size='large'
                          style={{ ...customDisabledStyle,}}
                          disabled={true}
                        />
                      </Form.Item>
  <Form.Item
    style={{ width: '275px' }}
    label="Email"
    name="email"
    layout="vertical"
    className="formItemProfile"
    rules={[
      {
        type: 'email',
        message: 'Ingrese un correo electrónico válido.',
      },
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    <Input
      size="large"
      style={{ ...customDisabledStyle }}
      disabled
    />
  </Form.Item>

  <Form.Item
    style={{ width: '275px' }}
    label="Género"
    name="gender"
    layout="vertical"
    className="formItemProfile"
    rules={[
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    {isEditing ? (
      <Select style={{ height: '40px' }} options={generos} size="large" />
    ) : (
      <Input
        size="large"
        style={!isEditing ? customDisabledStyle : { height: '40px' }}
        disabled={!isEditing}
      />
    )}
  </Form.Item>

  <Form.Item
    style={{ width: '275px' }}
    label="Nacionalidad"
    name="nationality"
    layout="vertical"
    className="formItemProfile"
    rules={[
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    {isEditing ? (
      <Select style={{ height: '40px' }} options={nationalities} size="large" />
    ) : (
      <Input
        size="large"
        style={!isEditing ? customDisabledStyle : { height: '40px' }}
        disabled={!isEditing}
      />
    )}
  </Form.Item>

  <Form.Item
    style={{ width: '275px' }}
    label="Provincia"
    name="province"
    layout="vertical"
    className="formItemProfile"
    rules={[
      {
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/g,        message: 'Sólo se permiten letras.',
      },
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    <Input
      size="large"
      style={!isEditing ? customDisabledStyle : { height: '40px' }}
      disabled={!isEditing}
    />
  </Form.Item>

  <Form.Item
    style={{ width: '275px' }}
    label="Ciudad"
    name="city"
    layout="vertical"
    className="formItemProfile"
    rules={[
      {
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/g,        message: 'Sólo se permiten letras.',
      },
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    <Input
      size="large"
      style={!isEditing ? customDisabledStyle : { height: '40px' }}
      disabled={!isEditing}
    />
  </Form.Item>
  <Space.Compact>
                      <Form.Item
                        style={{ width: '275xp' }}
                        label="Calle"
                        name="street"
                        layout='vertical'
                        className="formItemProfile"
                        rules={[
                          {
                          pattern: /^[a-zA-ZÀ-ÿ\s]+$/g,                            message: 'Sólo se permiten letras.',
                          },
                          {
                            required: true,
                            message: 'Este campo es obligatorio.',
                          },
                        ]}
                        >
                        <Input
                          size='large'
                          style={!isEditing ? customDisabledStyle : {}}
                          disabled={!isEditing}
                        />
                      </Form.Item>
                      <Form.Item
                        label=" "
                        style={{ width: 100 }}
                        name="streetNumber"
                        layout='vertical'
                        className="formItemProfile"
                        rules={[
                          {
                            required: true,
                            message: 'Este campo es obligatorio.',
                          },
                        ]}
                        >
                        <Input
                          size='large'
                          type="number"
                          style={!isEditing ? customDisabledStyle : {}}
                          disabled={!isEditing}
                        />
                      </Form.Item>

                    </Space.Compact>

  <Form.Item
    style={{ width: '275px' }}
    label="Código postal"
    name="postalCode"
    layout="vertical"
    className="formItemProfile"
    rules={[
      {
        pattern: /^[0-9]+$/g,
        message: 'Solo se permiten números.',
      },
      {
        required: true,
        message: 'Este campo es obligatorio.',
      },
    ]}
  >
    <Input
      size="large"
      type="number"
      style={!isEditing ? customDisabledStyle : {}}
      disabled={!isEditing}
    />
  </Form.Item>
</div>

                </Flex>



              </Form>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Datos del colegio" key="2">
            <Card
              className='CardProfile'
              title='Información del Colegio'
            >
              <Form
                form={formSchool}
                layout="vertical"
                style={{ height: '60vh', overflowY: 'auto', padding: '25px' }}

              >
                <Flex align='center'>
                  <Form.Item name="school_picture">
                    <Flex vertical align='center' justify='space-between' style={{ height: "100%" }} gap={30}>
                      <label >Logo del colegio:</label>
                      <div style={{ borderRadius: '50%', width: 200, height: 200 }}>
                        <img
                          src={escuelaCompleta || "https://via.placeholder.com/150"}
                          style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                      </div>
                      {isEditing ?
                        <Upload openFileDialogOnClick={false} className='upload-profile' accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}>
                            Subir imagen
                          </Button>
                        </Upload> : null}
                    </Flex>
                  </Form.Item>

                  <div
                    style={{
                      marginLeft: 50,
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: 30,
                    }}
                  >
                    <Form.Item
                      style={{ width: '275xp' }}
                      layout='vertical'
                      label="Nombre"
                      name="name"
                      className="formItemProfile" >
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : { height: '40px' }}
                        disabled={true}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Abreviacion"
                      style={{ width: '275xp' }}
                      name="abreviacion"
                      layout='vertical'
                      className="formItemProfile">
                      <Input
                        size='large'
                        autoSize
                        style={!isEditing ? customDisabledStyle : { flexGrow: 1, height: '40px' }}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      layout='vertical'
                      style={{ width: '275xp' }}
                      className="formItemProfile">
                      <Input
                        size='large'
                        autoSize
                        style={!isEditing ? customDisabledStyle : { height: '40px' }}
                        disabled={true}
                      />
                    </Form.Item>
                    <Space.Compact>
                      <Form.Item
                        style={{ width: 'fit-content' }}
                        label="Calle"
                        name="street"
                        layout='vertical'
                        className="formItemProfile">
                        <Input
                          size='large'
                          style={!isEditing ? customDisabledStyle : {}}
                          disabled={!isEditing}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Numero"
                        style={{ width: 100 }}
                        name="streetNumber"
                        layout='vertical'
                        className="formItemProfile">
                        <Input
                          size='large'
                          type="number"
                          style={!isEditing ? customDisabledStyle : {}}
                          disabled={!isEditing}
                        />
                      </Form.Item>

                    </Space.Compact>
                    <Form.Item
                      style={{ width: '275xp' }}
                      label="Código postal"
                      name="postalCode"
                      layout='vertical'
                      className="formItemProfile">
                      <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : {}}
                        disabled={!isEditing}
                      />
                    </Form.Item>
                  </div>
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
                <FormDisponibilidad onClose={onClose} />
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
    