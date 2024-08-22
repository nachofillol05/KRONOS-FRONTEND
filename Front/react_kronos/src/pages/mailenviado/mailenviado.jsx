import React from 'react';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import './mailenviado.scss'; 
const CorreoEnviado = () => {
  return (
    <div className="verification-container">
      <div className="verification-content">
      <MailOutlined className="verification-icon" />
        <h1 className="verification-title">¡Correo enviado!</h1>
        <p className="mt-0 mb-32">
        Te hemos enviado un correo electrónico con un enlace para verificar tu cuenta. Por favor, revisa tu bandeja de entrada.
       </p>
        <Button type="primary" className="button button-primary button-wide-mobile button-sm">
          Reenviar Correo
        </Button>
      </div>
    </div>
  );
};

export default CorreoEnviado;
