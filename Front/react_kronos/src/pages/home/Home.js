import React from 'react';
import NavBar from '../../components/navBar/navBars';
import Fondo from '../../components/fondo/fondos';
import Modal from '../../components/modal/modals';

export default function Home() {
    return (
        <React.StrictMode>
            <NavBar />
            <Fondo />
        </React.StrictMode>
);
}
