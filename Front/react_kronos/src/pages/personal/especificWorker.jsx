import React, { useState, useEffect } from "react";
import { Button, Flex, Divider, Col, Row, Tooltip, Image } from "antd";
import {
  RollbackOutlined,
  PlusOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./personal.scss";

export default function Especificworker({ handleVolverInfo, id, onClose }) {
  const [selectedCells, setSelectedCells] = useState([]);
  const [worker, setworker] = useState({});
  const [modulesData, setModulesData] = useState([]);

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/staff/", {
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
        const filteredworker = data.find((worker) => worker.id === id);
        if (filteredworker) {
          setworker(filteredworker);
          console.log(filteredworker);
        } else {
          console.log("worker? not found");
          setworker(null); // O maneja el caso donde no se encuentra el trabajador
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);
  useEffect(() => {
    fetch("http://localhost:8000/api/modules/", {
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

  return (
    <>
      <Flex vertical gap={10}>
        <Flex align="center" gap={30} style={{ width: "70%", height: "50px" }}>
          <label>Foto de perfil:</label>
          <img
            width={50}
            height={50}
            src={worker.profile_picture? worker.profile_picture : "https://via.placeholder.com/150"}
            style={{ borderRadius: "50%" }}
          />
        </Flex>
        <Flex gap={30}>
          <label>
            Nombre: {worker?.first_name} {worker?.last_name}
          </label>
          <label>
            Documento: {worker?.documentType?.name}, {worker?.document}
          </label>
        </Flex>
        <Flex gap={30}>
          <label>Telefono: {worker?.email}</label>
          <label>Email: {worker?.email}</label>
        </Flex>
        <Flex gap={30}>
          <label>Genero: {worker?.gender}</label>
          <label>Nacionalidad: {worker?.nationality?.name}</label>
        </Flex>
        <Flex gap={30}>
          <label>Provincia: {worker?.contactInfo?.province}</label>
          <label>Ciudad: {worker?.contactInfo?.city}</label>
        </Flex>
        <Flex gap={30}>
          <label>Calle: {worker?.contactInfo?.street}</label>
          <label>Numero: {worker?.contactInfo?.streetNumber}</label>
          <label>Codigo postal: {worker?.contactInfo?.postalCode}</label>
        </Flex>
      </Flex>
      <Divider orientation="left">Disponiblidad horaria</Divider>
      <Row>
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
            // Verificar si el módulo está en la disponibilidad del profesor
            const isAvailable = worker?.teacher_availability?.some(
              (availability) =>
                availability.module.moduleNumber === module.moduleNumber &&
                availability.module.day.toLowerCase() === day.toLowerCase()
            );

            return (
              <Col
                style={{
                  width: "95%",
                  paddingInline: 3,
                  marginInline: 'auto',
                  backgroundColor: isAvailable ? "green" : "transparent", // Pintar de verde si está disponible
                }}
                key={`${day}-${module.id}`}
                className="especificWorkerCasilla"
              >
              </Col>
            );
          })}
        </React.Fragment>
      </Col>
    );
  })}
</Row>

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
    </>
  );
}
