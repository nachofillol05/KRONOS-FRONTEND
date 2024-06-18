import React, { useState } from 'react';
import Drawer from '../../components/drawer/drawers.jsx';
import NavBar from '../../components/navBar/navBars.jsx';
import './navegaciones.scss';

export default function Navegacion({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState("");

    // Función para abrir y cerrar el drawer donde se pasa el contenido del drawer y el título
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

    // Clonar y pasar props a los hijos
    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, { handleOpenDrawer, handleCloseDrawer })
    );

    return (
        <React.StrictMode>
            <NavBar />
            <section>
            {childrenWithProps}
                {isDrawerOpen && (
                    <Drawer onClose={handleCloseDrawer} title={drawerTitle} content={drawerContent} />
                )}
            </section>
        </React.StrictMode>
    );
}
