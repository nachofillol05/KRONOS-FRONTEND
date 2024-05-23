import React from 'react';
import './buttons.scss';

export default function Button({ onClick, text = 'Button', life, numero = 30 }) {
    return (
        <button 
            onClick={onClick}
            style={{ '--numero': `${numero}px` }}
            className={life ? 'solid-button' : 'transparent-button'}
        >
            {text}
        </button>
    );
}
