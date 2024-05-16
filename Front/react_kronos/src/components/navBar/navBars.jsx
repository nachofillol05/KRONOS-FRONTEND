import React from 'react';
import './navBars.scss';
import NavBar from '../enlace/enlaces';

export default function Barra(props) {

    return (
        <aside>
            <div className="colegio"></div>
            <NavBar />
            <div className="colegio"></div>
        </aside>
    );
}
