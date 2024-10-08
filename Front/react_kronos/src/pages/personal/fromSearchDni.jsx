import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Input, Space, Upload, message, Spin, Flex } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useRef } from 'react';

export default function FormSearchDni({ handleSearch }) {
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const [defaultTipoDocumento, setDefaultTipoDocumento] = useState(1);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null); 

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/documentTypes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                const datos = data.map((tipo) => ({
                    value: tipo.id,
                    label: tipo.name,
                }));
                setTipoDocumentos(datos);
                setDefaultTipoDocumento(datos[0].value);
                form.setFieldsValue({ tipoDocumento: datos[0].value });
            });
    }, []);

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

    const handleFileChange = (info) => {
        const fileToUpload = info.fileList[0]?.originFileObj;

        if (!fileToUpload) {
            return;  // Detener si no hay archivo
        }

        // Evitar que se suba el mismo archivo más de una vez
        if (fileRef.current && fileRef.current.name === fileToUpload.name) {
            return;
        }

        fileRef.current = fileToUpload; // Guardar referencia del archivo seleccionado

        // Iniciar la carga del archivo de inmediato
        setLoading(true);  // Activar loading al iniciar la carga

        const formData = new FormData();
        formData.append('archivo', fileToUpload);

        fetch('http://127.0.0.1:8000/api/teacher_word/', {
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
            body: formData
        })
        .then(response => {
            setLoading(false);  // Desactivar loading tras la respuesta
            if (response.status === 400) {
                message.error('Error al subir el archivo');
                return;  // Detener si hubo error
            }
            return response.json();
        })
        .then(data => {
            if (data?.results) {
                console.log('Resultados de la subida:', data.results);
                data.results.forEach(result => {
                    if (Array.isArray(result.Response)) {
                        if (result.Response[0]) {
                            message.success(`Se creó el personal con el documento: ${result.Documento}`);
                        } else {
                            message.error(`No se creó el documento: ${result.Documento} por DNI o Mail repetido`);
                        }
                    } else {
                        message.error(`Documento: ${result.Documento}, Error al intentar crear el personal`);
                    }
                });
            } else {
                console.error('Error en la respuesta:', data.error);
                message.error('Error en el procesamiento del archivo.');
            }
        })
        .catch(error => {
            setLoading(false);  // Asegurarse de desactivar loading si hay error
            console.error('Error al subir el archivo:', error);
            message.error('Error al subir el archivo, intente nuevamente.');
        });
    };
    
    

    return (
        <Spin spinning={loading} tip="Creando los personales...">
            <Form form={form} ref={formRef} layout="vertical" hideRequiredMark>
                <Space.Compact>

                    <Form.Item // Dropdown seleccionar tipo DNI
                        style={{ width: '30%' }}
                        name="tipoDocumento"
                    >
                        <Select
                            size="large"
                            value={defaultTipoDocumento} 
                            options={tipoDocumentos}
                        />
                    </Form.Item>

                    <Form.Item // Input field documento
                        style={{ width: '60%' }}
                        name="documento"
                        rules={[
                            {required: true, message: 'Ingrese un documento válido.',min: 8},
                        ]}
                    >
                        <Input 
                            size='large' 
                            type="number" 
                            autoSize={true} 
                            placeholder="Documento"
                        />
                    </Form.Item>

                    <Button // Submit button
                        style={{ width: '10%' }}
                        size='large'
                        onClick={() => handleSearch(formRef, tipoDocumentos)}
                        type="primary"
                        icon={<SearchOutlined />}
                    />
                </Space.Compact>
                <div>
                    <Space.Compact>
                        <h3>Necesita cargar muchos personales?</h3>
                        <Upload 
                        className='upload-profile' 
                        accept=".xlsx, .csv" 
                        onChange={handleFileChange} 
                        maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Subir excel</Button>
                        </Upload>
                    </Space.Compact>
                    
                </div>
                <a onClick={descargarExcel}>Descargar modelo</a>
                
            </Form>
        </Spin>
    );
}
