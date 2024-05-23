import './tabla-profes.scss';
import React, { useEffect, useState } from 'react';
import Table from '../table/tables.jsx';


export default function TablaProfes() {
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
        })
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
  
    const columns = [
        { header: 'Nombre/s Apellido/s', field: 'first_name' },
        { header: 'Documento', field: 'document' },
        { header: 'Género', field: 'gender' },
        { header: 'Email', field: 'email' }
    ];
  
    return (
        <div className="App">
            <Table data={teachers} columns={columns} />
        </div>
    );
  }