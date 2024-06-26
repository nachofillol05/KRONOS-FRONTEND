import React, { useState, useEffect, useRef } from 'react';
import Table from '../../components/table/tables.jsx';
import Buscador from '../../components/buscador/buscador.jsx';
import Button from '../../components/button/buttons.jsx';
import Input from "../../components/input/inputs.jsx";
import Switcher from '../../components/switcher/switchers.jsx';
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
                <Switcher onClick={buttonSelected} activeButton={activeButton} />
                <Buscador datos={teachers} agrupacion="last_name" extra="first_name" label="Busca un profesor" />
                <Lateral
                    botones={[
                        {
                            solid: true,
                            icono: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24px"
                                    height="24px"
                                    fill="#0E4942"
                                >
                                    <path d="M 10 3 L 10 8 L 4 8 L 4 20 L 20 20 L 20 8 L 14 8 L 14 3 Z M 12 5 L 13 5 L 13 8 L 11 8 L 11 5 Z M 6 10 L 18 10 L 18 18 L 6 18 Z" />
                                </svg>
                            ),
                            function: () =>
                                handleOpenDrawer(
                                    <div className="contactar">
                                        <div className="identidad">
                                            <h1>Pepe Daniel Lazaro vashesian</h1>
                                            <h2>25167856</h2>
                                        </div>
                                        <form className="email">
                                            <label>
                                                Email: <span>aguchealezama@gmail.com</span>
                                            </label>
                                            <Input
                                                required
                                                label="Asunto"
                                                placeholder="Siguiente acto"
                                                numero={35}
                                                inputRef={asuntoRef}
                                            />
                                            <Input
                                                label="Contenido"
                                                placeholder="El acto de la siguiente fecha"
                                                numero={35}
                                                textArea
                                                inputRef={contenidoRef}
                                            />
                                            <Button life text="Enviar" onClick={handleEnviar} />
                                        </form>
                                    </div>,
                                    'Contactar personal'
                                ),
                        },
                    ]}
                />
            </div>

            <Table data={teachers} columns={columns} />
        </React.StrictMode>
    );
}
