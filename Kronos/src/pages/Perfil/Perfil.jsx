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
  const nameRules = [
    {
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/g,
      message: 'Sólo se permiten letras.',
    },
    {
      required: true,
      message: 'Este campo es obligatorio.',
    },
  ];
  
  const phoneRules = [
    {
      pattern: /^[0-9]+$/g,
      message: 'Solo se permiten números.',
    },
    {
      required: true,
      message: 'Este campo es obligatorio.',
    },
  ];
  
  const postalCodeRules = [
    {
      pattern: /^[0-9]+$/g,
      message: 'Solo se permiten números.',
    },
    {
      required: true,
      message: 'Este campo es obligatorio.',
    },
  ];

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
        <Tabs
  onChange={() => { setIsEditing(false); }}
  defaultActiveKey="1"
  style={{
    marginInline: 'auto',
    marginTop: '50px',
    display: 'flex',
  }}
>
          <Tabs.TabPane tab="Datos personales" key="1">
          <Card
  className="CardProfile"
  title={<h2 style={{ textAlign: "center" }}>Información Personal</h2>}
  extra={
    <>
      {isEditing ? (
        <>
          <Button
            style={{ width: "100px", marginInline: "10px" }}
            onClick={CancelarEdit}
            danger
          >
            Cancelar
          </Button>
          <Button
            type="primary"
            style={{ width: "100px" }}
            onClick={() => form.submit()}
          >
            Guardar
          </Button>
        </>
      ) : (
        <Button style={{ width: "100px" }} onClick={toggleEditMode}>
          Editar
        </Button>
      )}
    </>
  }
  style={{
    maxWidth: "1000px",
    margin: "auto",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  }}
>
  <Form
    requiredMark={false}
    form={form}
    onFinish={handleFinishUser}
    style={{ padding: "25px" }}
  >
    <Flex
      style={{
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Foto de perfil */}
      <Form.Item name="profile_picture" style={{ textAlign: "center" }}>
        <Flex vertical align="center" gap={20}>
          <label style={{ fontWeight: "bold" }}>Foto de perfil:</label>
          <div
            style={{
              borderRadius: "50%",
              width: 150,
              height: 150,
              overflow: "hidden",
              border: "2px solid #d9d9d9",
            }}
          >
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          {isEditing && (
            <Upload
              className="upload-profile"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Subir imagen</Button>
            </Upload>
          )}
        </Flex>
      </Form.Item>

      {/* Formulario en formato de cuadrícula */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        {/* Campos del formulario */}
        {[
          { label: "Nombre", name: "first_name", rules: nameRules },
          { label: "Apellido", name: "last_name", rules: nameRules },
          { label: "Teléfono", name: "phone", rules: phoneRules },
          { label: tipoDocumento, name: "document", disabled: true },
          { label: "Email", name: "email", disabled: true },
          { label: "Género", name: "gender", type: "select", options: generos },
          { label: "Nacionalidad", name: "nationality", type: "select", options: nationalities },
          { label: "Provincia", name: "province", rules: nameRules },
          { label: "Ciudad", name: "city", rules: nameRules },
          { label: "Calle", name: "street", rules: nameRules },
          { label: "Número", name: "streetNumber", type: "number" },
          { label: "Código Postal", name: "postalCode", type: "number", rules: postalCodeRules },
        ].map(({ label, name, rules, type, disabled, options }) => (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={rules || []}
            style={{ marginBottom: "10px" }}
          >
            {type === "select" && isEditing ? (
              <Select
                size="large"
                options={options}
              />
            ) : (
              <Input
                size="large"
                type={type || "text"}
                style={{
                  ...(!isEditing || disabled ? customDisabledStyle : {}),
                }}
                disabled={!isEditing || disabled}
              />
            )}
          </Form.Item>
        ))}
      </div>
    </Flex>
  </Form>
</Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Datos del colegio" key="2">
            <Card
  className="CardProfile"
  title={<h2 style={{ textAlign: "center" }}>Información del Colegio</h2>}
  style={{
    maxWidth: "1000px",
    margin: "auto",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  }}
>
  <Form requiredMark={false} form={formSchool}  style={{ padding: "25px" }}>
    <Flex
      style={{
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Foto del colegio */}
      <Form.Item name="school_picture" style={{ textAlign: "center" }}>
        <Flex vertical align="center" gap={20}>
          <label style={{ fontWeight: "bold" }}>Logo del Colegio:</label>
          <div
            style={{
              borderRadius: "50%",
              width: 150,
              height: 150,
              overflow: "hidden",
              border: "2px solid #d9d9d9",
            }}
          >
            <img
              src={escuelaCompleta || "https://via.placeholder.com/150"}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          {isEditing && (
            <Upload
              className="upload-profile"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Subir Imagen</Button>
            </Upload>
          )}
        </Flex>
      </Form.Item>

      {/* Campos del formulario */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        {[
          { label: "Nombre", name: "name", rules: nameRules },
          { label: "Abreviación", name: "abreviacion" },
          { label: "Email", name: "email", disabled: true },
          { label: "Calle", name: "street" },
          { label: "Número", name: "streetNumber", type: "number" },
          { label: "Código Postal", name: "postalCode" },
        ].map(({ label, name, rules, type, disabled }) => (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={rules || []}
            style={{ marginBottom: "10px" }}
          >
            {type === "select" ? (
              <Select
                size="large"
                style={(!isEditing || disabled ? customDisabledStyle : {})}
                disabled={!isEditing || disabled}
                options={[]}
              />
            ) : (
              <Input
                size="large"
                type={type || "text"}
                style={(!isEditing || disabled ? customDisabledStyle : {})}
                disabled={!isEditing || disabled}
              />
            )}
          </Form.Item>
        ))}
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
    