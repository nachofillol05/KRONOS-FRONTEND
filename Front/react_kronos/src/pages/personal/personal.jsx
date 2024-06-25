import React, { useState, useEffect } from 'react';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/selects.jsx';
import Buscador from '../../components/buscador/buscador.jsx';
import Button from '../../components/button/buttons.jsx';
import Input from "../../components/input/inputs.jsx";
import Drawer from '../../components/drawer/drawers.jsx';
import Switcher from '../../components/switcher/switchers.jsx';
import './personal.scss';
import Lateral from '../../components/lateral/laterals.jsx';

export default function Personal(handleOpenDrawer, handleCloseDrawer) {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('Profesores');
    const [searchName, setSearchName] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        const url = new URL('http://127.0.0.1:8000/api/teachers/');
        if (searchName) {
            url.searchParams.append('search_name', searchName);
        }
        if (subject) {
            url.searchParams.append('subject_id', subject);
        }
        fetch(url.toString(), {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 1,
            },
        })
            .then(response => {
                if (!response.ok) {
                    setTeachers([]);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTeachers(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [searchName, subject]);

    const columns = [
        { header: 'Nombre', field: 'first_name' },
        { header: 'Apellido', field: 'last_name' },
        { header: 'Documento', field: 'document' },
        { header: 'Genero', field: 'gender' },
        { header: 'Email', field: 'email' },
        { header: 'Horas por semana', field: 'availability' }
    ];

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/subjects/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 1,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const SubjectsData = data.map(subject => ({
                    id: subject.id,
                    name: subject.name,
                }));
                setSubjects(SubjectsData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const buttonSelected = (buttonText) => {
        setActiveButton(buttonText);
    };

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSearch = (searchText) => {
        setSearchName(searchText);
    };

    const handleSelectChange = (selectedId) => {
        setSubject(selectedId);
    };

    const tipoDocumento = ['DNI', 'Pasaporte'];
    const rol = ['Profesor', 'Preceptor', 'Directivo'];

    return (
        <React.StrictMode>
            <div className="filtros-container">
                <div className="switch">
                    <Button
                        text="Profesores"
                        life={activeButton === 'Profesores'}
                        onClick={() => buttonSelected('Profesores')}
                    />
                    <Button
                        text="Preceptores"
                        life={activeButton === 'Preceptores'}
                        onClick={() => buttonSelected('Preceptores')}
                    />
                    <Button
                        text="Directivos"
                        life={activeButton === 'Directivos'}
                        onClick={() => buttonSelected('Directivos')}
                    />
                </div>
                <Select datos={subjects} name="Materia" style={{ '--largo': `50` }} onChange={handleSelectChange} />
                <Buscador onSearch={handleSearch} />
                <div>
                    <Button onClick={() => handleOpenDrawer(
                        <div>
                            <div className='Contenedor' style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                                <Select datos={tipoDocumento} name="Tipo Documento" style={{ '--largo': `60` }} solid />
                                <Input />
                                <Button id="botonCircular" text={
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M10 2a8 8 0 1 0 5.3 14.3l4.6 4.6 1.4-1.4-4.6-4.6A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                                    </svg>}
                                    numero={20} circular
                                />
                            </div>
                            <div>
                                <h1>Nombre</h1>
                                <Input />
                            </div>
                            <div>
                                <h1>Apellido</h1>
                                <Input />
                            </div>
                            <div>
                                <h1>Telefono</h1>
                                <Input />
                            </div>
                            <div>
                                <h1>Email</h1>
                                <Input />
                            </div>
                            <div className='Contenedor' style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <Select datos={rol} name="Rol" largo="345" solid />
                            </div>
                        </div>
                    )} text='+' numero={10} />
                </div>
            </div>
            <div className="tabla-container">
                <Table data={teachers} columns={columns} />
            </div>

        </React.StrictMode>
    )
}




/*{isModalOpen && <Drawer onClose={handleCloseModal} title="Crear Curso">
            <div>
                <h1>Nombre</h1>
                <Input />
            </div>
            <div Class='Contenedor' style={{display: 'flex',flexDirection: 'row', gap: '20px'}}>

                    <h1>Año</h1>
                    <Select datos={anios} name="Año" style={{'--largo': `500`}} solid/>
                    <h1>Curso</h1>
                    <Select datos={cursos} name="Curso" style={{ '--largo': `500` }} solid />
                </div>
                <div>
                    <h1>Descripción</h1>
                    <Input />
                </div>
            </Drawer>}
        </React.StrictMode>
    )
}*/
