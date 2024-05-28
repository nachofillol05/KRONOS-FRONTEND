import React from 'react';
import './buttons.scss';

export default function Button({ onClick, text = 'Button', life, numero = 30, circular}) {

    const baseClass = life ? 'solid-button' : 'transparent-button';

    const circularClass = circular ? 'circular-button' : '';

    return (
        <button 
            onClick={onClick}
            style={{ '--numero': `${numero}px` }}
            className={`${baseClass} ${circularClass}`}
        >
            {text}
        </button>
    );
}


