import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Form,
  Select,
  Input,
  Space,
  Upload,
  message,
  Spin,
  Flex,
  Tooltip,
  Alert,
} from "antd";
import { SearchOutlined, UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import AssignmentModal from "./AssignmentModal";

export default function FormSearchDni({ handleSearch }) {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [defaultTipoDocumento, setDefaultTipoDocumento] = useState(1);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const [createdPersonals, setCreatedPersonals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPersonal, setSelectedPersonal] = useState(null);
  const [inputType, setInputType] = useState("number");

  const descargarExcel = () => {
    fetch('http://127.0.0.1:8000/api/teacher_word/', {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'School-ID': sessionStorage.getItem('actual_school'),
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al descargar el archivo: " + response.statusText);
            }
            return response.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Personal_plantilla.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error("Error al descargar el archivo:", error);
        });
};

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/documentTypes/")
      .then((response) => response.json())
      .then((data) => {
        const datos = data.map((tipo) => ({
          value: tipo.id,
          label: tipo.name,
        }));
        setTipoDocumentos(datos);
        setDefaultTipoDocumento(datos[0]?.value || 1);
        form.setFieldsValue({ tipoDocumento: datos[0]?.value });
      });
  }, []);

  const handleTipoDocumentoChange = (value) => {
    setInputType(value === 8 ? "text" : "number");
    form.setFieldsValue({ tipoDocumento: value });
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPersonal(null);
  };

  const handleFileChange = (info) => {
    const fileToUpload = info.fileList[0]?.originFileObj;
    if (!fileToUpload || (fileRef.current && fileRef.current.name === fileToUpload.name)) return;

    fileRef.current = fileToUpload;
    setLoading(true);

    const formData = new FormData();
    formData.append("archivo", fileToUpload);

    fetch("http://127.0.0.1:8000/api/teacher_word/", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "School-ID": sessionStorage.getItem("actual_school"),
      },
      body: formData,
    })
      .then((response) => {
        setLoading(false);
        if (response.status !== 200) throw new Error("Error al subir el archivo");
        return response.json();
      })
      .then((data) => {
        const created = [];
        data.results.forEach((result) => {
          if (Array.isArray(result.Response) && result.Response[0]) {
            created.push({
              deshabilitado: false,
              userData: result.Response[1],
              documento: result.Documento,
              nombre: `${result.Response[1].first_name} ${result.Response[1].last_name}`,
            });
            console.log(result.Response[1])
          } else {
            message.error(`No se creó el documento: ${result.Documento}`);
          }
        });
        setCreatedPersonals(created);
      })
      .catch(() => message.error("Error al subir el archivo."));
  };

  const showModal = (personal) => {
    setSelectedPersonal(personal);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedPersonal(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedPersonal(null);
  };

  return (
    <Spin spinning={loading} tip="Creando los personales...">
      <Form form={form} ref={formRef} layout="vertical" hideRequiredMark>
        <Space.Compact>
          <Form.Item name="tipoDocumento" style={{ width: "30%" }}>
            <Select
              size="large"
              value={defaultTipoDocumento}
              options={tipoDocumentos}
              onChange={handleTipoDocumentoChange}
            />
          </Form.Item>
          <Form.Item
            name="documento"
            style={{ width: "60%" }}
                 rules={[
              { required: true, message: 'Ingrese un documento válido.', min: 8 },
          ]}
          >
            <Input
              size="large"
              type={inputType}
              placeholder="Documento"
              suffix={
                <Tooltip title="Si se ingresa un documento nuevo, se creará un nuevo personal">
                  <InfoCircleOutlined style={{ color: "gray" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Button
            style={{ width: "10%" }}
            size="large"
            onClick={() => handleSearch(formRef, tipoDocumentos)}
            type="primary"
            icon={<SearchOutlined />}
          />
        </Space.Compact>
      </Form>
      <br />
      <Alert
        message="¿Tiene un personal muy extenso?"
        description={
            <Flex>
                <p>
                    Descarga
                    {<Button type='link' onClick={descargarExcel}>esta plantilla,</Button>}
                    completela y subala
                    para el cargado automatico del personal
                </p>
                <Upload
                    className='upload-profile'
                    accept=".xlsx, .csv"
                    onChange={handleFileChange}
                    maxCount={1}
                >
                    <Button type='default' icon={<UploadOutlined />}>Subir Aqui</Button>
                </Upload>
            </Flex>
        }
        type="info"
      />
      {createdPersonals.length > 0 && (
        <div style={{ marginTop: "20px", padding: "10px" }}>
          <h3 style={{ marginBottom: "15px" }}>Personales creados:</h3>
          <Alert
            message="No se vaya sin cargar los roles"
            type="error"
            style={{ marginBottom: "15px" }}
          />
          <div
            style={{
              maxHeight: "300px", // Altura máxima del contenedor
              overflowY: "auto",  // Activar scroll vertical
              paddingRight: "10px", // Espacio para el scroll
              border: "1px solid #d9d9d9", // Opcional: borde para resaltar el área
              borderRadius: "4px", // Opcional: bordes redondeados
            }}
          >
            <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
              {createdPersonals.map((personal, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    padding: "5px 0",
                  }}
                >
                  <span style={{ flex: 1 }}>
                    {personal.documento} - {personal.nombre}
                  </span>
                  <Button
                    style={{ marginLeft: "10px" }}
                    type="primary"
                    onClick={() => showModal(personal)}
                    disabled={personal.deshabilitado}
                  >
                    Asignar rol
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}


      {
        selectedPersonal && (
          <AssignmentModal
            visible={isModalVisible}
            onClose={closeModal}
            user={selectedPersonal?.userData}
            setCreatedPersonals={setCreatedPersonals}
            personal={selectedPersonal}
          />
        )
      }
    </Spin>
  );
}
