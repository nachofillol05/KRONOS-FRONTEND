import React, { useState, useEffect } from 'react';
import './fondos.scss';
import Modal from '../modal/modals';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/select.jsx';
import Buscador from '../../components/Buscador/buscador.jsx';
import RangeSlider from '../../components/timerangeslider/timerange.jsx';

export default function Fondo() {
    const [teachers, setTeachers] = useState([]);
    
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section>
            <div Class="filtros-container">
                        
                        <Select name="Materia" style={{'--largo': `50`}}/>
                        <Select name="General" style={{'--largo': `50`}}/>
                        <Buscador />
                    </div>
                    <div Class="tabla-container">
                    <Table data={teachers} columns={columns} />
                    </div>
            {isModalOpen && <Modal onClose={handleCloseModal} title="Titulo del Modal" />}
        </section>
    );
}
