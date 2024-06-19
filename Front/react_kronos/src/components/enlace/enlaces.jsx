import React, { useState, useEffect } from 'react';
import './enlaces.scss';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Enlace(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [posicion, setPosicion] = useState({ top: 0 });
    const [elementoClickeado, setElementoClickeado] = useState('Menu');
    const [navBarElements, setNavBarElements] = useState({
        'Menu': '/',
        'Horarios': '/horarios',
        'Personal': '/personal',
        'Materias': '/materias',
        'Eventos': '/eventos'
    });

    useEffect(() => {
        const currentPath = location.pathname;
        const primerElemento = document.querySelector(`h2[data-path="${currentPath}"]`);
        if (primerElemento) {
            const nuevaPosicion = primerElemento.getBoundingClientRect();
            setPosicion({ top: nuevaPosicion.top });
            setElementoClickeado(primerElemento.getAttribute('data-index'));
        }
    }, [location.pathname]);

    const handleClick = (event, element, path) => {
        const nuevaPosicion = event.target.getBoundingClientRect();
        setPosicion({ top: nuevaPosicion.top });
        setElementoClickeado(element);
        navigate(path);
    };

    const listaElementos = [];
    Object.keys(navBarElements).forEach((key, index) => {
        listaElementos.push(
            <h2
                key={key}
                data-index={key}
                data-path={navBarElements[key]}
                onClick={(e) => handleClick(e, key, navBarElements[key])}
                style={{
                    color: elementoClickeado === key ? '' : 'white'
                }}
            >
                {key}
            </h2>
        );
    });

    return (
        <div className="contenedor-enlace">
            <div style={{ position: 'absolute', top: posicion.top }}></div>
            {listaElementos}
        </div>
    );
}
