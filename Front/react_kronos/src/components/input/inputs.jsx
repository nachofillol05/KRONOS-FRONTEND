import React from 'react';
import './inputs.scss';

export default function Input(props) {
    return (
        <div className="input-container" style={{ '--numero': `${props.numero}px` }}>
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
