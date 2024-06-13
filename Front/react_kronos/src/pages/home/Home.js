import React from 'react';
import Navegacion from '../../layout/navegacion/navegaciones';
import { useNavigate } from 'react-router-dom';
import {useState } from 'react';

export default function Home() {
    const navigate = useNavigate();
    
    function logOut(){
        console.log('logout')
        localStorage.setItem('token', '');
    }

    return (
        <React.StrictMode>
            <Navegacion />
            <button onClick={logOut}>holaaa</button>
        </React.StrictMode>
);
}
