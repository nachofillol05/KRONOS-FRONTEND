import React, { useState, useEffect } from 'react';
import './enlaces.scss';


export default function Enlace(props) {
    const listaElementos = [];
    const [posicion, setPosicion] = useState({ top: 0});
    const [elementoClickeado, setElementoClickeado] = useState(null);
    
    
    useEffect(() => {

        const primerElemento = document.querySelector('h2');
        if (primerElemento) {
            const nuevaPosicion = primerElemento.getBoundingClientRect();
            setPosicion({ top: nuevaPosicion.top});
            setElementoClickeado(1);
        }
    }, []); 

    const handleClick = (event, index) => {
        const nuevaPosicion = event.target.getBoundingClientRect();
        setPosicion({ top: nuevaPosicion.top });
        setElementoClickeado(index);
    }

    for (let i = 1; i < 7; i++) {
        listaElementos.push(
            <h2 
            key={i} onClick={(e) => handleClick(e, i)} 
            style={{ 
                color: elementoClickeado === i ? '' : 'white'
            }}
            >{i}</h2>
        );
    }

    return (
        <div className="contenedor-enlace">
            <div 
            style={{ position: 'absolute', top: posicion.top }}>

            </div>
            {listaElementos}
        </div>
    );
}
