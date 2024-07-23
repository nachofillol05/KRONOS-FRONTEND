import React, { useState, useEffect, useRef } from 'react';
import "./personal.scss"
import { Table, Select, AutoComplete, FloatButton, Drawer, Radio } from "antd";
import { UsergroupAddOutlined, DownOutlined, UpOutlined, DownloadOutlined } from '@ant-design/icons';

export default function Personal({ handleOpenDrawer, handleCloseDrawer }) {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [activeButton, setActiveButton] = useState('Profesores');
    const [searchName, setSearchName] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(true);
    const asuntoRef = useRef(null);
    const contenidoRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);

    const showDrawer = (content) => {
        setDrawerContent(content);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setDrawerContent(null);
    };


    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
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

            handleCloseDrawer();
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
                setLoading(false)
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [searchName, subject]);

    const columns = [
        { title: 'Nombre', dataIndex: 'first_name', key: 'Nombre'},
        { title: 'Apellido', dataIndex: 'last_name', key: 'Apellido' },
        { title: 'Documento', dataIndex: 'document', key: 'Documento' },
        { title: 'Genero', dataIndex: 'gender', key: 'Genero' },
        { title: 'Email', dataIndex: 'email', key: 'Email' },
        { title: 'Horas por semana', dataIndex: 'availability', key: 'Horaspsemana'},
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
                subjectsData.push({value: '', label: 'Todas'})
                setSubjects(subjectsData);
                console.log(subjectsData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const buttonSelected = (buttonText) => {
        setActiveButton(buttonText);
    };

    const onSearch = (searchText) => {
        setSearchName(searchText);
        console.log(searchName)
    };

    const handleSelectChange = (event) => {
        setSubject(event.target.value);
    };
    const onChange = (value) => {
        console.log(`selected ${value}`);
        setSubject(value);
    };


    return (
        <React.StrictMode>
            <div className="filtros-container">
                <Radio.Group size='large' defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">Profesor</Radio.Button>
                    <Radio.Button value="b">Preceptor</Radio.Button>
                    <Radio.Button value="c">Directivo</Radio.Button>
                </Radio.Group>
                <Select
                    size='large'
                    showSearch
                    placeholder="Select a person"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                        {
                            value: 'jack',
                            label: 'Jack',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                        {
                            value: 'tom',
                            label: 'Tom',
                        },
                    ]}
                />

                <AutoComplete
                    size='large'
                    style={{
                        width: 200,
                    }}
                    options={teachers}
                    placeholder="try to type `b`"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
                <AutoComplete
                    size='large'
                    style={{
                        width: 200,
                    }}
                    options={teachers}
                    placeholder="try to type b"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>

            <Table dataSource={teachers.map(teacher => ({ ...teacher, key: teacher.id }))}  columns={columns} 
            loading	={loading}
            tableLayout = {'fixed'}
            filterDropdownOpen={true}
            filtered={true}
            />;
            <FloatButton.Group
                visibilityHeight={1500}
                trigger="click"
                type="primary"
                closeIcon={<DownOutlined />}
                icon={<UpOutlined />}
            >
                <FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />
                <FloatButton icon={<UsergroupAddOutlined style={{ fontSize: '30px' }} />} type='primary' tooltip="Agregar personal" onClick={() => showDrawer(<p>Hola mundo cruel</p>)} />
            </FloatButton.Group>

            <Drawer width={600} title="Basic Drawer" onClose={onClose} open={open}>
                <div style={{ width: '100%', height: '100%' }}>
                    {drawerContent}
                </div>
            </Drawer>
        </React.StrictMode>
    );
}
