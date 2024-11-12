import React from 'react';

export default function Button({ onClick, text = "Button", life, numero = 25, icon = null }) {

    const baseClass = life ? 'solid-button' : 'transparent-button';
    const iconClass = icon ? (text ? 'having-both' : 'having-only-icon') : '';

    return (
        <button
            onClick={onClick}
            style={{ '--numero': `${numero}px` }}
            className={`${baseClass} ${iconClass}`}
        >

            {text && <span className="span-text">{text}</span>}
            {icon && <span className="span-icon">{icon}</span>}
        </button>
    );
}
