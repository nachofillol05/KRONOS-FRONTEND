import React, { useState } from 'react';
import './switchers.scss';

export default function Switcher(props) {
    // Define the items from props or use the default values
    const items = props.items ? props.items : {
        'Profesores': 1,
        'Preceptores': 2,
        'Directivos': 3
    };
    
    // Set the initial state with the first key of the items object
    const [activeItem, setActiveItem] = useState(Object.keys(items)[0]);

    const active = (item) => {
        setActiveItem(item);
    };

    return (
        <div className="switch-button-container">
            {Object.keys(items).map((item) => (
                <div
                    key={item}
                    className={`switch-button ${activeItem === item ? 'solid' : ''}`}
                    onClick={() => active(item)}
                >
                    {item}
                </div>
            ))}
        </div>
    );
}

