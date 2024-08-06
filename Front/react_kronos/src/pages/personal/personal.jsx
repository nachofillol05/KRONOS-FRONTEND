import React, { useState, useEffect, useRef } from 'react';
import "./personal.scss";
import { Table, Select, AutoComplete, FloatButton, Drawer, Radio, Form, Space, Input, Button, Flex, message, Modal } from "antd";
import { UsergroupAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import FormSearchDni from './fromSearchDni';
import InfoWorker from './infoWorker';
import FormCreateWorker from './formCreateWorker';
import ContacWorker from './contactWorker';



export default function Personal() {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [activeButton, setActiveButton] = useState('Profesores');
    const [searchName, setSearchName] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);
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
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    

    const handleOk = () => {
        setIsModalVisible(false);
        //hacerle un update a colegio y agregarle a directivos
        //createsuperUser aaaaaaaaaaaaaaaaaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        console.log('Opción Directivo cancelada');
    };

    const handleVolver = () => {
        showDrawer(
            <FormSearchDni handleSearch={handleSearch} />,
            'Buscar personal'
        );
    };
    // agregar como directivo, como preceptor o como profesor
    const handleAgregar = (e) => {
        if (e.key === "Profesor") {
            /*fetch('http://localhost:8000/api/create_tss/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // personal: values.documento,
                }),
            });*/
            
            console.log('Profesor');
        } else if (e.key === "Preceptor") {
            console.log('Preceptor');
        } else if (e.key === "Directivo") {
            console.log('Directivo');
            showModal();
        }
    };
    
    const handleContactar = (user) => {

        showDrawer(
            <ContacWorker user={user} handleVolver={handleVolver} />, 
            'Contactar personal'
        );
    }

    /*const showInfoWorker = (documento) => {
        

        
    };
    */

    const handleSearch = (formRef) => {
        formRef.current.validateFields()
            .then(values => {
                fetch('http://localhost:8000/api/create_teacher/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        document: values.documento,
                    }),
                })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    if (status === 400) { 
                        console.log('Dni encontrado:', body);
                        showDrawer(
                            <InfoWorker 
                                user={body.user}
                                handleVolver={handleVolver} 
                                handleAgregar={handleAgregar} 
                                handleContactar={() => handleContactar(body.user)} 
                            />,
                            'Información del Trabajador'
                        );
                    } else if (status === 200) {
                        console.log('dni no encontrado:', body);
                        showDrawer(
                            <FormCreateWorker 
                                tipoDocumento={values.tipoDni} 
                                documento={values.documento} 
                                handleSubmit={handleSubmit} 
                                handleVolver={handleVolver} 
                            />,
                            'Agregar Personal'
                        );
                    }
                })
                .catch(error => {
                    console.error('Error al realizar la búsqueda:', error);
                });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };
    


    const Buscar = () => {
        setLoading(true);
        if (true) {
            setDrawerContent();
        }

        setLoading(false);
    };

    useEffect(() => {
        if (messageConfig.type) {
            showMessage(messageConfig.type, messageConfig.content);
            setMessageConfig({ type: '', content: '' });
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
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGREGAR QUE CREE UN TEACHER CON LA SCHOOL
    const handleSubmit = (form) => {
        form.validateFields()
            .then(values => {
                console.log('Values:', values);
                console.log('documento:', documento);
                const body = JSON.stringify(
                    {
                        first_name: values.nombre,
                        last_name: values.apellido,
                        document: values.documento,
                        documentType: values.tipoDocumento,
                        email: values.email,
                        phone: values.telefono,
                        username: values.documento,
                    });
                    console.log('Body: ', body);
                console.log('Formulario completado:', body);
                fetch('http://localhost:8000/api/Register/', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'School-ID': 1,
                        'Content-Type': 'application/json'
                    },
                    body: body,
                })
                .then(response => {
                    if (!response.ok) {
                        console.log('Error:', response);
                        throw new Error('Error al crear el personal');
                    }
                    console.log('Response:', response);
                    return response.json();
                })
                setMessageConfig({ type: 'success', content: 'Personal creado con exito' });
                onClose();
            })
            .catch(errorInfo => {
                setMessageConfig({ type: 'error', content: 'Por favor, complete todos los campos.' });
            });
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

    const handleEnviar = (event) => {
        event.preventDefault();
        const asunto = asuntoRef.current.value;
        const contenido = contenidoRef.current.value;
        const emailSpan = document.querySelector('.contactar .email label span');
        const email = emailSpan.textContent;

        if (asunto) {
            const jsonData = JSON.stringify({ email, asunto, contenido });
            console.log('JSON:', jsonData);

            fetch('http://localhost:8000/api/contacting-staff/', {
                method: 'POST',
                body: jsonData,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al enviar los datos.');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Manejar los datos de la respuesta si es necesario
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            onClose();
        }
    };

    useEffect(() => {
        const url = new URL('http://127.0.0.1:8000/api/teachers/');
        if (searchName) {
            url.searchParams.append('search_name', searchName);
        }
        if (subject) {
            url.searchParams.append('subject_id', subject);
        }
        fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 1,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    setTeachers([]);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTeachers(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [searchName, subject]);

    const columns = [
        { title: 'Nombre', dataIndex: 'first_name', key: 'Nombre' },
        { title: 'Apellido', dataIndex: 'last_name', key: 'Apellido' },
        { title: 'Documento', dataIndex: 'document', key: 'Documento' },
        { title: 'Genero', dataIndex: 'gender', key: 'Genero' },
        { title: 'Email', dataIndex: 'email', key: 'Email' },
        { title: 'Horas por semana', dataIndex: 'availability', key: 'Horaspsemana' },
    ];

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/subjects/', {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 1,
            },
        })  
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const subjectsData = data.map((subject) => ({
                    value: subject.id,
                    label: subject.name,
                }));
                subjectsData.push({ value: '', label: 'Todas' });
                setSubjects(subjectsData);
                console.log(subjectsData);
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

    const onChange = (value) => {
        console.log(`selected ${value}`);
        setSubject(value);
    };
    console.log('teacher', teachers)
    return (
        <>
            {contextHolder}
            <div className="filtros-container">
                <Radio.Group size='large' defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">Profesor</Radio.Button>
                    <Radio.Button value="b">Preceptor</Radio.Button>
                    <Radio.Button value="c">Directivo</Radio.Button>
                </Radio.Group>
                <Select
                    size='large'
                    showSearch
                    placeholder="Seleccione una materia"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={subjects}
                />
                <AutoComplete
                    size='large'
                    style={{
                        width: 200,
                    }}
                    options={teachers}
                    placeholder="Buscar personal"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>
<<<<<<< HEAD
            <Table
            pagination={false}
            y={500}
    dataSource={teachers.map(teacher => ({ ...teacher, key: teacher.id }))}
    columns={columns}
    loading={loading}
    tableLayout={'fixed'}
    filterDropdownOpen={true}
    filtered={true}
/>

=======
>>>>>>> aa1813c7520357a390b2c0f8f9b977fc8b9dff76

            <Table dataSource={teachers.map(teacher => ({ ...teacher, key: teacher.id }))} columns={columns}
                loading={loading}
                tableLayout={'fixed'}
                filterDropdownOpen={true}
                filtered={true}
            />
            <FloatButton.Group
                visibilityHeight={1500}
                trigger="click"
                type="primary"
                closeIcon={<DownOutlined />}
                icon={<UpOutlined />}
            >
                <FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />
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
                    <Button onClick={onClose} size='large' type='tertiary' icon={<CloseOutlined />} />
                }
            >
                <div style={{ width: '100%', height: '100%' }}>
                    {drawerContent}
                </div>
            </Drawer>
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Sí" cancelText="No">
                <h1>Advertencia</h1>
                <p>Si lo agregas como directivo podra tener acceso a toda la informacion y modificarla</p>
            </Modal>

        </>
    );
}