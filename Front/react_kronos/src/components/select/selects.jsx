import React from "react";
import './selects.scss';

export default function Select(props) {
    const { datos, onChange, solid } = props;

    return (
        <select onChange={(e) => onChange(e.target.value)} className={solid ? 'solid-select' : 'transparent-select'}>
            <option value="">Seleccionar</option>
            
            {datos.map((dato) => (
                
                console.log(dato),
                <option key={dato.id} value={dato.id}>{dato.name}</option>
            ))}
        </select>
    );
}
