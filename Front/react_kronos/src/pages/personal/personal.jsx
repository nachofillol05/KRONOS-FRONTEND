import React, { useState, useEffect, useRef, useContext } from "react";
import "./personal.scss";
import { Table, Select, Spin, FloatButton, Drawer, Radio, Form, Space, Input, Button, Flex, message, Modal } from "antd";
import { UsergroupAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import FormSearchDni from './fromSearchDni';
import InfoWorker from './infoWorker';
import FormCreateWorker from './formCreateWorker';
import ContacWorker from './contactWorker';
import EspecificWorker from './especificWorker';
import { Contexto } from "../../layout/navegacion/navegaciones";

export default function Personal() {
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

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
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


  const showEspecificWorker = (id) => {
    showDrawer(
      <EspecificWorker id={id} onClose={onClose} />, 'Información del trabajador'
    )
  }

  const handleFilterChange = (e) => {
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
        handleSubmit={handleSubmit}
        handleVolver={handleVolver}
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
                  handleContactar={() => showDrawer(<ContacWorker onClose={onClose} handleVolver={handleVolver} user={body.user} />, 'Contacata con el trabajador')}
                  onClose={onClose}
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
          if (response.status === 201) {
            onClose();
            showMessage("success", "Usuario creado con éxito");
            setRecargar(!recargar);

            return response.json();
          } else if (response.status === 400) {
            showMessage("error", "Mail ya registrado");
          }
        })

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
                console.log(data);
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
                console.log(data);
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

  return (
    (isLoading ?
      <div className="spinner-container">
        <Spin size="large" />
      </div>
      :
      <>
        {contextHolder}
        < div className="contenedor-filtros contenedor-filtros-personal">
          <Radio.Group size='large' defaultValue="Profesores" buttonStyle="solid" onChange={handleFilterChange}>
            <Radio.Button value="Profesores" >Profesor</Radio.Button>
            <Radio.Button value="Preceptores" >Preceptor</Radio.Button>
            <Radio.Button value="Directivos">Directivo</Radio.Button>
          </Radio.Group>
          {activeFilter === 'Profesores' && (

            <Select
              style={{ width: 250 }}
              value={subject ? subject : null}
              size='large'
              showSearch
              placeholder="Seleccione una materia"
              onChange={onChange}
              options={subjects}
              allowClear
            />) || activeFilter === 'Preceptores' && (
              <Select
                style={{ width: 250 }}
                value={course}
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
            onChange={onChangePersonal} //VEEEEEEEEEEEER DE CAMBIAR POR UN ONCHANGE O SI EXISTE UN ONFINALCHANGE
            allowClear
          />
        </div >
        <Table
          rowKey={'id'}
          bordered
          onRow={(user) => ({
            onClick: () => {
              showEspecificWorker(user.id);
            },
          })}
          pagination={false}
          y={500}
          dataSource={teachers}
          columns={columns}
          tableLayout={'fixed'}
          filterDropdownOpen={true}
          filtered={true}
          rowSelection={rowSelection}
        />
        {
          sessionStorage.getItem('rol') === 'Directivo' ? (
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

            </>
          ) : (<FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />)
        }`
      </>
    )
  );
}
