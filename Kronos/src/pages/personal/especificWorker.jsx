import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Divider,
  Col,
  Row,
  Tooltip,
  Image,
  message,
  Spin,
  List,
  Card,
  Typography,
  Avatar

} from "antd";
import {
  RollbackOutlined,
  PlusOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./personal.scss";

const { Text, Title } = Typography;

export default function Especificworker({
  handleVolverInfo,
  user,
  onClose,
  rolSeleccionado,
}) {
  const [loading, setLoading] = useState(false);
  const data = user?.subjects
    ? [
        ...new Set(
          user.subjects
            .map((subject) => subject.subject_name)
            .filter((subjectName) => subjectName.trim() !== "")
        ),
      ]
    : [];
  console.log(data);
  console.log(user);
  console.log(rolSeleccionado);
  const [selectedCells, setSelectedCells] = useState([]);
  const [worker, setworker] = useState(user);
  const [modulesData, setModulesData] = useState([]);

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/modules/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
        "School-ID": sessionStorage.getItem("actual_school"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setModulesData(Object.values(data));
        console.log(Object.values(data));
      });
  }, []);

  const EnviarRecordatorio = () => {
    setLoading(true);
    const bodyData = {
      asunto: "Recuerde cargar su disponibilidad horaria",
      contenido: "Un directivo de la institución le recuerda que aún no ha cargado su disponibilidad horaria, intente hacerlo lo antes posible asi podremos asignarle los horarios de sus materias. Saludos. Link: http://localhost:3000/perfil",//CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBIASR DESPUES POR LA URL DEL PROYECTO ENSERIO
      teacher_mail: worker.email, // Cambiamos a un array simple
    };


    fetch(process.env.REACT_APP_API_URL + "/api/contacting-staff/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData), // Usa bodyData aquí
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        message.success("Mail enviado correctamente");
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        onclose();
      });
  };

  console.log(loading);

  return (
    <Spin spinning={loading} tip="Mandando mail de recordatorio...">
      <Card
      title={<Title level={5}>Perfil del Trabajador</Title>}
      bordered
      style={{ maxWidth: 600, margin: "0 auto", borderRadius: 8 }}
    >
      <Row gutter={[16, 16]} align="middle">
        {/* Foto de perfil */}
        <Col span={24} style={{ textAlign: "center" }}>
          <Avatar
            size={100}
            src={
              worker.profile_picture
                ? worker.profile_picture
                : "https://via.placeholder.com/150"
            }
          />
        </Col>
      </Row>
      <Divider />

      {/* Información Personal */}
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Nombre:</Text> {worker?.first_name} {worker?.last_name}
        </Col>
        <Col span={12}>
          <Text strong>{worker?.documentType?.name}: </Text>
            {worker?.document}
        </Col>
      </Row>

      <Divider />

      {/* Contacto */}
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Teléfono:</Text> {worker?.phone}
        </Col>
        <Col span={12}>
          <Text strong>Email:</Text> {worker?.email}
        </Col>
      </Row>

      <Divider />

      {/* Información Adicional */}
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Género:</Text> {worker?.gender}
        </Col>
        <Col span={12}>
          <Text strong>Nacionalidad:</Text> {worker?.nationality?.name}
        </Col>
      </Row>

      <Divider />

      {/* Dirección */}
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Provincia:</Text> {worker?.contactInfo?.province}
        </Col>
        <Col span={12}>
          <Text strong>Ciudad:</Text> {worker?.contactInfo?.city}
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Dirección:</Text> {worker?.contactInfo?.street} {worker?.contactInfo?.streetNumber}
        </Col>
        <Col span={6}>
          <Text strong>Código postal:</Text> {worker?.contactInfo?.postalCode}
        </Col>
      </Row>
    </Card>
      {rolSeleccionado === "Profesores" && (
        <>
          <Divider orientation="left">Disponiblidad horaria</Divider>
          {worker?.availability?.length == 0 && (
            <>
              Aún no cargó su disponibilidad horaria
              <Tooltip title="Se enviará un email al usuario para recordarle">
                <Button
                  size="small"
                  onClick={() => EnviarRecordatorio()}
                  style={{ marginLeft: 8 }}
                >
                  Recordar
                </Button>
              </Tooltip>
            </>
          )}

          <div>
            <Row className="especificWorkerCasilla">
              {days.map((day) => {
                const moduleData = modulesData.filter(
                  (data) => data.day.toLowerCase() === day.toLowerCase()
                );

                return (
                  <Col style={{ flexGrow: 1 }} key={day}>
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                      {day}
                    </Row>
                    <React.Fragment key={day}>
                      {moduleData.map((module) => {
                        console.log(worker.availability);
                        console.log(module);
                        console.log(day);
                        // Verificar si el módulo está en la disponibilidad del profesor
                        const isAvailable = worker?.availability?.some(
                          (availabilityItem) =>
                            availabilityItem.module === module.id &&
                            availabilityItem.state === "Disponible"
                        );
                        const isOcupied = worker?.availability?.some(
                          (availabilityItem) =>
                            availabilityItem.module === module.id &&
                            availabilityItem.state === "Asignado"
                        );

                        return (
                          <Col
                            style={{
                              width: "95%",
                              paddingInline: 3,
                              marginInline: "auto",
                              backgroundColor: isAvailable
                                ? "green"
                                : isOcupied
                                ? "red"
                                : "transparent", // Pintar de verde si está disponible
                            }}
                            key={`${day}-${module.id}`}
                            className="especificWorkerCasilla"
                          ></Col>
                        );
                      })}
                    </React.Fragment>
                  </Col>
                );
              })}
            </Row>
          </div>
          <Divider orientation="left">Materias</Divider>
          {data.length > 0 ? (
            <>
              <List
                size="small"
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </>
          ) : (
            <>No tiene materias asignadas</>
          )}
        </>
      )}
      {worker.years?.length > 0 && rolSeleccionado === "Preceptores" && (
        <>
          <Divider orientation="left">Años</Divider>
          <List
            size="small"
            bordered
            dataSource={worker.years}
            renderItem={(item) => <List.Item>{item.name}</List.Item>}
          />
        </>
      )}

      <br />
      <Flex justify="flex-end" gap={10}>
        <Tooltip label="volver">
          <Button
            size="large"
            iconPosition="end"
            icon={<RollbackOutlined />}
            style={{ width: "100px", marginInline: "20px" }}
            onClick={onClose}
          />
        </Tooltip>
      </Flex>
      <br />
      </Spin>
  );
}
