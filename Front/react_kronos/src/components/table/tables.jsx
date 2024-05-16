import {React, Component, useState, useEffect } from 'react';
import './tables.scss';

const data = [
    { Nombre: "Anom", Documento: 1923244, Color: 30, Materia: "Matematica" },
    { Nombre: "Megha", Documento: 19234234, Color: 30, Materia: "Biologia" },
    { Nombre: "Subham", Documento: 2532432432, Color: 30, Materia: "Lengua" },
]

export default function Table(props) {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/Kronosapp/teachers/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                school_id: 1
            })
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTeachers(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
        
        return(

    <div class="grid-table">
        <div class="header-container">
            <div class="header">Nombre/s Apellido/s</div>
            <div class="header">Documento</div>
            <div class="header">Genero</div>
            <div class="header">Email</div>
        </div>
        <div class="data-container">
            {teachers.map((teacher, key) => {
                return (
                    <div class="row">
                        <div class="cell">{teacher.first_name}</div>
                        <div class="cell">{teacher.document}</div>
                        <div class="cell">{teacher.gender}</div>
                        <div class="cell">{teacher.email}</div>
                    </div>
                )
            })}
        </div>
    </div>

    );
}