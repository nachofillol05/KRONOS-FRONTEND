import React, { useState } from 'react';
import './fondos.scss';
import Modal from '../modal/modals';
import Button from '../button/buttons';

export default function Fondo() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section>
            <Button onClick={handleButtonClick} text="Boton genial" life />
            {isModalOpen && <Modal onClose={handleCloseModal} titulo="Titulo Modal" contenido={<Button/>} />}
        </section>
    );
}
