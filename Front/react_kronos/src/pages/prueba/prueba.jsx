import React from 'react';
import Navegacion from '../../layout/navegacion/navegaciones.jsx';
import Button from '../../components/button/buttons.jsx';
import './prueba.scss';

export default function Prueba() {
    return (
        <React.StrictMode>
            <Navegacion>
                {(handleOpenDrawer) => (
                    <>
                        <Button 
                            text="Prueba" 
                            onClick={() => handleOpenDrawer(
                                <div className="modal"><h1>Contenido del botón Prueba</h1></div>,
                                "Título del botón Prueba"
                            )} 
                        />
                        <h1>hola</h1>
                        <Button 
                            text="hola" 
                            onClick={() => handleOpenDrawer(
                                <div className="modal"><h1>Contenido del botón hola</h1></div>,
                                "Título del botón hola"
                            )} 
                        />
                    </>
                )}
            </Navegacion>
        </React.StrictMode>
    );
}
