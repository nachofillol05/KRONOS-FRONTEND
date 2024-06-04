import React from 'react';
import './inputs.scss';

export default function Input(props) {
    const { numero = 30, label, placeholder, type, name, value, onChange } = props;
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
