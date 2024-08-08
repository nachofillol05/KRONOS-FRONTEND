import React from 'react';
import Lottie from 'lottie-react';
import animationData from './../../assets/Animation - 1723036360798.json';
import './error404.scss';

const Error404 = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-info">
                    <h1 className="error-title">Lo sentimos, la página que buscas no existe.</h1>
                    <p className="error-message">Puede haber sido movida o eliminada. Revisa la URL o vuelve al menú para encontrar lo que buscas.</p>
                    <div className="error-buttons">
                        <a href="/" className="error-button home">Volver al menú</a>
                        <a href="/login" className="error-button login">Login</a>
                    </div>
                </div>
                <div className="error-animation">
                    <Lottie animationData={animationData} loop={true} className="error-animation" />
                </div>
            </div>
        </div>
    );
};

export default Error404;