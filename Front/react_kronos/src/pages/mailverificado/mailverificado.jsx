import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './mailverificado.scss'; 

const MailVerificado = () => {
  return (
    <div className="verification-container">
      <div className="verification-content">
        <CheckCircleOutlined className="verification-icon" />
        <h1 className="verification-title">¡Verificación exitosa!</h1>
        <p className="mt-0 mb-32">
          Tu correo electrónico ha sido verificado con éxito. Ahora puedes continuar usando nuestra plataforma.
        </p>
        <Button type="primary" className="button button-primary button-wide-mobile button-sm">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default MailVerificado;