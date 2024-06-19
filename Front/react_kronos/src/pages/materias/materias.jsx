import React, { useState, useEffect } from 'react';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/selects.jsx';
import Buscador from '../../components/buscador/buscador.jsx';
import Input from "../../components/input/inputs.jsx";
import Drawer from '../../components/drawer/drawers.jsx';
import RangeSlider from '../../components/timerangeslider/timerange.jsx';
import './materias.scss';


export default function Materias() {
    const [materias, setMaterias] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/subjects/', {
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
        fetch('http://127.0.0.1:8000/api/teachers/', {
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
                const teacherNames = data.map(teacher => teacher.first_name + ' ' + teacher.last_name);
                setTeachers(teacherNames);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    const cursos = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C', '5A', '5B', '5C', '6A', '6B', '6C'];


    /*<RangeSlider /> agregar esto para los sliders*/
    return (
        <React.StrictMode>
        <div className="filtros-container">
            <RangeSlider />
            <Select datos={teachers} name="Teachers"/>
            <Select datos={cursos} name="General"  />
            <Buscador />
        </div>


        <div Class="tabla-container">
            <Table data={materias} columns={columns} />
        </div>

        {isModalOpen && <Drawer onClose={handleCloseModal} title="Agregar materia" >
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
                    <Select datos={"anios"} name="años" style={{'--largo': `700`}}/>
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
            </Drawer>}

      /*   {isModalOpen && <Drawer onClose={handleCloseModal} title="Agregar materia" />} */
    </React.StrictMode>
    )
}