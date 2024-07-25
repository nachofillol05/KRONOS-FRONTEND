import React, { useState, useEffect, useRef } from 'react';
import "./personal.scss";
import { Table, Select, AutoComplete, FloatButton, Drawer, Radio, Form, Space, Input, Button, Flex, message } from "antd";
import { UsergroupAddOutlined, DownOutlined, UpOutlined, DownloadOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';

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
    const formRef = useRef(null); // Referencia al formulario
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [messageConfig, setMessageConfig] = useState({ type: '', content: '' });

    useEffect(() => {
        if (messageConfig.type) {
            // Mostrar el mensaje basado en la configuración
            showMessage(messageConfig.type, messageConfig.content);
            // Resetear la configuración del mensaje después de mostrarlo
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

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                console.log('Formulario completado:', values);
                onClose();
            })
            .catch(errorInfo => {
                // Configurar el mensaje de error
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

    const Buscar = (content) => {
        setLoading(true);
        setDrawerContent(content);
        setLoading(false);
    };

    const handleSearch = () => {
        // Verificar si los campos están llenos antes de buscar
        formRef.current.validateFields().then(values => {
            console.log('Values:', values);
            Buscar(
                <Form form={form} layout="vertical">
                    <Flex gap={10}>
                        <Form.Item
                            style={{ flexGrow: 1 }}
                            name="nombre"
                            label="Nombre"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el nombre',
                                },
                            ]}
                        >
                            <Input size='large' autoSize={true} placeholder="Ingrese el nombre de la persona" />
                        </Form.Item>
                        <Form.Item
                            style={{ flex: '1 1 auto' }}
                            name="apellido"
                            label="Apellido"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el apellido de la persona',
                                },
                            ]}
                        >
                            <Input size='large' autoSize placeholder="Ingrese el apellido de la persona" />
                        </Form.Item>
                    </Flex>
                    <Flex gap={10}>
                        <Form.Item
                            style={{ flex: '1 1 auto' }}
                            name="telefono"
                            label="Número de teléfono"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el número de teléfono',
                                },
                            ]}
                        >
                            <Input size='large' type='number' autoSize={true} placeholder="Ingrese el número de teléfono" />
                        </Form.Item>
                        <Form.Item
                            style={{ flex: '1 1 auto' }}
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el email de la persona',
                                },
                            ]}
                        >
                            <Input size='large' type='email' autoSize placeholder="Ingrese el email" />
                        </Form.Item>
                    </Flex>
                    <Form.Item >
                        <Flex justify='flex-end'>
                            <Button size='large' type="primary" onClick={handleSubmit}>Submit</Button>
                        </Flex>
                    </Form.Item>

                </Form>
                , 'Agregar una materia'
            );
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
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
                        <Form form={form} ref={formRef} layout="vertical" hideRequiredMark>
                            <Space.Compact>
                                <Form.Item
                                    initialValue={1} // Establece un valor predeterminado
                                    style={{ width: '30%' }}
                                    name="tipoDni"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor ingrese el tipo de documento',
                                        },
                                    ]}
                                >
                                    <Select
                                        size='large'
                                        defaultValue={1}
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        options={[{ 'label': 'DNI', 'value': 1 }, { 'label': 'Pasaporte', 'value': 2 }, { 'label': 'Carnet Extranjería', 'value': 3 }]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '60%' }}
                                    name="documento"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor ingrese el documento',
                                        },
                                    ]}
                                >
                                    <Input size='large' type="number" autoSize={true} placeholder="Documento" />
                                </Form.Item>
                                <Button
                                    style={{ width: '10%' }}
                                    size='large'
                                    onClick={handleSearch}
                                    type="primary"
                                    icon={<SearchOutlined />}
                                />
                            </Space.Compact>
                        </Form>,
                        'Agregar Personal'
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
                    <Button onClick={onClose} type='primary' icon={<CloseOutlined />} />
                }
            >
                <div style={{ width: '100%', height: '100%' }}>
                    {drawerContent}
                </div>
            </Drawer>
        </>
    );
}
