import { useState, useEffect } from "react";
import { Select, DatePicker, AutoComplete, Drawer, Card, Button, FloatButton, message, Tooltip, Modal, Input } from "antd";
import { InfoCircleOutlined, EditOutlined, CheckCircleOutlined, UserAddOutlined, CloseOutlined, DownOutlined, UpOutlined, FolderAddOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import FormCreateEvent from "./formCreateEvent";
import moment from 'moment';
import InfoEvent from "./infoEvent";
import dayjs from 'dayjs';
import "./events.scss";
const dateFormat = 'DD/MM/YYYY';


export default function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState(null);
  const today = new Date();
  const [messageApi, contextHolder] = message.useMessage();
  const [messageConfig, setMessageConfig] = useState({ type: '', content: '' });
  const [eventName, setEventName] = useState('');
  const [nombre, setNombre] = useState([]);
  const [tipoEvento, setTipoEvento] = useState([]);
  const [date, setDate] = useState('');
  const [eventos, setEventos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [profileData, setProfileData] = useState({});

  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day');
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
            setProfileData(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/typeevent/', {
        method: "GET",
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'School-ID': sessionStorage.getItem('actual_school'),
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tipos = data.map(tipo => ({
                value: tipo.id,
                label: tipo.name,
            }));
            setTipos(tipos);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const url = new URL('http://127.0.0.1:8000/api/events/');
    if (date) {
        url.searchParams.append('maxDate', date);
    }
    if (tipoEvento) {
        url.searchParams.append('eventType', tipoEvento);
    }
    if (nombre) {
        url.searchParams.append('name', nombre);
    }
    fetch(url.toString(), {
        method: "GET",
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'School-ID': sessionStorage.getItem('actual_school'),
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setEventos(data);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, [date, nombre, tipoEvento]);

  useEffect(() => {
    if (messageConfig.type) {
        showMessage(messageConfig.type, messageConfig.content);
        setMessageConfig({ type: '', content: '' });
    }
  }, [messageConfig]);

  const showModal = (evento) => {
    Modal.info({
      title: 'Confirmar adición al evento',
      content: (
        <p>¿Seguro que quieres adherirte al evento "<b>{evento.name}</b>"?</p>
      ),
      onOk: () => handleOk(evento),
      closable: true,
      okText: 'Si, quiero adherirme',
    });
  };
  
  const showModalDesadherir = (evento) => {
    Modal.info({
      title: 'cancelar adición',
      content: (
        <p>¿Seguro que quieres Salirte del evento "<b>{evento.name}</b>"?</p>
      ),
      onOk: () => handleOkDesadherir(evento),
      closable: true,
      okText: 'Si, quiero desadherirme',
    });
  };

  const handleOkDesadherir = (evento) => {
      const updatedAffiliatedTeachers = evento.affiliated_teachers.filter(
        teacherId => teacherId !== profileData.id
      );
      const url = new URL('http://127.0.0.1:8000/api/events/' + evento.id + '/');
      const formattedStartDate = moment(evento.startDate).format('DD/MM/YYYY');
      const formattedEndDate = moment(evento.endDate).format('DD/MM/YYYY')

      fetch(url, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + localStorage.getItem('token'),
              'School-ID': sessionStorage.getItem('actual_school'),
          },
          body: JSON.stringify({
              affiliated_teachers: updatedAffiliatedTeachers,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
              eventType: evento.eventType,
              school: evento.school,
              name: evento.name,
              description: evento.description,
          }),
      })
      .then(response => {
          if (!response.ok) {
              return response.json().then((error) => {
                  throw new Error(`Server responded with ${response.status}: ${JSON.stringify(error)}`);
              });
          }
          return response.json();
      })
      .then(data => {
      })
      .catch(error => console.error('Error fetching data:', error));
  
      setIsModalOpen(false);
  };

  const handleOk = (evento) => {
    //VISTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA DE AÑADIRSE AAAAAAAAAAAAAAAAAAAAAL EEEEEEEEEEEEVEEEEEEEENTO
      const updatedAffiliatedTeachers = [...evento.affiliated_teachers, profileData.id];
      const url = new URL('http://127.0.0.1:8000/api/events/' + evento.id + '/');
      const formattedStartDate = moment(evento.startDate).format('DD/MM/YYYY');
      const formattedEndDate = moment(evento.endDate).format('DD/MM/YYYY')

      fetch(url, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + localStorage.getItem('token'),
              'School-ID': sessionStorage.getItem('actual_school'),
          },
          body: JSON.stringify({
              affiliated_teachers: updatedAffiliatedTeachers,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
              eventType: evento.eventType,
              roles: evento.roles,
              school: evento.school,
              name: evento.name,
              description: evento.description,
          }),
      })
      .then(response => {
          if (!response.ok) {
              return response.json().then((error) => {
                  throw new Error(`Server responded with ${response.status}: ${JSON.stringify(error)}`);
              });
          }
          return response.json();
      })
      .then(data => {
        console.log("exito?",data);
      })
      .catch(error => console.error('Error fetching data:', error));
  
      setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleVolver = () => {
    setDrawerContent(null);
    setDrawerTitle(null);
    setOpen(false);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (form) => {
    //Mostrar un alert de que se creoooooooooooooooooooooooooooooooooooooooooooooooooooo
    //HAAAAAAAAAAAAAAAAAAAAAAAACER QUE PUEDA SELECCIONAR LOS ROLES A LOS QUE VA DIRIGIDO EL EVENTO
    form.validateFields()
        .then(values => {
          const body = {
            name: values.nombre,
            description: values.descripcion,
            startDate: formatDate(values.dates[0].toDate()),   
            endDate: formatDate(values.dates[1].toDate()),   
            eventType: values.tipoEvento,
            school: sessionStorage.getItem('actual_school'),
            roles: [0],
            affiliated_teachers: [],
        };
        fetch('http://127.0.0.1:8000/api/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
            body: JSON.stringify(body),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
        onClose();
  })};

  const showDrawer = (content, title) => {
    setDrawerTitle(title);
    setDrawerContent(content);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setDrawerContent(null);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const showMessage = (type, content) => {
    switch (type) {
        case 'success':
            messageApi.success(content);
            break;
        case 'error':
            messageApi.error(content);
            break;
        case 'warning':
            messageApi.warning(content);
            break;
        case 'info':
            messageApi.info(content);
            break;
        default:
            messageApi.info(content);
            break;
    }
  };
  const onChange = (value) => {
    setTipoEvento(value);
  };
  const onChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const onChangeDate = (date, dateString) => {
    const formattedMaxDate = moment(dateString).format('DD/MM/YYYY');
    setDate(encodeURIComponent(formattedMaxDate))
  }

  //cambiar event.type_event.name ponerlo entre llaves
  return (
    <>
      {contextHolder}
      <div className="filtros-container">
        <Select
          size="large"
          style={{
            width: 200,
          }}
          options={tipos}
          onChange={onChange}
          showSearch
          placeholder="tipo de evento"
          allowClear
        />

        <DatePicker
          size="large"
          placeholder="Fecha"
          style={{
            width: 200,
          }}
          onChange={onChangeDate}
          format={dateFormat}
          allowClear
          disabledDate={disabledDate}
        />

        <Input
          size="large"
          style={{
            width: 300,
          }}
          placeholder="Buscar Evento"
          onPressEnter={onChangeNombre}
          allowClear
        />
      </div>
      <div
        style={{
          maxHeight: "85%",
          overflowY: "scroll",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "start",
          gap: 25,
          paddingInline: 25,
        }}
      >
        {eventos.map((event) => {
          const eventStatus = (() => {
            if (new Date(event.endDate) < today) {
              
              return "Finalizado";
            } else if (new Date(event.startDate) > today) {

              return "Pendiente";
            } else {

              return "En curso";
            }
          })();

          const isUserAffiliated = event.affiliated_teachers.includes(profileData.id);
          const mostrar = (() => {
            if (eventStatus === "Pendiente" && !isUserAffiliated) {
              return "Adherirse al evento";
            } 
            if (eventStatus === "Pendiente" && isUserAffiliated) {
              return "Ya estás adherido";
            } 
            if ((eventStatus === "Finalizado" || eventStatus === "En curso") && !isUserAffiliated) {
              return "";
            }
            if ((eventStatus === "Finalizado" || eventStatus === "En curso") && isUserAffiliated) {
              return "Ya estás adherido";
            }
          })();
          
          return (
            <Card
              key={event.id}
              style={{
                width: "25%",
                minWidth: 300,
                display: "flex",
                flexFlow: "column",
              }}
              actions={[
                <Tooltip title="Detalles del evento">
                  <InfoCircleOutlined 
                    key="details" 
                    onClick={() => showDrawer(<InfoEvent estado={eventStatus} event={event} />, "Detalles del evento")} 
                  />
                </Tooltip>,

                mostrar && (
                  <Tooltip 
                    title={mostrar} 
                    key="action"
                  >
                    {mostrar === "Adherirse al evento" ? (
                      <UserAddOutlined onClick={() => showModal(event)} />
                    ) : (
                      <CheckCircleOutlined style={{ color: "green" }} onClick={() => showModalDesadherir(event)} />
                    )}
                  </Tooltip>
                ),
              ]}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <h2 style={{ color: "#1890ff" }}>{event.name}</h2>
                <h3>{event.type_event}</h3>
                <p>
                  {moment(event.startDate).format('DD/MM/YYYY')} - {moment(event.endDate).format('DD/MM/YYYY')}
                  <p>{eventStatus}</p>
                </p>
              </div>
            </Card>
          );
        })}

      </div>
        <FloatButton
          icon={<FolderAddOutlined />}
          type="primary"
          tooltip="Agregar una evento"
          onClick={() => showDrawer(<FormCreateEvent handleVolver={handleVolver} handleSubmit={handleSubmit} />, "Agregar un nuevo evento")}
        />

      <Drawer
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
  );
}
