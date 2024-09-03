import React, { useState, useEffect, useRef } from "react";
import "./personal.scss";
import { Table, Select, AutoComplete, FloatButton, Drawer, Radio, Form, Space, Input, Button, Flex, message, Modal } from "antd";
import { UsergroupAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import FormSearchDni from './fromSearchDni';
import InfoWorker from './infoWorker';
import FormCreateWorker from './formCreateWorker';
import ContacWorker from './contactWorker';
import EspecificWorker from './especificWorker';

export default function Personal() {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [activeButton, setActiveButton] = useState('Profesores');
    const [searchName, setSearchName] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);
    const asuntoRef = useRef(null);
    const contenidoRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [messageConfig, setMessageConfig] = useState({ type: '', content: '' });
    const [tipoDocumento, setTipoDocumento] = useState(null);
    const [documento, setDocumento] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Profesores');
    const [courses, setCourse] = useState('');
    
    const DescargarExcel = () => {
      console.log('Descargando...');
    
      fetch("http://127.0.0.1:8000/api/staff/?export=excel", {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "School-ID": sessionStorage.getItem("actual_school"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob(); 
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Personal.xlsx');
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error al descargar el archivo:", error);
        });
    };
    

    const showEspecificWorker = (dni) => {
        showDrawer(
            <EspecificWorker dni={dni} onClose={onClose} />, 'Información del trabajador'
        )
    }

  const handleFilterChange = (e) => {
    setActiveFilter(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    //hacerle un update a colegio y agregarle a directivos
    //createsuperUser aaaaaaaaaaaaaaaaaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    console.log("Opción Directivo cancelada");
  };

  const handleVolver = () => {
    showDrawer(
      <FormSearchDni handleSearch={handleSearch} />,
      "Buscar personal"
    );
  };
  const handleVolverInfo = (user) => {
    showDrawer(
      <InfoWorker
        user={user}
        handleVolver={handleVolver}
        handleAgregar={handleAgregar}
        handleContactar={() => handleContactar(user)}
      />,
      "Información del Trabajador"
    );
  };
  // agregar como directivo, como preceptor o como profesor
  const handleAgregar = (e) => {
    if (e.key === "Profesor") {
      /*fetch('http://localhost:8000/api/create_tss/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // personal: values.documento,
                }),
            });*/

      console.log("Profesor");
    } else if (e.key === "Preceptor") {
      console.log("Preceptor");
    } else if (e.key === "Directivo") {
      console.log("Directivo");
      showModal();
    }
  };

  const handleContactar = (user) => {
    showDrawer(
      <ContacWorker user={user} handleVolver={() => handleVolverInfo(user)} />,
      "Contactar personal"
    );
  };

  /*const showInfoWorker = (documento) => {
        

        
    };
    */

  const handleSearch = (formRef, options) => {
    formRef.current
      .validateFields()
      .then((values) => {
        fetch("http://localhost:8000/api/create_teacher/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "School-ID": sessionStorage.getItem("actual_school"),
          },
          body: JSON.stringify({
            document: values.documento,
          }),
        })
          .then((response) =>
            response
              .json()
              .then((data) => ({ status: response.status, body: data }))
          )
          .then(({ status, body }) => {
            if (status === 400) {
              console.log("dni entra a 400");
              console.log("Dni encontrado:", body);
              showDrawer(
                <InfoWorker
                  user={body.user}
                  handleVolver={handleVolver}
                  handleAgregar={handleAgregar}
                  handleContactar={() => handleContactar(body.user)}
                />,
                "Información del Trabajador"
              );
            } else if (status === 200) {
              console.log("dni entra a 200");
              console.log("dni no encontrado:", body);
              console.log("Tipo documentos: ", options);
              const selectedItem = options.find(
                (option) => option.value === values.tipoDni
              );
              console.log("Selected item:", selectedItem);
              showDrawer(
                <FormCreateWorker
                  tipoDocumento={selectedItem.label}
                  tipoDocumentoId={selectedItem.value}
                  documento={values.documento}
                  handleSubmit={handleSubmit}
                  handleVolver={handleVolver}
                />,
                "Agregar Personal"
              );
            }
          })
          .catch((error) => {
            console.error("Error al realizar la búsqueda:", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const Buscar = () => {
    setLoading(true);
    if (true) {
      setDrawerContent();
    }

    setLoading(false);
  };

  useEffect(() => {
    if (messageConfig.type) {
      showMessage(messageConfig.type, messageConfig.content);
      setMessageConfig({ type: "", content: "" });
    }
  }, [messageConfig]);

    const showDrawer = (content, title) => {
        setDrawerTitle(title);
        setDrawerContent(content);
        setOpen(true);
    };

  const onClose = () => {
    setOpen(false);
    setDrawerContent(null);
    form.resetFields();
  };
  //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGREGAR QUE CREE UN TEACHER CON LA SCHOOL
  const handleSubmit = (form) => {
    form
      .validateFields()
      .then((values) => {
        console.log("Values:", values);
        console.log("documento:", documento);
        const body = JSON.stringify({
          first_name: values.nombre,
          last_name: values.apellido,
          document: values.documento,
          documentType: values.tipoDocumento,
          email: values.email,
          phone: values.telefono,
          password: values.documento,
        });
        console.log("Body: ", body);
        fetch("http://localhost:8000/api/Register/", {
          method: "POST",
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "School-ID": sessionStorage.getItem("actual_school"),
            "Content-Type": "application/json",
          },
          body: body,
        }).then((response) => {
          if (!response.ok) {
            console.log("Error:", response);
            throw new Error("Error al crear el personal");
          }
          console.log("Response:", response);
          return response.json();
        });
        setMessageConfig({
          type: "success",
          content: "Personal creado con exito",
        });
        onClose();
      })
      .catch((errorInfo) => {
        setMessageConfig({
          type: "error",
          content: "Por favor, complete todos los campos.",
        });
      });
  };

  const showMessage = (type, content) => {
    switch (type) {
      case "success":
        messageApi.success(content);
        break;
      case "error":
        messageApi.error(content);
        break;
      case "warning":
        messageApi.warning(content);
        break;
      case "info":
        messageApi.info(content);
        break;
      default:
        messageApi.info(content);
        break;
    }
  };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/years/", {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "School-ID": sessionStorage.getItem("actual_school"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const courses = data.map((curs) => ({
          value: curs.id,
          label: curs.name,
        }));
        setCourse(courses);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEnviar = (event) => {
    event.preventDefault();
    const asunto = asuntoRef.current.value;
    const contenido = contenidoRef.current.value;
    const emailSpan = document.querySelector(".contactar .email label span");
    const email = emailSpan.textContent;

    if (asunto) {
      const jsonData = JSON.stringify({ email, asunto, contenido });
      console.log("JSON:", jsonData);

      fetch("http://localhost:8000/api/contacting-staff/", {
        method: "POST",
        body: jsonData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al enviar los datos.");
          }
          return response.json();
        })
        .then((data) => {
          // Manejar los datos de la respuesta si es necesario
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      onClose();
    }
  };
    //SOLO PARA TEACHERSSSSSSSSSSSSSSSS
        useEffect(() => {
            if (activeFilter === 'Profesores') {
                const url = new URL('http://127.0.0.1:8000/api/teachers/');
                if (searchName) url.searchParams.append('search_name', searchName);
                if (subject) url.searchParams.append('subject_id', subject);
    
                setLoading(true);
                fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'School-ID': sessionStorage.getItem('actual_school'),
                    },
                })
                .then((response) => {
                    if (!response.ok) {
                        setTeachers([]);
                        return;
                    }
                    return response.json();
                })
                .then((data) => {
                  setTeachers(data);
                  setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
            } else if (activeFilter === 'Preceptores') {
                const url = new URL(`http://127.0.0.1:8000/api/preceptors`);
                if (searchName) url.searchParams.append('search', searchName);
                //if (year) url.searchParams.append('year_id', year);
                fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'School-ID': sessionStorage.getItem('actual_school'),
                    },
                })
                .then((response) => {
                  if (!response.ok) {
                      setTeachers([]);
                      return;
                  }
                  return response.json();
              })
              .then((data) => {
                  console.log(data);
                  setTeachers(data);
                })
                .catch((error) => console.error('Error fetching data:', error));
            }
            else if (activeFilter === 'Directivos') {
                const schools = JSON.parse(localStorage.getItem('schools') || '[]');
                const actualSchoolPk = parseInt(sessionStorage.getItem('actual_school'), 10);
                if (schools && actualSchoolPk) {
                    const selectedSchool = schools.find(school => school.pk === actualSchoolPk);
                    if (selectedSchool.directives.length === 0) {
                      setTeachers([]);
                      return;
                    }
                    setTeachers(selectedSchool.directives);
                    
        }
            }
        }, [activeFilter, searchName, subject, courses]);

  const columns = [
    { title: "Apellido", dataIndex: "last_name", key: "Apellido", width: 150 },
    { title: "Nombre", dataIndex: "first_name", key: "Nombre", width: 150 },
    { title: "Documento", dataIndex: "document", key: "Documento", width: 150 },
    { title: "Genero", dataIndex: "gender", key: "Genero", width: 100 },
    { title: "Email", dataIndex: "email", key: "Email", width: 200 },
  ];
  

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/subjects/", {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "School-ID": sessionStorage.getItem("actual_school"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const subjects = data.map((subject) => ({
          value: subject.id,
          label: subject.name,
        }));
        setSubjects(subjects);

            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

  const onSearch = (searchText) => {
    setSearchName(searchText);
    console.log(searchName);
  };

  const handleSelectChange = (event) => {
    setSubject(event.target.value);
  };
  const onChangePersonal = (event) => {
    const value = event.target.value;
    setSearchName(value);
  };

    const onChange = (value) => {
        console.log(`selected ${value}`);
        setSubject(value);
    };
    const onChangeCourse = (value) => {
        console.log(`selected ${value}`);
        setCourse(value);
    };
    console.log('teacher', teachers)
    return (
        <>
            {contextHolder}
            <div className="contenedor-filtros contenedor-filtros-personal">
                <Radio.Group size='large' defaultValue="Profesores" buttonStyle="solid" onChange={handleFilterChange}>
                    <Radio.Button value="Profesores" >Profesor</Radio.Button>
                    <Radio.Button value="Preceptores" >Preceptor</Radio.Button>
                    <Radio.Button value="Directivos">Directivo</Radio.Button>
                </Radio.Group>
                {activeFilter === 'Profesores' && (
                    
                <Select
                    size='large'
                    showSearch
                    placeholder="Seleccione una materia"
                    onChange={onChange}
                    options={subjects}
                    allowClear
                />)|| activeFilter === 'Preceptores' && (
                    <Select
                        size='large'
                        showSearch
                        placeholder="Seleccione un curso"
                        onChange={onChangeCourse}
                        options={courses}
                        allowClear
                    />
                )}
                <Input
                    size="large"
                    style={{
                        width: 300,
                    }}
                    placeholder="Buscar Personal"
                    onPressEnter={onChangePersonal}
                    allowClear
                />
            </div>
            <Table
                bordered
                onRow={(user) => ({
                    onClick: () => {
                        showEspecificWorker(user.document);
                    },
                })}
                pagination={false}
                y={500}
                dataSource={teachers}
                columns={columns}
                loading={loading}
                tableLayout={'fixed'}
                filterDropdownOpen={true}
                filtered={true}
            />
            {sessionStorage.getItem('rol') === 'Directivo' ? (
              <>
            <FloatButton.Group
                visibilityHeight={1500}
                trigger="click"
                type="primary"
                closeIcon={<DownOutlined />}
                icon={<UpOutlined />}
            >
                <FloatButton icon={<DownloadOutlined />} onClick={DescargarExcel} tooltip="Descargar tabla" />
                <FloatButton icon={<UsergroupAddOutlined />} type='primary' tooltip="Agregar personal"
                    onClick={() => showDrawer(
                        <FormSearchDni handleSearch={handleSearch} />,
                        'Buscar personal'
                    )}
                />
            </FloatButton.Group>

      <Drawer
        destroyOnClose={false}
        width={600}
        title={drawerTitle}
        onClose={onClose}
        open={open}
        closeIcon={false}
        extra={
          <Button
            onClick={onClose}
            size="large"
            type="tertiary"
            icon={<CloseOutlined />}
          />
        }
      >
        <div style={{ width: "100%", height: "100%" }}>{drawerContent}</div>
      </Drawer>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Sí"
        cancelText="No"
      >
        <h1>Advertencia</h1>
        <p>
          Si lo agregas como directivo podra tener acceso a toda la informacion
          y modificarla
        </p>
      </Modal>
      </>
    ) : (<FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />)}
    </>
  );
}
