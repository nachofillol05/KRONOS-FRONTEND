import { useState, useEffect } from "react";
import { Select, DatePicker, AutoComplete, Drawer, Card, Button, FloatButton, message, Tooltip, Modal } from "antd";
import { InfoCircleOutlined, EditOutlined, UserAddOutlined, CloseOutlined, DownOutlined, UpOutlined, FolderAddOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import FormEvent from "./formCreateEvent";
import InfoEvent from "./infoEvent";
import "./events.scss";
const dateFormat = 'YYYY/MM/DD';

const data_events = [
  {
    id: 1,
    title: "Paro de transporte",
    description: "Paro de la empresa ERSA en la ciudad de Córdoba",
    type_event: {
      id: 1,
      name: "Paro",
      description: "Paro de la empresa ERSA en la ciudad de Córdoba",
    },
    start_date: "2024/08/01",
    end_date: "2024/08/02",
  },
  {
    id: 2,
    title: "Concierto de Rock",
    description: "Concierto de la banda Los Piojos en el estadio Mario Alberto Kempes",
    type_event: {
      id: 1,
      name: "Paro",
      description: "Paro de la empresa ERSA en la ciudad de Córdoba",
    },
    start_date: "2024/08/05",
    end_date: "2024/08/05",
  },
  {
    id: 3,
    title: "Maratón de Córdoba",
    description: "Maratón anual en el centro de la ciudad",
    type_event: {
      id: 3,
      name: "Deporte",
      description: "Maratón anual en el centro de la ciudad",
    },
    start_date: "2024/08/10",
    end_date: "2024/08/10",
  },
  {
    id: 4,
    title: "Feria de Tecnología",
    description: "Feria de tecnología y startups en el predio ferial",
    type_event: {
      id: 3,
      name: "Deporte",
      description: "Maratón anual en el centro de la ciudad",
    },
    start_date: "2024/08/15",
    end_date: "2024/08/17",
  },
  {
    id: 5,
    title: "Taller de cocina",
    description: "Taller de cocina saludable en el parque Sarmiento",
    type_event: "Taller",
    start_date: "2024/08/20",
    end_date: "2024/08/20",
  },
  {
    id: 6,
    title: "Exposición de arte",
    description: "Exposición de arte contemporáneo en el museo Caraffa",
    type_event: "Exposición",
    start_date: "2024/08/25",
    end_date: "2024/08/30",
  },
  {
    id: 7,
    title: "Carrera de autos",
    description: "Carrera de autos en el autódromo Oscar Cabalén",
    type_event: "Carrera",
    start_date: "2024/09/01",
    end_date: "2024/09/01",
  },
  {
    id: 8,
    title: "Festival de Jazz",
    description: "Festival de Jazz en la Plaza de la Música",
    type_event: "Festival",
    start_date: "2024/09/05",
    end_date: "2024/09/07",
  },
  {
    id: 9,
    title: "Curso de fotografía",
    description: "Curso intensivo de fotografía en el centro cultural",
    type_event: "Curso",
    start_date: "2024/09/10",
    end_date: "2024/09/12",
  },
  {
    id: 10,
    title: "Competencia de robótica",
    description: "Competencia de robótica en la facultad de ingeniería",
    type_event: "Competencia",
    start_date: "2024/09/15",
    end_date: "2024/09/16",
  },
];

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

  useEffect(() => {
    if (messageConfig.type) {
        showMessage(messageConfig.type, messageConfig.content);
        setMessageConfig({ type: '', content: '' });
    }
  }, [messageConfig]);

  const showModal = (nombreEvento) => {
    Modal.info({
      title:'Confirmar adicion',
      content: (
        <p>¿Seguro que quieres aderirte al evento "<b>{nombreEvento}</b>"?</p>
      ),
      onOk: handleOk,
      closable: true,
      okText: 'Si, quiero aderirme',

    });
  };

  const handleOk = () => {
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

  const handleSubmit = (form) => {
    form.validateFields()
        .then(values => {
            console.log('Formulario completado:', values);
            onClose();
        })
        .catch(errorInfo => {
            showMessage('error', 'Por favor, complete todos los campos.');
        });
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

  useEffect(() => {
    setEvents(data_events);
  }, []);

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

  return (
    <>
      {contextHolder}
      <div className="filtros-container">
        <Select
          size="large"
          style={{
            width: 200,
          }}
          showSearch
          placeholder="Seleccione un curso"
        />

        <DatePicker
          size="large"
          style={{
            width: 200,
          }}
          format={dateFormat}
        />

        <AutoComplete
          size="large"
          style={{
            width: 300,
          }}
          placeholder="Buscar Materia"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
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
        {events.map((event) => (
          <Card
            key={event.id}
            style={{
              width: "25%",
              minWidth: 300,
              display: "flex",
              flexFlow: "column",
            }}
            hoverable
            actions={[
              <Tooltip title="Detelles del evento">
                <InfoCircleOutlined 
                  key="details" 
                  onClick={() => showDrawer(<InfoEvent event={event} />, "Detalles del evento")} 
                />
              </Tooltip>,
              <Tooltip title="Editar el evento">
                <EditOutlined key="setting" />
              </Tooltip>,
              <Tooltip title="Aderirse al evento">
                <UserAddOutlined 
                  key="add" 
                  onClick={() => showModal(event.title)} 
                />
              </Tooltip>,
            ]}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <h2 style={{ color: "#1890ff" }}>{event.title}</h2>
              <h3>{event.type_event.name}</h3>
              <p>
                {event.start_date} - {event.end_date}
              </p>
              {new Date(event.end_date) < today && (
                <h4 style={{ color: "red" }}>Evento Terminado</h4>
              )}
              <p>{event.description}</p>
            </div>
          </Card>
        ))}
      </div>
      <FloatButton.Group
        visibilityHeight={1500}
        trigger="click"
        type="primary"
        closeIcon={<DownOutlined />}
        icon={<UpOutlined />}
      >
        <FloatButton
          icon={<FolderAddOutlined />}
          type="primary"
          tooltip="Agregar una evento"
          onClick={() => showDrawer(<FormEvent handleVolver={handleVolver} handleSubmit={handleSubmit} />, "Agregar un nuevo evento")}
        />
      </FloatButton.Group>

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
