import React from 'react';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './mailenviado.scss'; 
const CorreoEnviado = () => {
  const navigate = useNavigate();
  const volver = () => {
    navigate('/login');
    localStorage.setItem('token', '');
  }
  return (
    <div className="verification-container">
      <div className="verification-content">
      <MailOutlined className="verification-icon" />
        <h1 className="verification-title">¡Correo enviado!</h1>
        <p className="mt-0 mb-32">
        Te hemos enviado un correo electrónico con un enlace para verificar tu cuenta. Por favor, revisa tu bandeja de entrada.
       </p>
        <Button type="primary" className="button button-primary button-wide-mobile button-sm" onClick={volver}>
          Volver
        </Button>
      </div>
    </div>
  );
};

export default CorreoEnviado;
