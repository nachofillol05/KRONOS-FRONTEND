import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/navBars.jsx';
import Fondo from '../../components/fondo/fondos.jsx';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/select.jsx';
import Buscador from '../../components/Buscador/buscador.jsx';
import Drawer from '../../layout/drawer/drawers.jsx';
import './materias.scss';


export default function Materias() {
    const [materias, setMaterias] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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
            setMaterias(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const columns = [
        { header: 'Nombre', field: 'name' },
        { header: 'Abreviacion', field: 'abbreviation' },
        { header: 'Curso', field: 'course' },
        { header: 'Horas catedra semanales', field: 'weeklyHours' },
        { header: 'Color', field: 'color' },
        { header: 'Descripcion', field: 'description' }
    ];

    useEffect(() => {
        fetch('http://127.0.0.1:8000/Kronosapp/teachers/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"school_id": 1 })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const teacherNames = data.map(teacher => teacher.first_name + ' ' + teacher.last_name);
            setTeachers(teacherNames);
          })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cursos = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C', '5A', '5B', '5C', '6A', '6B', '6C'];
    
    
    /*<RangeSlider /> agregar esto para los sliders*/
    return (
        <React.StrictMode>
        <NavBar />
        <Fondo >
        <div Class="filtros-container">
            <RangeSlider />
            <Select datos={teachers} name="Teachers" style={{'--largo': `50`}}/>
            <Select datos={cursos} name="General" style={{'--largo': `50`}}/>
            <Buscador />
            </div>
            <div Class="tabla-container">
            <Table data={materias} columns={columns} />
        </div>
        </Fondo>
        {isModalOpen && <Drawer onClose={handleCloseModal} title="Agregar materia" />}
    </React.StrictMode>
    )
}