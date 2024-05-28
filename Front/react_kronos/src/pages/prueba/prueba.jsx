import React from 'react';
import Navegacion from '../../layout/navegacion/navegaciones.jsx';
import Button from '../../components/button/buttons.jsx';
import './prueba.scss';
import Input from '../../components/input/inputs.jsx';

export default function Prueba() {
    return (
        <React.StrictMode>
            <Navegacion>
                {(handleOpenDrawer) => (
                    <>
                        <Button 
                            text="Prueba" 
                            onClick={() => handleOpenDrawer(
                                <div className='contactar'>
                                    <div className='identidad'>
                                        <h1>Pepe Daniel Lazaro vashesian</h1>
                                        <h2>25167856</h2>
                                    </div>
                                    <div className='email'>
                                        <label>Email: pepedlazarv@gmail.com</label>
                                        <Input label='Asunto' placeholder='Siguiente acto' numero={35} />
                                        <Input label='Contenido' placeholder='El acto de la siguiente fecha' numero={35} textArea />
                                        <Button life text="Enviar"/>
                                    </div>

                                </div>
,
                                "Título del botón Prueba"
                            )} 
                        />
                    </>
                )}
            </Navegacion>
        </React.StrictMode>
    );
}
