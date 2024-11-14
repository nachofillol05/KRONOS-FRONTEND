import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Input, Space, Upload, message, Spin, Flex, Modal, Checkbox, Alert, Tooltip } from 'antd';
import DropTable from '../../components/filterDropTable/FilterDropTable';
import { SearchOutlined, UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRef } from 'react';

export default function FormSearchDni({ handleSearch }) {
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const [defaultTipoDocumento, setDefaultTipoDocumento] = useState(1);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);
    const [createdPersonals, setCreatedPersonals] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [courses, setCourse] = useState([]);
    const [inputType, setInputType] = useState('number'); // Estado para el tipo del campo


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/documentTypes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
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
                setCourse(courses);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

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
                    const createdPersonals = [];
                    data.results.forEach(result => {
                        if (Array.isArray(result.Response)) {
                            if (result.Response[0]) {
                                console.log('Personal creado:', result);
                                //message.success(`Se creó el personal con el documento: ${result.Documento}`);
                                createdPersonals.push(`${result.Documento} - ${result.Response[1].first_name} ${result.Response[1].last_name}`);
                            } else {
                                message.error(`No se creó el documento: ${result.Documento} por DNI o Mail repetido`);
                            }
                        } else {
                            message.error(`Documento: ${result.Documento}, Error al intentar crear el personal`);
                        }
                    });
                    // Aquí puedes actualizar el estado con la lista de documentos creados
                    setCreatedPersonals(createdPersonals);
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
    const handleCheckboxChange = (checkedValues) => {
        setSelectedRoles(checkedValues); // Actualiza el estado cuando cambian los checkboxes
    };
    const onChangeCurso = () => {
        console.log("cambio")
    }

    const handleTipoDocumentoChange = (value) => {
        console.log("aaaaaaaaaaa");
        if (value === 8) {
            setInputType('text');
            console.log(inputType);

        } else {
            setInputType('number');
            console.log(inputType);
        }
        form.setFieldsValue({ tipoDocumento: value });
    };

    
    

    console.log(createdPersonals);
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
    onChange={handleTipoDocumentoChange} // Llama a la función en cada cambio
/>


                    </Form.Item>

                    <Form.Item // Input field documento
                        style={{ width: '60%' }}
                        name="documento"
                        rules={[
                            { required: true, message: 'Ingrese un documento válido.', min: 8 },
                        ]}
                    >
<Input
    size='large'
    type={inputType} // Usa el estado inputType para el tipo de campo
    autoSize={true}
    placeholder="Documento"
    suffix={
        <Tooltip arrow={false} title="Si se ingresa un documento nuevo, se creará un nuevo personal">
            <InfoCircleOutlined style={{ color: 'gray' }} />
        </Tooltip>
    }
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
                <div>
                    <br />
                    <h3>Personales creados:</h3>
                    <ul>
                        {createdPersonals.map((personal, index) => (
                            <li key={index}>
                                {personal}
                                <Button
                                    style={{ marginLeft: '10px' }}
                                    type="primary"
                                    onClick={() => setIsModalVisible(true)}
                                >
                                    Asignar rol
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                okText="Asignar"
                //onOk={handleAgregar}
                cancelText="Cancelar"
                title='Asigna un rol al trabajador'
                okButtonProps={{ disabled: selectedRoles.length === 0 }} // Deshabilita si no hay roles seleccionados
            >
                <p>
                    Por favor seleccione el rol o los roles que se le asignarán
                </p>

                <Checkbox.Group
                    style={{ width: '100%', paddingTop: 20 }}
                    onChange={handleCheckboxChange}
                >
                    <Flex gap={30}>
                        <Checkbox key={'Profesor'} value="Profesor">Profesor</Checkbox>{/*Esto no anda ver como aplicarlo*/}
                        <Checkbox key={'Preceptor'} value="Preceptor">Preceptor</Checkbox>{/*Esto no anda ver como aplicarlo*/}
                        <Checkbox key={'Directivo'} value="Directivo">Directivo</Checkbox>
                    </Flex>
                </Checkbox.Group>

                {selectedRoles.includes("Directivo") && (
                    <div style={{ marginTop: '20px', width: '80%' }}>
                        <p style={{ color: 'red' }}>Si le asignas el rol directivo, tendrá acceso a la lectura y modificación de toda la información del colegio.</p>
                    </div>
                )}

                {selectedRoles.includes("Preceptor") && (
                    <div style={{ marginTop: '20px', width: '80%' }}>
                        <DropTable options={courses} onChange={onChangeCurso} placeholder='Curso del preceptor' />
                    </div>
                )}
            </Modal>

        </Spin>
    );
}
