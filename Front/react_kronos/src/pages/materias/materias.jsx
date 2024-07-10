import React, { useState, useEffect } from 'react';
import Table from '../../components/table/tables.jsx';
import Buscador from '../../components/buscador/buscador.jsx';
import Input from "../../components/input/inputs.jsx";
import Drawer from '../../components/drawer/drawers.jsx';
import './materias.scss';
import { Button, TextField, Autocomplete, Box, Slider } from '@mui/material';



export default function Materias({ handleOpenDrawer, handleCloseDrawer }) {
    const [materias, setMaterias] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teacher, setTeacher] = useState('');
    const [Subjectname, setSubjectname] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');

    const [value, setValue] = React.useState([20, 80]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    useEffect(() => {
        const url = new URL('http://127.0.0.1:8000/api/subjects/');
        if (end_time && start_time) {
            url.searchParams.append('start_time', start_time);
            url.searchParams.append('end_time', end_time);
        };
        if (teacher) {
            url.searchParams.append('teacher', teacher);
        };
        if (Subjectname) {
            url.searchParams.append('name', Subjectname);
        };
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", url.toString())
        fetch(url.toString(), {
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
                setMaterias(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [start_time, end_time, Subjectname, teacher]);

    const columns = [
        { header: 'Nombre', field: 'name', flex: 1 },
        { header: 'Abreviacion', field: 'abbreviation', flex: 1 },
        { header: 'Curso', field: 'course', flex: 1 },
        { header: 'Horas catedra semanales', field: 'weeklyHours', flex: 1 },
        { header: 'Color', field: 'color', flex: 1 },
        { header: 'Descripcion', field: 'description', flex: 1 }
    ];

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teachers/', {
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

    const cursos = [{ id: 1, name: '1A' }, { id: 2, name: '1B' }, { id: 3, name: '2A' }, { id: 4, name: '2B' }, { id: 5, name: '3A' }, { id: 6, name: '3B' }, { id: 7, name: '4A' }, { id: 8, name: '4B' }, { id: 9, name: '5A' }, { id: 10, name: '5B' }];


    return (
        <React.StrictMode>
            <div className="filtros-container">
                <Box className='kronos-slider'>
                    <Slider
                        size='medium'
                        getAriaLabel={() => 'Rango horario'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                    />
                </Box>

                <Autocomplete 
                    className='kronos-select'
                    disablePortal
                    size='small'
                    id="combo-box-demo"
                    options={[
                        { label: 'The Shawshank Redemption', year: 1994 },
                        { label: 'The Godfather', year: 1972 },
                        { label: 'The Godfather: Part II', year: 1974 },
                        { label: 'The Dark Knight', year: 2008 },
                        { label: '12 Angry Men', year: 1957 },
                        { label: "Schindler's List", year: 1993 },
                        { label: 'Pulp Fiction', year: 1994 }]}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                />
                
                <Autocomplete 
                    className='kronos-select'
                    disablePortal
                    size='small'
                    id="combo-box-demo"
                    options={[
                        { label: 'The Shawshank Redemption', year: 1994 },
                        { label: 'The Godfather', year: 1972 },
                        { label: 'The Godfather: Part II', year: 1974 },
                        { label: 'The Dark Knight', year: 2008 },
                        { label: '12 Angry Men', year: 1957 },
                        { label: "Schindler's List", year: 1993 },
                        { label: 'Pulp Fiction', year: 1994 }]}
                    sx={{
                        width: 150,
                        '& .MuiInputBase-root': { // Estilo para el contenedor del input
                        },
                    }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                />
                <Buscador className='kronos-buscador' datos={materias} agrupacion="name" extra="course" label="Buscar una materia" />
                <Box display="flex" alignItems="center" gap={1}>
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 0,
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            padding: 0,
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        1
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 0,
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            padding: 0,
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        2
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 0,
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            padding: 0,
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        3
                    </Button>
                </Box>
            </div>

            <Table data={materias} columns={columns} />

            {isModalOpen && <Drawer onClose={handleCloseModal} title="Agregar materia" >
                <div Class='Contenedor' style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                    <div>
                        <h1>Materia</h1>
                        <Input />
                    </div>
                    <div>
                        <h1>Abreviacion</h1>
                        <Input />
                    </div>
                </div>
                <div Class='Contenedor' style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                    <div>
                        <h1>Horas Semanales</h1>
                        <Input type="number" />
                    </div>
                    <div>
                        <h1>Color</h1>
                        <Input type="color" />
                    </div>
                </div>
                <div>
                    <h1>Plan de Estudio</h1>
                    <Input textArea />
                </div>
                <div>
                    <h1>Descripción</h1>
                    <Input textArea />
                </div>
            </Drawer>}
        </React.StrictMode>
    )
}