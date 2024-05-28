import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/navBars.jsx';
import Fondo from '../../components/fondo/fondos.jsx';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/select.jsx';
import Buscador from '../../components/Buscador/buscador.jsx';
import Button from '../../components/button/buttons.jsx';
import Drawer from '../../layout/drawer/drawers.jsx';
import Input from "../../components/input/inputs.jsx";
import './personal.scss';



export default function Personal() {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/Kronosapp/teachers/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "school_id": 1 })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTeachers(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const columns = [
        { header: 'Nombre', field: 'first_name' },
        { header: 'Apellido', field: 'last_name' },
        { header: 'Documento', field: 'document' },
        { header: 'Genero', field: 'gender' },
        { header: 'Email', field: 'email' },
        { header: 'Horas por semana', field: 'availability' }
    ];


    useEffect(() => {
        fetch('http://127.0.0.1:8000/Kronosapp/subjects/', {
            method: "GET",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const subjectNames = data.map(subject => subject.name);
                setSubjects(subjectNames);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);



    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const anios = ['1', '2', '3', '4', '5', '6']
    const cursos = ["A", "B", "C"]



    /*<RangeSlider /> agregar esto para los sliders*/
    return (
        <React.StrictMode>
            <NavBar />
            <Fondo>
                <div Class="filtros-container">
                    <div Class="botones">
                        <Button text="Profesores" life />
                        <Button text="Preceptores" />
                        <Button text="Directivos" />
                    </div>
                    <Select datos={subjects} name="Materia" style={{ '--largo': `50` }} />
                    <Buscador />
                    <Button onClick={handleButtonClick} text='+' />
                </div>
                <div Class="tabla-container">
                    <Table data={teachers} columns={columns} />
                </div>
            </Fondo>

            {isModalOpen && <Drawer onClose={handleCloseModal} title="Crear Curso">
                <div>
                    <h1>Nombre</h1>
                    <Input />
                </div>
                <div Class='Contenedor' style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>

                    <h1>Año</h1>
                    <Select datos={anios} name="Año" style={{ '--largo': `500` }} solid />
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
}