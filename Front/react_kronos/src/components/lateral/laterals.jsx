import React from 'react';
import './laterals.scss';

export default function Lateral(props) {

    const botones = props.botones || [
        {
            icono: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    fill="#0E4942"
                >
                    <path d="M 10 3 L 10 8 L 4 8 L 4 20 L 20 20 L 20 8 L 14 8 L 14 3 Z M 12 5 L 13 5 L 13 8 L 11 8 L 11 5 Z M 6 10 L 18 10 L 18 18 L 6 18 Z" />
                </svg>
            ),
        },
        {
            icono: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    fill="#0E4942"
                >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
            ),
            solid: true
        },
    ];


    return (
        <div className="lateral-container">
            {botones.map((boton, index) => (
                boton.solid ? <div className="boton solid" key={index}>{boton.icono}</div> : <div className="boton transparent" key={index}>{boton.icono}</div>
            ))}
        </div>
    );
}

