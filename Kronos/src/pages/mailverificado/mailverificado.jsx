import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './mailverificado.scss'; 

const MailVerificado = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      try {
          const response = await fetch(`https://kronos-backend.onrender.com/api/verify-email/${token}`, {
              method: 'GET',
          });
          if (response.ok) {
            console.log('Correo electrónico verificado con éxito');
          } else if (response.status === 400) {
            console.log('Correo electrónico ya verificado');
          } else if (response.status === 404) {
            console.log('token no encontrado');
          } else {
              console.log('Ocurrió un error al verificar el correo electrónico');
          }
      } catch (error) {
          console.error('Error:', error);
          console.log('Ocurrió un error al verificar el correo electrónico');
      }
  };
  verifyEmail();

  });
  const Continuar = () => {
    if (localStorage.getItem('token') === "" || localStorage.getItem('token') === null) {
      navigate('/login'); 
    }else{
      navigate('/perfil');
    }
  }
  return (
    <div className="verification-container">
      <div className="verification-content">
        <CheckCircleOutlined className="verification-icon" />
        <h1 className="verification-title">¡Verificación exitosa!</h1>
        <p className="mt-0 mb-32">
          Tu correo electrónico ha sido verificado con éxito. Ahora puedes continuar usando nuestra plataforma.
        </p>
        <Button type="primary" className="button button-primary button-wide-mobile button-sm" onClick={Continuar}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default MailVerificado;