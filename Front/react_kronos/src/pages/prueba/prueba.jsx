import React from 'react';
import Navegacion from '../../layout/navegacion/navegaciones.jsx';
import Button from '../../components/button/buttons.jsx';
import './prueba.scss'

export default function Prueba() {
    return (
        <React.StrictMode >
            <Navegacion modalTitle="Pruasfga sfgsadasfaasf as adsgfas dfse ba" 
            modalChildren={
                <h1>sadffasfgfasdf</h1>
            }>
                
                {(handleOpenModal) => (
                    <>
                        <Button text="Prueba" onClick={handleOpenModal} />
                        <h1>hola</h1>
                    </>
                )}
            </Navegacion>
        </React.StrictMode>
);
}