import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/navBars.jsx';
import Fondo from '../../components/fondo/fondos.jsx';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/select.jsx';
import Buscador from '../../components/Buscador/buscador.jsx';
import Button from '../../components/button/buttons.jsx';
import Modal from '../../components/modal/modals.jsx';
import Input from "../../components/input/inputs.jsx";
import './personal.scss';



export default function Personal() {
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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
        <Fondo>
        <div Class="filtros-container">
                <Button text="Profesores" life />
                <Button text="Preceptores"/>
                <Button text="Directivos"/>
                <Select name="Materia" style={{'--largo': `50`}}/>
                <Buscador />
                <Button onClick={handleButtonClick} text='+'/>
            </div>
            <div Class="tabla-container">
            <Table data={teachers} columns={columns} />
            </div>
        </Fondo>
        {isModalOpen && <Modal onClose={handleCloseModal} title="Crear Profesor">
            <div>
                <h1>nombre</h1>
                <Input />
            </div>
            <div Class='Contenedor'>
                <div>
                    <h1>Año</h1>
                    <Select name="Año" style={{'--largo': `500`}} solid/>
                </div>
                <div>
                    <h1>Curso</h1>
                    <Select name="Curso" style={{'--largo': `500`}} solid/>
                </div>
            </div>
            <div>
                <h1>Descripción</h1>
                <Input/>
            </div>
        </Modal>}
    </React.StrictMode>
    )
}