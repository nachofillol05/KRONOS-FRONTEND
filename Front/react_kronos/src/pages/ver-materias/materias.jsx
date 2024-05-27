import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/navBars.jsx';
import Fondo from '../../components/fondo/fondos.jsx';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/select.jsx';
import Buscador from '../../components/Buscador/buscador.jsx';
import Modal from '../../components/modal/modals.jsx';
import RangeSlider from '../../components/timerangeslider/timerange.jsx';
import './materias.scss';


export default function Materias() {
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
            setTeachers(data);
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
    

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    
    /*<RangeSlider /> agregar esto para los sliders*/
    return (
        <React.StrictMode>
        <NavBar />
        <Fondo >
        <div Class="filtros-container">
            <Select name="Materia" style={{'--largo': `50`}}/>
            <Select name="General" style={{'--largo': `50`}}/>
            <Buscador />
            </div>
            <div Class="tabla-container">
            <Table data={teachers} columns={columns} />
        </div>
        </Fondo>
        {isModalOpen && <Modal onClose={handleCloseModal} title="Agregar materia" />}
    </React.StrictMode>
    )
}