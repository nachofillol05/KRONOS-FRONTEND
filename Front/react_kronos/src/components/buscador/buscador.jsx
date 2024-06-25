import React, { useState } from 'react';
import './buscador.scss';

export default function Buscador({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchText);
    };

    return (
        <div className="buscador-container">
            <input 
                type='text' 
                placeholder="Buscador" 
                value={searchText} 
                onChange={handleInputChange}
            />
            <span 
                role="img" 
                aria-label="lupa" 
                className="lupa" 
                onClick={handleSearchClick}
            >
                &#128269;
            </span>
        </div>
    );
}
