import React, { useState } from 'react';
import Fondo from '../../components/fondo/fondos.jsx';
import Modal from '../../components/modal/modals.jsx';
import NavBar from '../../components/navBar/navBars.jsx';
import './navegaciones.scss'

export default function Navegacion({ children, modalChildren, modalTitle}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <React.StrictMode>
            <NavBar />
            <Fondo>
                {typeof children === 'function' ? children(handleOpenModal) : children}
                {isModalOpen && (
                    <Modal onClose={handleCloseModal} titulo={modalTitle}>
                        {modalChildren}
                    </Modal>
                )}
            </Fondo>
        </React.StrictMode>
);
}