import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './mailverificado.scss'; // Asegúrate de crear este archivo CSS con los estilos que se describen más abajo.

const MailVerificado = () => {
  return (
    <div className="verification-container">
      <div className="verification-content">
        <CheckCircleOutlined className="verification-icon" />
        <h1 className="verification-title">¡Verificación exitosa!</h1>
        <p className="verification-text">
          Tu correo electrónico ha sido verificado con éxito. Ahora puedes continuar usando nuestra plataforma.
        </p>
        <Button type="primary" className="verification-button">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default MailVerificado;