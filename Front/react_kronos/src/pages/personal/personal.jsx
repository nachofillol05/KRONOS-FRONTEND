import React, { useState, useEffect, useRef } from 'react';
import Buscador from '../../components/buscador/buscador.jsx';
import { Table, Select } from "antd";
import { ToggleButton, ToggleButtonGroup, Button, DataGrid } from '@mui/material';
import './personal.scss';
import Lateral from '../../components/lateral/laterals.jsx';
import Materias from '../materias/materias.jsx';

export default function Personal({ handleOpenDrawer, handleCloseDrawer }) {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [activeButton, setActiveButton] = useState('Profesores');
    const [searchName, setSearchName] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(true);
    const asuntoRef = useRef(null);
    const contenidoRef = useRef(null);

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
                <ToggleButtonGroup
                    value={alignment}
                    color="primary"
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="Profesores">Profesores</ToggleButton>
                    <ToggleButton value="Directivos">Directivos</ToggleButton>
                    <ToggleButton value="Preceptores">Preceptores</ToggleButton>
                </ToggleButtonGroup>
                <Select
                    size='large'
                    showSearch
                    placeholder="Seleccione una materia"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={subjects}
                />
                <Buscador datos={teachers} agrupacion="last_name" extra="first_name" label="Busca un profesor"/>
            </div>

            <Table dataSource={teachers.map(teacher => ({ ...teacher, key: teacher.id }))}  columns={columns} 
            loading	={loading}
            tableLayout = {'fixed'}
            filterDropdownOpen={true}
            filtered={true}
            />;
        </React.StrictMode>
    );
}
