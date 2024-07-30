import { useState } from "react";
import { Card, Typography, Tooltip, Drawer } from "antd";
import {
  TeamOutlined,
  SettingFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import FormEvent from "./formEvent";

export default function CardEvent({ event }) {
  const [drawerState, setDrawerState] = useState({
    visible: false,
    title: '',
    content: null,
  });
  const { Title, Paragraph } = Typography;
  const today = new Date();
  const endDate = new Date(event.end_date);
  const isPastEvent = endDate < today;

  const showDrawer = (title, content) => {
    setDrawerState({
      visible: true,
      title: title,
      content: content
    })
  };

  const closeDrawer = () => {
    setDrawerState({
      visible: false,
      title: '',
      content: null,
    })
  };

  const handleAfilliated = (eventId) => {
    alert("Evento " + eventId);
  };

  const content_adheridos = (
    <Title level={4}>Adheridos</Title>
  )

  const actions = [
    <Tooltip title="Adherirse">
      <UserAddOutlined
        key="adherirse"
        onClick={() => {
          handleAfilliated(event.id);
        }}
      />
    </Tooltip>,
    <Tooltip title="Adheridos">
      <TeamOutlined key="adheridos" onClick={() => {showDrawer("Adheridos", content_adheridos)}}/>
    </Tooltip>,
    <Tooltip title="Configurar">
      <SettingFilled key="configurar" onClick={() => {showDrawer("Configurar evento", <FormEvent event={event}/>)}}/>
    </Tooltip>,
  ].filter((action, index) => {
    if (isPastEvent) {
      return index === 1;
    }
    return true;
  });

  return (
    <>
      <Card
        className="event-card"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
        actions={actions}
        hoverable
      >
        <div className="card-content">
          <Title level={4} style={{ color: "#1890ff", marginBottom: "10px" }}>
            {event.title}
          </Title>
          <Paragraph style={{ fontSize: "16px", fontWeight: "bold" }}>
            {event.type_event.name}
          </Paragraph>
          <Paragraph style={{ marginBottom: "10px" }}>
            <strong>Fecha de Inicio:</strong> {event.start_date}
            <br />
            <strong>Fecha de Fin:</strong> {event.end_date}
          </Paragraph>
          {isPastEvent && (
            <Title level={4} type="danger">
              Evento Terminado
            </Title>
          )}

          <Paragraph>{event.description}</Paragraph>
        </div>
      </Card>
      <Drawer 
        title={drawerState.title}
        onClose={closeDrawer} 
        open={drawerState.visible}
        width={500}
      >
        {drawerState.content}
      </Drawer>
    </>
  );
}
