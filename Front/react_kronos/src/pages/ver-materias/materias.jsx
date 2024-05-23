import {React} from 'react';
import NavBar from '../../components/navBar/navBars.jsx';
import Table from '../../components/table/tables.jsx';
import Select from '../../components/select/select.jsx';
import Buscador from '../../components/Buscador/buscador.jsx';
import RangeSlider from '../../components/timerangeslider/timerange.jsx';
import './materias.scss';
import { useState, useEffect } from 'react';


export default function Materias() {
    
    const [teachers, setTeachers] = useState([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/Kronosapp/teachers/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                school_id: 1
            })
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
        { header: 'Nombre/s Apellido/s', field: 'first_name' },
        { header: 'Documento', field: 'document' },
        { header: 'Género', field: 'gender' },
        { header: 'Email', field: 'email' }
    ];
    /*<RangeSlider /> agregar esto para los sliders*/
    return (
            <div Class="general-container">
                <div>
                    <NavBar />
                </div>
                    <div Class="filtros-container">
                        
                        <Select name="Materia" style={{'--largo': `50`}}/>
                        <Select name="General" style={{'--largo': `50`}}/>
                        <Buscador />
                    </div>
                    <div Class="Table">
                    <Table data={teachers} columns={columns} />
                    </div>
            </div>
    )
}