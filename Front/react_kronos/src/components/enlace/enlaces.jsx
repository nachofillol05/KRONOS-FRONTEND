import React, { useState, useEffect } from 'react';
import './enlaces.scss';


export default function NavBar(props) {
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
    }, []); // El array vacío asegura que esto solo se ejecute una vez, después de que se monta el componente

    // Función para manejar el clic en un enlace
    const handleClick = (event, index) => {
        const nuevaPosicion = event.target.getBoundingClientRect();
        setPosicion({ top: nuevaPosicion.top });
        setElementoClickeado(index);
        console.log("Posición del enlace - Top:", nuevaPosicion.top, "Left:", nuevaPosicion.left);
    }


    for (let i = 1; i < 7; i++) {
        listaElementos.push(
            <h2 key={i} onClick={(e) => handleClick(e, i)} style={{ color: elementoClickeado === i ? 'black' : 'white' }}>{i}</h2>
        );
    }

    return (
        <section>
            <div style={{ position: 'absolute', top: posicion.top, left: posicion.left }}></div>
            {listaElementos}
        </section>
    );
}
