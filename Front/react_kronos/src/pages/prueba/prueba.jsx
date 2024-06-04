import React, { useRef } from 'react';
import Navegacion from '../../layout/navegacion/navegaciones.jsx';
import Button from '../../components/button/buttons.jsx';
import './prueba.scss';
import Input from '../../components/input/inputs.jsx';

export default function Prueba() {

    const asuntoRef = useRef(null);
    const contenidoRef = useRef(null);

    const handleEnviar = (event, handleCloseDrawer) => {
        event.preventDefault();
        const asunto = asuntoRef.current.value;
        const contenido = contenidoRef.current.value;
        const emailSpan = document.querySelector('.contactar .email label span');
        const email = emailSpan.textContent;

        if (asunto) {
            const jsonData = JSON.stringify({ email, asunto, contenido });
            console.log('JSON:', jsonData);


            fetch('http://localhost:8000/Kronosapp/contacting-staff/', {
                method: "POST",
                body: jsonData, // Pasando el JSON como cuerpo de la solicitud
                headers: {
                    "Content-Type": "application/json" // Especificando el tipo de contenido
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al enviar los datos.'); // Manejo de errores si la solicitud no fue exitosa
                    }
                    // Aquí puedes manejar la respuesta si es necesaria
                    return response.json(); // Puedes retornar la respuesta como JSON si la necesitas
                })
                .then(data => {
                    // Aquí puedes manejar los datos de la respuesta si es necesario
                })
                .catch(error => {
                    console.error('Error:', error); // Manejo de errores si la solicitud falla
                });

                handleCloseDrawer();
        }


    };


    return (
        <React.StrictMode>
            <Navegacion>
                {(handleOpenDrawer, handleCloseDrawer) => (//Todos los componentes con handleOpenDrawer dentro de la funcion
                    <>
                        <Button
                            text="Prueba"
                            onClick={() => handleOpenDrawer(
                                <div className='contactar'>
                                    <div className='identidad'>
                                        <h1>Pepe Daniel Lazaro vashesian</h1>
                                        <h2>25167856</h2>
                                    </div>
                                    <form className='email'>
                                        <label>Email: <span>aguchealezama@gmail.com</span></label>
                                        <Input required label='Asunto' placeholder='Siguiente acto' numero={35} inputRef={asuntoRef} />
                                        <Input label='Contenido' placeholder='El acto de la siguiente fecha' numero={35} textArea inputRef={contenidoRef} />
                                        <Button life text="Enviar" onClick={(event) => {
                                            event.preventDefault();
                                            handleEnviar(event,handleCloseDrawer);
                                        }} />
                                    </form>

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
