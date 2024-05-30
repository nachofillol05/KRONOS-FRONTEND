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
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('Profesores');
    
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
            const subjectNames = data.map(subject => subject.name);
            setSubjects(subjectNames);
          })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    

  // Función para manejar el clic en un botón
    const buttonSelected = (buttonText) => {
        setActiveButton(buttonText);
    };
    
    

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const anios = ['1', '2', '3', '4', '5', '6']
    const cursos = ['A', 'B', 'C']
    const tipoDocumento = ['DNI', 'Pasaporte']
    const rol = ['Profesor', 'Preceptor', 'Directivo']
      

    
    /*<RangeSlider /> agregar esto para los sliders*/
    return (
        <React.StrictMode>
        <NavBar />
        <Fondo>
        <div Class="filtros-container">
            <div className="botones">
                <Button 
                    text="Profesores" 
                    life={activeButton === 'Profesores'} 
                    onClick={() => buttonSelected('Profesores')}
                />
                <Button 
                    text="Preceptores" 
                    life={activeButton === 'Preceptores'} 
                    onClick={() => buttonSelected('Preceptores')}
                />
                <Button 
                    text="Directivos" 
                    life={activeButton === 'Directivos'} 
                    onClick={() => buttonSelected('Directivos')}
                />
            </div>
                <Select datos={subjects} name="Materia" style={{'--largo': `50`}}/>
                <Buscador />
            <div>
                <Button onClick={handleButtonClick} text='+' numero={10}/>
            </div>
                
            </div>
            <div Class="tabla-container">
            <Table data={teachers} columns={columns} />
            </div>
        </Fondo>
            {isModalOpen && <Modal onClose={handleCloseModal} title="Agregar Personal">
                    <div Class='Contenedor' style={{display: 'flex',flexDirection: 'row', gap: '20px',  alignItems: 'center'}}>
                    <Select datos={tipoDocumento} name="Tipo Documento" style={{'--largo': `60`}} solid/>
                    <Input />
                    <Button id="botonCircular" text= 
                                {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M10 2a8 8 0 1 0 5.3 14.3l4.6 4.6 1.4-1.4-4.6-4.6A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"/>
                                </svg>}
                                numero = {20} circular/>
                    </div>
                    <div>
                        <h1>Nombre</h1>
                        <Input />
                    </div>
                    <div>
                        <h1>Apellido</h1>
                        <Input />
                    </div>
                    <div>
                        <h1>Telefono</h1>
                        <Input />
                    </div>
                    <div>
                        <h1>Email</h1>
                        <Input />
                    </div>
                    <div Class='Contenedor' style={{display: 'flex',flexDirection: 'row', gap: '20px'}}>
                        <Select datos={rol} name="Rol" largo="345" solid />
                    </div>
                </Modal>}
        
    </React.StrictMode>
    )
}


/*{isModalOpen && <Modal onClose={handleCloseModal} title="Crear Curso">
            <div>
                <h1>Nombre</h1>
                <Input />
            </div>
            <div Class='Contenedor' style={{display: 'flex',flexDirection: 'row', gap: '20px'}}>

                    <h1>Año</h1>
                    <Select datos={anios} name="Año" style={{'--largo': `500`}} solid/>
                    <h1>Curso</h1>
                    <Select datos={cursos} name="Curso" style={{'--largo': `500`}} solid/>
            </div>
            <div>
                <h1>Descripción</h1>
                <Input/>
            </div>
        </Modal>}*/
        