import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();
    function cerrarSesion(){
        localStorage.setItem('token', '');
        navigate('/login');
    }
    return (
            <>
            <button onClick={cerrarSesion}>Cerrar sesion</button>
            </>
);
}
