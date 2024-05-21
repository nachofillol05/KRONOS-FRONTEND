import React from 'react';
import './personas.scss';



export default function Persona() {

    return (
        <div className='contenedor-persona'>
        <div className="botones">
            <a href="#0">0</a>
            <a href="#0">0</a>
            <a href="#0">0</a>
        </div>
        <hr />
        <div className="informacion">
            <img src="https://imgs.search.brave.com/zdB3enQ0VfWDL99jKOk6S70mNrD6qFzjkllY5NTqQio/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mb25k/b3NtaWwuY28vZm9u/ZG8vMTc1NTMuanBn" alt="" />
            <div>
                <h1 className='nombre'>Daniela Gigena </h1>
                <p className='roles'>Directivo, Profesor</p>
            </div>
        </div>
        </div>
    );
}
