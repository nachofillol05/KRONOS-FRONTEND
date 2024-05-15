import {React, Component} from 'react';
import './tables.scss';

const data = [
    { Nombre: "Anom", Documento: 1923244, Color: 30, Materia: "Matematica" },
    { Nombre: "Megha", Documento: 19234234, Color: 30, Materia: "Biologia" },
    { Nombre: "Subham", Documento: 2532432432, Color: 30, Materia: "Lengua" },
]

export default function Table(props) {
        
        return(

    <div class="grid-table">
        <div class="header-container">
            <div class="header">Nombre/s Apellido/s</div>
            <div class="header">Documento</div>
            <div class="header">Color</div>
            <div class="header">Materia/s</div>
        </div>
        <div class="data-container">
            {data.map((val, key) => {
                return (
                    <div class="row">
                        <div class="cell">{val.Nombre}</div>
                        <div class="cell">{val.Documento}</div>
                        <div class="cell">{val.Color}</div>
                        <div class="cell">{val.Materia}</div>
                    </div>
                )
            })}
        </div>
    </div>

    );
}