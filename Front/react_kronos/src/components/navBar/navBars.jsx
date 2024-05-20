import React from 'react';
import './navBars.scss';
import Enlace from '../enlace/enlaces';
import Colegio from '../colegio/colegios';
import Persona from '../persona/personas';

export default function NavBar() {
    return (
        <aside>
            <Colegio/>
            <Enlace /> 
            <Persona />
        </aside>
    );
}
