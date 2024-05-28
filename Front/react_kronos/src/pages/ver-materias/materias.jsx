import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/navBars.jsx';
import Fondo from '../../components/fondo/fondos.jsx';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/select.jsx';
import Buscador from '../../components/Buscador/buscador.jsx';
import Modal from '../../components/modal/modals.jsx';
import Input from "../../components/input/inputs.jsx";
import RangeSlider from '../../components/timerangeslider/timerange.jsx';
import './materias.scss';


export default function Materias() {
    const [teachers, setTeachers] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
    
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
            setMaterias (data);
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
    
    const anios = ['1', '2', '3', '4', '5', '6']
    const cursos = ['A', 'B', 'C']
    
    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const datos = ['Profesor', 'Preceptor', 'Directivo']
    
    
    /*<RangeSlider /> agregar esto para los sliders*/
    return (
        <React.StrictMode>
        <NavBar />
        <Fondo >
        <div Class="filtros-container">
            <Select datos={teachers} name="Materia" style={{'--largo': `50`}}/>
            <Select datos={datos} name="General" style={{'--largo': `50`}}/>
            <Buscador />
            </div>
            <div Class="tabla-container">
            <Table data={materias} columns={columns} />
        </div>
        </Fondo>
        {isModalOpen && <Modal onClose={handleCloseModal} title="Agregar materia" >
                <div Class='Contenedor' style={{display: 'flex',flexDirection: 'row', gap: '20px',  alignItems: 'center'}}>
                    <div>
                        <h1>Materia</h1>
                        <Input />
                    </div>
                    <div>
                        <h1>Abreviacion</h1>
                        <Input />
                    </div>
                </div>
                <div Class='Contenedor' style={{display: 'flex',flexDirection: 'row', gap: '20px',  alignItems: 'center'}}>
                    <Select datos={teachers} name="Profesor" style={{'--largo': `1000`}}/>
                    <Select datos={anios} name="años" style={{'--largo': `700`}}/>
                </div>
                <div Class='Contenedor' style={{display: 'flex',flexDirection: 'row', gap: '20px',  alignItems: 'center'}}>
                    <div>
                        <h1>Horas Semanales</h1>
                        <Input type="number"/>
                    </div>
                    <div>
                        <h1>Color</h1>
                        <Input type="color"/>
                    </div>
                </div>
                <div>
                    <h1>Plan de Estudio</h1>
                    <Input textArea/>
                </div>
                <div>
                    <h1>Descripción</h1>
                    <Input textArea/>
                </div>


            </Modal>}
    </React.StrictMode>
    )
}