import React, { useState } from 'react';
import Fondo from '../../components/fondo/fondos.jsx';
import Drawer from '../../layout/drawer/drawers.jsx';
import NavBar from '../../components/navBar/navBars.jsx';
import './navegaciones.scss';

export default function Navegacion({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState("");

    //funcion para abrir y cerrar el drawer donde se pasa el contenido del drawer y el titulo
    const handleOpenDrawer = (content, title) => {
        setDrawerContent(content);
        setDrawerTitle(title);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setDrawerContent(null);
        setDrawerTitle("");
    };

    return (
        <React.StrictMode>
            <NavBar />
            <Fondo>
                {/*se pasa la funcion handleOpenDrawer como prop a los hijos */}
                {typeof children === 'function' ? children(handleOpenDrawer, handleCloseDrawer) : children}
                {isDrawerOpen && (
                    <Drawer onClose={handleCloseDrawer} title={drawerTitle} content={drawerContent} />
                )}
            </Fondo>
        </React.StrictMode>
    );
}
