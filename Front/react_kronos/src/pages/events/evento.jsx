import { useState, useEffect } from "react";
import { Select, DatePicker, Spin, Drawer, Card, Button, FloatButton, message, Tooltip, Modal, Input, Theme } from "antd";
import { InfoCircleOutlined, SearchOutlined, CheckCircleOutlined, UserAddOutlined, CloseOutlined, DownOutlined, UpOutlined, FolderAddOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import FormCreateEvent from "./formCreateEvent";
import { fetchProfile } from "../../services/users"
import { fetchTypesEvent, fetchEvents, affiliateEvent, desaffiliateEvent, createEvent } from "../../services/events"
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
  const today = moment.utc().startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
  const [recargar, setRecargar] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageConfig, setMessageConfig] = useState({ type: '', content: '' });
  const [nombre, setNombre] = useState([]);
  const [tipoEvento, setTipoEvento] = useState([]);
  const [date, setDate] = useState('');
  const [eventos, setEventos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    const getTypesEvent = async () => {
      try {
        const data = await fetchTypesEvent();
        const dataConvert = data.map(tipo => ({
          value: tipo.id,
          label: tipo.name,
        }));
        setTipos(dataConvert);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const getProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching data:", error.data);
      }
    }

    getProfile();
    getTypesEvent();
  }, []);



  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents(
          sessionStorage.getItem('rol'),
          date,
          tipoEvento,
          nombre
        );
        setEventos(data);
      } catch (error) {
        setEventos([]);
        showMessage('error', 'No hay eventos que cumplan los requerimientos');
        console.error("Error fetching data:", error.data);
      } finally {
        setLoading(false);
      }
    }

    getEvents();
  }, [date, nombre, tipoEvento, isModalOpen, open, recargar]);


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

  const showModalDesadherir = (evento, botonAdherido) => {
    
    if (!botonAdherido) {
      Modal.info({
        title: 'cancelar adición',
        content: (
          <p>¿Seguro que quieres Salirte del evento "<b>{evento.name}</b>"?</p>
        ),
        onOk: () => handleOkDesadherir(evento),
        closable: true,
        okText: 'Si, quiero desadherirme',
      });
    }
  };

  const handleOkDesadherir = async (evento) => {
    console.log(evento.id)
    try {
      const data = await desaffiliateEvent(evento.id);
      showMessage("success", "Desadherido al evento correctamente");
      setRecargar(!recargar);
    } catch (error) {
      showMessage("error", "Error al deshaderirse al evento");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleOk = async (evento) => {
    try {
      const data = await affiliateEvent(evento.id);
      showMessage("success", "Adherido al evento correctamente");
      setRecargar(!recargar);
    } catch (error) {
      showMessage("error", "Error al adherirse al evento");
    } finally {
      setIsModalOpen(false);
    }
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

  const closeDrawerCreate = () => {
    setOpen(false);
    showMessage("success", "Evento creado correctamente");
    setDrawerContent(null);
  }

  const handleSubmit = async (values) => {
    const body = {
      name: values.nombre,
      description: values.descripcion,
      startDate: formatDate(values.dates[0].toDate()),
      endDate: formatDate(values.dates[1].toDate()),
      eventType: values.tipoEvento,
      roles: values.Rolesdirigido,
      affiliated_teachers: [],
    };
    try {
      const data = await createEvent(body);
      closeDrawerCreate();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.data);
    }
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
    setDate(encodeURIComponent(dateString))
  }

  return (
    (isLoading ?
      <div className="spinner-container">
        <Spin size="large" />
      </div>
      :
      <>
        {contextHolder}
        <div className="contenedor-filtros contenedor-filtros-eventos">
          <Select
            size="large"
            style={{
              width: 200,
            }}
            options={tipos}
            onChange={onChange}
            showSearch
            placeholder="Tipo de evento"
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
          />

          <Input
            suffix={
              <SearchOutlined
                style={{
                  color: 'rgba(0,0,0,.45)',
                }}
              />
            }
            size="large"
            style={{
              width: 300,
            }}
            placeholder="Buscar Evento"
            onChange={onChangeNombre}
            allowClear
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 15,
            padding: 15,
            height: "86.5vh",
            overflowY: "scroll",
            backgroundColor: "#f1f2f4",
            boxShadow: "0 0 0 3px #dddcdc",
          }}
        >
          {eventos.map((event) => {
            const eventStatus = (() => {
              const eventStartDate = moment(event.startDate).utc().format('YYYY-MM-DD');
              const eventEndDate = moment(event.endDate).utc().format('YYYY-MM-DD');
              const todayDate = moment(today).utc().format('YYYY-MM-DD');

              if (eventEndDate < todayDate) {
                return "Finalizado";
              } else if (eventStartDate > todayDate) {
                return "Pendiente";
              } else {
                return "En curso";
              }
            })();

            let botonAdherido = false;
            const isUserAffiliated = event.affiliated_teachers.some(teacher => teacher.id === profileData.id);
            const roles = event.roles.map(role => role.name);
            const rol = sessionStorage.getItem('rol');
            const mostrar = (() => {
              if (eventStatus === "Pendiente" && !isUserAffiliated && roles.includes(rol)) {
                return "Adherirse al evento";
              }
              if (eventStatus === "Pendiente" && isUserAffiliated && roles.includes(rol)) {
                return "Ya estás adherido";
              }
              if ((eventStatus === "Finalizado" || eventStatus === "En curso") && !isUserAffiliated) {
                return "";
              }
              if ((eventStatus === "Finalizado" || eventStatus === "En curso") && isUserAffiliated) {
                botonAdherido = true;
                return "Ya estás adherido";
              }
            })();
            const closeDrawer = () => {
              setOpen(false);
              showMessage("success", "Evento actualizado correctamente");
              setDrawerContent(null);
            }
            const closeDrawerDelete = () => {
              setOpen(false);
              showMessage("success", "Evento borrado correctamente");
              setDrawerContent(null);
            }
            const showError = () => {
              showMessage("error", "Fallo la actualización");
            }


            return (
              <Card
                key={event.id}
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-between",
                  height: "fit-content",
                  height: "250px",
                  filter: eventStatus === "Finalizado" ? "grayscale(100%) brightness(0.8)" : "grayscale(0%)",
                }}
                bordered
                hoverable={eventStatus !== "Finalizado"}

                actions={[
                  <Tooltip title="Detalles del evento" style={{
                    opacity: eventStatus === "Finalizado" ? 0.9 : 1,
                    backgroundColor: eventStatus === "Finalizado" ? "#f1f2f4" : "white"
                  }}  >

                    <InfoCircleOutlined
                      key="details"
                      onClick={() => showDrawer(<InfoEvent estado={eventStatus} event={event} typeEvent={tipos} closeDrawer={closeDrawer} closeDrawerDelete={closeDrawerDelete} showError={showError} />, "Detalles del evento")}
                    />
                  </Tooltip>,

                  mostrar && (
                    <Tooltip
                      style={{
                        opacity: eventStatus === "Finalizado" ? 0.9 : 1,
                        backgroundColor: eventStatus === "Finalizado" ? "#f1f2f4" : "white"
                      }}
                      title={mostrar}
                      key="action"
                    >

                      {mostrar === "Adherirse al evento" ? (
                        <UserAddOutlined onClick={() => showModal(event)} />
                      ) : (
                        <CheckCircleOutlined style={{ color: "green" }} onClick={() => showModalDesadherir(event, botonAdherido)} />
                      )}
                    </Tooltip>
                  ),
                ]}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                  <h6 style={{ color: 333, margin: 0 }}>{event.name}</h6>
                  <p style={{ margin: 0 }}>
                    <p style={{ margin: 0 }}>{event.eventType.name}</p>
                    {moment.utc(event.startDate).format('DD/MM/YYYY')} - {moment.utc(event.endDate).format('DD/MM/YYYY')}
                    <p style={{ margin: 0 }}>{eventStatus}</p>
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {sessionStorage.getItem('rol') === 'Directivo' ? (
          <>
            <FloatButton
              icon={<FolderAddOutlined />}
              type="primary"
              tooltip="Agregar una evento"
              onClick={() => showDrawer(<FormCreateEvent handleVolver={handleVolver} handleSubmit={handleSubmit} />, "Agregar un nuevo evento")}
            />
          </>) : null}
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
    )
  );
}
