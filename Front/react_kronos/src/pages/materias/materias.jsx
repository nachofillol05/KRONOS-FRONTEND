import React, { useState, useEffect } from 'react';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/selects.jsx';
import Buscador from '../../components/buscador/buscador.jsx';
import Input from "../../components/input/inputs.jsx";
import Drawer from '../../components/drawer/drawers.jsx';
import RangeSlider from '../../components/timerangeslider/timerange.jsx';
import './materias.scss';
import Lateral from '../../components/lateral/laterals.jsx';


export default function Materias({ handleOpenDrawer, handleCloseDrawer }) {
    const [materias, setMaterias] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teacher, setTeacher] = useState('');
    const [Subjectname, setSubjectname] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');

    useEffect(() => {
        const url = new URL('http://127.0.0.1:8000/api/subjects/');
        if (end_time && start_time) {
            url.searchParams.append('start_time', start_time);
            url.searchParams.append('end_time', end_time);
        };
        if (teacher) {
            url.searchParams.append('teacher', teacher);
        };
        if (Subjectname){
            url.searchParams.append('name', Subjectname);
        };
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", url.toString())
        fetch(url.toString(), {
            method: "GET",
            headers: {
                'Authorization': 'Token '+ localStorage.getItem('token'),
                'School-ID':1,
            },
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
    }, [start_time,end_time,Subjectname,teacher]);
    
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
            method: "GET",
            headers: {
                'Authorization': 'Token '+ localStorage.getItem('token'),
                'School-ID':1,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const teacherNames = data.map(teacher => ({
                    id: teacher.id,
                    name: teacher.first_name + ' ' + teacher.last_name,
                }));
            
                setTeachers(teacherNames);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    }
    const handleSelectTeacher = (value) => { 
        setTeacher(value)
        console.log(value) 
    };

    const handleSearch = (searchText) => {
        setSubjectname(searchText);
    };

    const handleFinalRangeChange = (newValues) => {
        setStart_time(newValues[0]);
        setEnd_time(newValues[1]);
        console.log('New range values:', newValues);
      };

    const cursos = [{id: 1, name: '1A'}, {id: 2, name: '1B'}, {id: 3, name: '2A'}, {id: 4, name: '2B'}, {id: 5, name: '3A'}, {id: 6, name: '3B'}, {id: 7, name: '4A'}, {id: 8, name: '4B'}, {id: 9, name: '5A'}, {id: 10, name: '5B'}];


    return (
        <React.StrictMode>
        <div className="filtros-container">
            <RangeSlider onFinalChange={handleFinalRangeChange} />
            <Select onChange={handleSelectTeacher} datos={teachers} name="Teachers"/>
            <Select onChange={handleSelectTeacher} datos={cursos} name="General"  />
            <Buscador onSearch={handleSearch}/>
            <button onClick={openModal}></button>
            <Lateral />
        </div>

        <Table data={materias} columns={columns} />

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
    </React.StrictMode>
    )
}