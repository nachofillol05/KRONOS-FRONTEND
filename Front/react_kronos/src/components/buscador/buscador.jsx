import React from 'react';
import './buscador.scss';

export default function Buscador() {
    return (
        <div className="buscador-container">
            <input type='text' placeholder="Buscador"/>
            <span role="img" aria-label="lupa" className="lupa">&#128269;</span>
        </div>
    )
}