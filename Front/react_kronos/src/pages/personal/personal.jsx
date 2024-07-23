import React, { useState, useEffect, useRef } from 'react';
import './personal.scss';
import { Table, Select, AutoComplete, FloatButton, Drawer, Radio } from "antd";
import { UsergroupAddOutlined, DownOutlined, UpOutlined, DownloadOutlined } from '@ant-design/icons';
export default function Personal({ handleOpenDrawer, handleCloseDrawer }) {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [activeButton, setActiveButton] = useState('Profesores');
    const [searchName, setSearchName] = useState('');
    const [subject, setSubject] = useState('');
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

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
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
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [searchName, subject]);

    const columns = [
        { header: 'Nombre', field: 'first_name', flex: 1 },
        { header: 'Apellido', field: 'last_name', flex: 1 },
        { header: 'Documento', field: 'document', flex: 1 },
        { header: 'Genero', field: 'gender', flex: 1 },
        { header: 'Email', field: 'email', flex: 1 },
        { header: 'Horas por semana', field: 'availability', flex: 1 },
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
                    id: subject.id,
                    name: subject.name,
                }));
                setSubjects(subjectsData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const buttonSelected = (buttonText) => {
        setActiveButton(buttonText);
    };

    const handleSearch = (searchText) => {
        setSearchName(searchText);
    };

    const handleSelectChange = (event) => {
        setSubject(event.target.value);
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
            </div>

            <Table dataSource={teachers} columns={columns}
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
