import React, { useRef } from 'react';
import Button from '../../components/button/buttons.jsx';
import './prueba.scss';
import Input from '../../components/input/inputs.jsx';

export default function Prueba({ handleOpenDrawer, handleCloseDrawer }) {
    const asuntoRef = useRef(null);
    const contenidoRef = useRef(null);

    const handleEnviar = (event) => {
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
                body: jsonData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al enviar los datos.');
                    }
                    return response.json();
                })
                .then(data => {
                    // Manejar los datos de la respuesta si es necesario
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            handleCloseDrawer();
        }
    };

    return (
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
                        <Button life text="Enviar" onClick={handleEnviar} />
                    </form>
                </div>,
                "Título del botón Prueba"
            )}
        />
    );
}
/*                        <div>
                        <div className='Contenedor' style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                            <Select datos={tipoDocumento} name="Tipo Documento" style={{ '--largo': `60` }} solid />
                            <Input />
                            <Button id="botonCircular" text={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M10 2a8 8 0 1 0 5.3 14.3l4.6 4.6 1.4-1.4-4.6-4.6A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                                </svg>}
                                numero={20} circular
                            />
                        </div>
                        <div>
                            
                            <Input label="Nombres"/>
                        </div>
                        <div>
                            <h1>Apellido</h1>
                            <Input />
                        </div>
                        <div>
                            <h1>Telefono</h1>
                            <Input />
                        </div>
                        <div>
                            <h1>Email</h1>
                            <Input />
                        </div>
                        <div className='Contenedor' style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                            <Select datos={rol} name="Rol" largo="345" solid />
                        </div>
                    </div>*/