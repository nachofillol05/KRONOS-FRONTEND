import React, { useState, useEffect, useRef } from 'react';
import Buscador from '../../components/buscador/buscador.jsx';
import { Table } from "antd";
import { ToggleButton, ToggleButtonGroup, Button, DataGrid } from '@mui/material';
import './personal.scss';
import Lateral from '../../components/lateral/laterals.jsx';

export default function Personal({ handleOpenDrawer, handleCloseDrawer }) {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [activeButton, setActiveButton] = useState('Profesores');
    const [searchName, setSearchName] = useState('');
    const [subject, setSubject] = useState('');
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
                <ToggleButtonGroup
                    value={alignment}
                    color="primary"
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="web">Web</ToggleButton>
                    <ToggleButton value="android">Android</ToggleButton>
                    <ToggleButton value="ios">iOS</ToggleButton>
                </ToggleButtonGroup>
                <Buscador datos={teachers} agrupacion="last_name" extra="first_name" label="Busca un profesor" />
            </div>

            <Table dataSource={teachers} columns={columns} 
            loading	={true}
            tableLayout = {'fixed'}
            filterDropdownOpen={true}
            filtered={true}
            />;
        </React.StrictMode>
    );
}
