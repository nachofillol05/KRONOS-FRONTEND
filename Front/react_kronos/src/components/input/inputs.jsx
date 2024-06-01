import React from 'react';
import './inputs.scss';

export default function Input(props) {
    const numero = props.numero ? props.numero : 30;
    return (
        <div className="input-container" style={{ '--numero': `${numero}px` }}>
            <label>{props.label}</label>
            {props.textArea ? (
                <textarea
                    placeholder={props.placeholder}
                    ref={props.inputRef}
                />
            ) : (
                <input
                    required={props.required}
                    placeholder={props.placeholder}
                    type={props.type}
                    ref={props.inputRef}
                />
            )}
        </div>
    );
}
