import React, { useState, useEffect, useRef } from 'react';
import "./personal.scss";
import { Table, Select, AutoComplete, FloatButton, Drawer, Radio, Form, Space, Input, Button, Flex, message } from "antd";
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
    

    const handleVolver = () => {
        showDrawer(
            <FormSearchDni handleSearch={handleSearch} />,
            'Buscar personal'
        );
    };
    
    const handleAgregar = () => {
        console.log('Agregar');
    };
    
    const handleContactar = () => {
        showDrawer(
            <ContacWorker handleVolver={handleVolver} />, // Aquí pones el nuevo componente del drawer que crearás luego
            'Contactar personal'
        );
    };

    const showInfoWorker = () => {
        showDrawer(
            <InfoWorker 
                handleVolver={handleVolver} 
                handleAgregar={handleAgregar} 
                handleContactar={handleContactar} 
            />,
            'Información del Trabajador'
        );
    };
    

    const handleSearch = (formRef) => {
        formRef.current.validateFields()
            .then(values => {
                console.log('Values:', values);
                showDrawer(
                    <FormCreateWorker handleSubmit={handleSubmit} handleVolver={handleVolver} />,
                    'Agregar Personal'
                );
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

    const handleSubmit = (form) => {
        form.validateFields()
            .then(values => {
                console.log('Formulario completado:', values);
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
        const fetchTeachers = async () => {
            setLoading(true);
            try {
                const url = new URL('http://127.0.0.1:8000/api/teachers/');
                if (searchName) {
                    url.searchParams.append('search_name', searchName);
                }
                if (subject) {
                    url.searchParams.append('subject_id', subject);
                }
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authorization token found');
                }
                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + token,
                        'School-ID': '1', // Ensure School-ID is correctly formatted as string
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setTeachers([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };
    
        fetchTeachers();
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
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/subjects/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'School-ID': 2,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const subjectsData = data.map(subject => ({
                    value: subject.id,
                    label: subject.name,
                }));
                subjectsData.push({ value: '', label: 'Todas' });
                setSubjects(subjectsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setSubjects([]); // Set empty array on error
            }
        };
    
        fetchSubjects();
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
    style={{ width: 200 }}
    showSearch
    placeholder="Seleccione una materia"
    options={subjects}
    onChange={onChange}
    onSearch={onSearch}
/>

<AutoComplete
    size='large'
    style={{ width: 300 }}
    options={teachers.map(teacher => ({
        value: `${teacher.first_name} ${teacher.last_name}`
    }))}
    placeholder="Buscar personal"
    filterOption={(inputValue, option) =>
        option.value.toUpperCase().includes(inputValue.toUpperCase())
    }
/>


            </div>
            <Table
    dataSource={teachers.map(teacher => ({ ...teacher, key: teacher.id }))}
    columns={columns}
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
                        <FormSearchDni handleSearch={showInfoWorker} />,
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

        </>
    );
}
