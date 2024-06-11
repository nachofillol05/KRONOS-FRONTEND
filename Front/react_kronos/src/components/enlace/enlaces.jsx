import React, { useState, useEffect } from 'react';
import './enlaces.scss';


export default function Enlace(props) {
    const listaElementos = [];
    const [posicion, setPosicion] = useState({ top: 0});
    const [elementoClickeado, setElementoClickeado] = useState(1);
    const [navBarElements, setnavBarElements] = useState(['Menu','Horarios','Personal','Materias','Eventos']);
    
    
    useEffect(() => {

        const primerElemento = document.querySelector('h2');
        if (primerElemento) {
            const nuevaPosicion = primerElemento.getBoundingClientRect();
            setPosicion({ top: nuevaPosicion.top});
            setElementoClickeado('Menu');
        }
    }, []); 

    const handleClick = (event, index) => {
        console.log(index);
        const nuevaPosicion = event.target.getBoundingClientRect();
        setPosicion({ top: nuevaPosicion.top });
        setElementoClickeado(index);
    }
    navBarElements.map((element, index) => {
        listaElementos.push(<h2 
            key={element} onClick={(e) => handleClick(e, element)} 
            style={{ 
                color: elementoClickeado === element ? '' : 'white'
            }}
            >{element}</h2>);
        })

    

    

    return (
        <div className="contenedor-enlace">
            <div 
            style={{ position: 'absolute', top: posicion.top }}>
            </div>
            {listaElementos}
        </div>
    );
}
