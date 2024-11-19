import React, { useState, useEffect, useRef, useContext } from "react";
import "./personal.scss";
import { Table, Select, Spin, FloatButton, Drawer, Radio, Form, Space, Input, Button, Flex, message, Modal, Badge } from "antd";
import { SearchOutlined, UsergroupAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, MailOutlined, CloseOutlined,FieldTimeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FormSearchDni from './fromSearchDni';
import InfoWorker from './infoWorker';
import FormCreateWorker from './formCreateWorker';
import ContacWorker from './contactWorker';
import EspecificWorker from './especificWorker';
import { Contexto } from "../../layout/navegacion/navegaciones";

export default function Personal() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeButton, setActiveButton] = useState('Profesores');
  const [searchName, setSearchName] = useState('');
  const [subject, setSubject] = useState('');
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
  const [activeFilter, setActiveFilter] = useState('Profesores');
  const [courses, setCourses] = useState('');
  const [course, setCourse] = useState('');
  const [recargar, setRecargar] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [persistentSelectedKeys, setPersistentSelectedKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    let updatedSelectedKeys = [...persistentSelectedKeys];

    newSelectedRowKeys.forEach((key) => {
      if (!updatedSelectedKeys.includes(key)) {
        updatedSelectedKeys.push(key);
      }
    });

    const currentVisibleKeys = teachers.map((teacher) => teacher.email);
    const newDeselections = persistentSelectedKeys.filter(
      (key) => !newSelectedRowKeys.includes(key) && currentVisibleKeys.includes(key)
    );

    updatedSelectedKeys = updatedSelectedKeys.filter(
      (key) => !newDeselections.includes(key)
    );

    setPersistentSelectedKeys(updatedSelectedKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };




  const rowSelection = {
    selectedRowKeys: persistentSelectedKeys,  // Usa la lista persistente completa
    onChange: onSelectChange,
  };



  const DescargarExcel = () => {
    console.log('Descargando...');

    fetch("http://127.0.0.1:8000/api/staff/export", {
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


  const showEspecificWorker = (user) => {
    showDrawer(
      <EspecificWorker user={user} onClose={onClose} rolSeleccionado={activeFilter} />, 'Información del trabajador'
    )
  }

  const handleFilterChange = (e) => {
    setSelectedRowKeys([])
    setSubject(null);
    setCourse(null);
    setSearchName(null);
    setActiveFilter(e.target.value);
  };

  const handleVolver = () => {
    showDrawer(
      <FormSearchDni handleSearch={handleSearch} />,
      "Buscar/agregar personal."
    );
  };
  const ok = (body, values, options) => {
    console.log("dni entra a 200");
    console.log("values:", values);
    console.log("options: ", options);
    const selectedItem = options.find(
      (option) => option.value === values.tipoDocumento
    );
    console.log("Selected item:", selectedItem);
    showDrawer(
      <FormCreateWorker
        tipoDocumento={selectedItem.label}
        tipoDocumentoId={selectedItem.value}
        documento={values.documento}
        //handleSubmit={handleSubmit}
        setRecargar={setRecargar}
        recargar={recargar}
        handleVolver={handleVolver}
        onClose={onClose}
      />,
      "Agregar Personal"
    );
  }

  const showModal = (body, values, options) => {
    Modal.confirm({
      title: 'Creacion de personal',
      content: (
        <p>Este documento no le pertenece a ningun personal.¿Quiere crear uno?</p>
      ),
      closable: true,
      okText: 'Confirmar',
      onOk: () => ok(body, values, options),
      cancelText: 'Cancelar',
    });
  };

  const handleSearch = (formRef, options) => {
    formRef.current
      .validateFields()
      .then((values) => {
        console.log(values, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        fetch("http://localhost:8000/api/create_teacher/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "School-ID": sessionStorage.getItem("actual_school"),
            Authorization: `Token ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            documentType: values.tipoDocumento,
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
              showDrawer(
                <InfoWorker
                  user={body.user}
                  handleVolver={handleVolver}
                  handleContactar={() => showDrawer(<ContacWorker onClose={onClose} handleVolver={handleVolver} user={body.user.email} />, 'Contacata con el trabajador')}
                  onClose={onClose}
                  recargar={recargar}
                  setRecargar={setRecargar}
                />,
                "Información del Trabajador"
              );
            } else if (status === 200) {
              showModal(body, values, options);

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
  /*const handleSubmit = (values) => {
        const body = JSON.stringify({
          first_name: values.nombre,
          last_name: values.apellido,
          document: values.documento,
          documentType: values.tipoDocumento,
          email: values.email,
          phone: values.telefono,
          password: values.documento,
        });
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ",body)
        fetch("http://localhost:8000/api/Register/", {
          method: "POST",
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "School-ID": sessionStorage.getItem("actual_school"),
            "Content-Type": "application/json",
          },
          body: body,
        }).then((response) => {
          if (response.status === 201) {
            onClose();
            showMessage("success", "Usuario creado con éxito");
            setRecargar(!recargar);

            return response.json();
          } else if (response.status === 400) {
            return response.json().then((errorData) => {
              console.log("Errores de respuesta: ", errorData);
              const errorMessages = Object.values(errorData).flat();
              showMessage("error", errorMessages.join(" "));
            });
          }
        })
  };*/

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
        setCourses(courses);
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


    const fetchData = async () => {
      try {
        let fetchPromises = [];

        if (activeFilter === 'Profesores') {
          const url = new URL('http://127.0.0.1:8000/api/teachers/');
          if (searchName) url.searchParams.append('search_name', searchName);
          if (subject) url.searchParams.append('subject_id', subject);

          fetchPromises.push(
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
                console.log(data)
                setTeachers(data);
              })
          );
        }

        else if (activeFilter === 'Preceptores') {
          const url = new URL('http://127.0.0.1:8000/api/preceptors');
          if (searchName) url.searchParams.append('search', searchName);
          if (course) url.searchParams.append('year_id', course);

          fetchPromises.push(
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
              })
          );
        }

        else if (activeFilter === 'Directivos') {
          const url = new URL('http://127.0.0.1:8000/api/directives');
          if (searchName) url.searchParams.append('search', searchName);

          fetchPromises.push(
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
              })
          );
        } else if (activeFilter === 'Todos') {
          const url = new URL('http://127.0.0.1:8000/api/staff');
          if (searchName) url.searchParams.append('search', searchName);

          fetchPromises.push(
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
          );
        }

        // Esperar a que todos los fetch terminen
        await Promise.all(fetchPromises);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeFilter, searchName, subject, course, recargar]);

  //VEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER COMO HACER ESTO
  useEffect(()=>{
    console.log(sessionStorage.getItem('actual_school'))
  },[sessionStorage.getItem('actual_school')])



  const limpiarSeleccion = ()=>{
    setPersistentSelectedKeys([])
  }
  const columns = [
    { title: "Apellido", dataIndex: "last_name", key: "Apellido", width: 150 },
    { title: "Nombre", dataIndex: "first_name", key: "Nombre", width: 150 },
    { 
      title: "Tipo de documento", 
      dataIndex: "documentType", 
      key: "Tipo de documento", 
      width: 100,
      render: (documentType) => (documentType ? documentType.name : 'N/A') // Muestra 'N/A' si documentType es null
    },    { title: "Documento", dataIndex: "document", key: "Documento", width: 150 },
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
  

  console.log('iiiiiiiiiiiiiiiiiiiiiimmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmppppppppppppppppppppppppppppppppppppppp', persistentSelectedKeys);
  return (
    isLoading ? (
      <div className="spinner-container">
        <Spin size="large" />
      </div>
    ) : (
      <div className="personal-view-container">
        {contextHolder}
        <div className="contenedor-filtros contenedor-filtros-personal">
  <Radio.Group 
    size='large' 
    defaultValue="Profesores" 
    buttonStyle="solid" 
    onChange={handleFilterChange}
  >
    <Radio.Button value="Profesores">Profesores</Radio.Button>
    <Radio.Button value="Preceptores">Preceptores</Radio.Button>
    <Radio.Button value="Directivos">Directivos</Radio.Button>
    <Radio.Button value="Todos">Todos</Radio.Button>
  </Radio.Group>
  
  <div className="filters-group">
    {activeFilter === 'Profesores' ? (
      <Select
        size='large'
        value={subject ? subject : null}
        showSearch
        placeholder="Seleccione una materia"
        onChange={onChange}
        options={subjects}
        allowClear
      />
    ) : activeFilter === 'Preceptores' ? (
      <Select
        size='large'
        value={course}
        showSearch
        placeholder="Seleccione un curso"
        onChange={onChangeCourse}
        options={courses}
        allowClear
      />
    ) : null}
    
    <Input
      size="large"
      placeholder="Buscar Personal"
      onChange={onChangePersonal}
      allowClear
      suffix={
        <SearchOutlined
          style={{
            color: 'rgba(0,0,0,.45)',
          }}
        />
      }
    />
  </div>
</div>

        
        <div className="table-container">
          <Table
            rowKey={'email'}
            bordered
            onRow={(user) => ({
              onClick: () => showEspecificWorker(user),
              onMouseEnter: () => {
                document.body.style.cursor = 'pointer';
              },
              onMouseLeave: () => {
                document.body.style.cursor = 'default';
              },
            })}
            pagination={false}
            scroll={{ x: true, y: 700 }}
            dataSource={teachers}
            columns={columns}
            tableLayout={'fixed'}
            filterDropdownOpen={true}
            filtered={true}
            rowSelection={rowSelection}
            locale={{
              emptyText: 'No hay personales disponibles',
            }}
          />
        </div>
  
        {sessionStorage.getItem('rol') === 'Directivo' ? (
          <>
            <FloatButton.Group
              visibilityHeight={1500}
              trigger="click"
              type="primary"
              closeIcon={<DownOutlined />}
              icon={<UpOutlined />}
            >
              <FloatButton 
                icon={<DownloadOutlined />} 
                onClick={DescargarExcel} 
                tooltip="Descargar tabla" 
              />
              <FloatButton 
                icon={<UsergroupAddOutlined />} 
                type='primary' 
                tooltip="Agregar personal"
                onClick={() => showDrawer(
                  <FormSearchDni handleSearch={handleSearch} />,
                  'Buscar personal'
                )}
              />
            </FloatButton.Group>
  
            {persistentSelectedKeys.length !== 0 && (
              <FloatButton.Group style={{ right: '180px' }}>
                <FloatButton 
                  icon={<CloseOutlined />} 
                  tooltip="Deseleccionar"
                  onClick={limpiarSeleccion} 
                />
                <FloatButton 
                  icon={<MailOutlined />} 
                  tooltip="Mandar mail a seleccionados"
                  onClick={() => showDrawer(
                    <ContacWorker 
                      onClose={onClose} 
                      handleVolver={handleVolver} 
                      user={persistentSelectedKeys} 
                    />, 
                    'Contactar con el personal'
                  )}
                  type='primary' 
                />
              </FloatButton.Group>
            )}
  
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
          </>
        ) : (
          <FloatButton 
            icon={<DownloadOutlined />} 
            onClick={DescargarExcel} 
            tooltip="Descargar tabla" 
          />
        )}
      </div>
    )
  );

}