import React from 'react';
import './navBars.scss';
import Enlace from '../enlace/enlaces';
import Colegio from '../colegio/colegios';

export default function NavBar() {
    return (
        <aside>
            <div className="contenedor-colegio">
                <div>
                    <img src="data:image/png;base64,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" alt="" />
                </div>
                <h1>Instituto Jesus Maria</h1>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="36px" fill="#fff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>
            <Enlace /> 
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
        </aside>
    );
}
