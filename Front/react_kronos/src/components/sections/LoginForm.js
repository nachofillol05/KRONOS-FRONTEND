import React, { useState, useEffect, useRef } from 'react';
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../services/apiService.js'
import { fetchMyRoles, fetchMySchools } from '../../services/users.js'
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';


const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const getRoles = async () => {
  try {
      const data = await fetchMyRoles();
      localStorage.setItem('roles', JSON.stringify(data.roles));
      sessionStorage.setItem('rol', data.roles[0]);
  } catch (error) {
      console.error(error);
  }
}

export default function Login(props) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputUserRef = useRef(null);
  const inputPasswordRef = useRef(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    const schools = JSON.parse(localStorage.getItem('schools'));
    if (!schools && schools.length < 1) {
        console.error('No hay escuelas almacenadas');
    }
    // guardar en sesion la primera escuela
    sessionStorage.setItem('actual_school', schools[0].pk)

    getRoles();
  }, [])
  if (localStorage.getItem('token')) {
    console.log('Token:', localStorage.getItem('token'));
    const verifyToken = async () => {
        try {
            const tokenResponse = await fetch('http://localhost:8000/api/verifyToken/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "token": localStorage.getItem('token'),
                })
            });
            if (tokenResponse.ok) {
                navigate('/login');
                return null;
            }
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    }
    verifyToken();

}

  async function handlerLogin (event) {
    event.preventDefault();
    setLoading(true)
    
    const usernameValue = inputUserRef.current.value;
    const passwordValue = inputPasswordRef.current.value;

    try {
        const body = {
            "document": usernameValue,
            "password": passwordValue
        }
        const loginData = await fetchLogin(body)
        localStorage.setItem('token', loginData.Token);

        const mySchoolsData = await fetchMySchools()
        localStorage.setItem('schools', JSON.stringify(mySchoolsData));
        // primer pk colegio en la sesion
        sessionStorage.setItem('actual_school', JSON.stringify(mySchoolsData[0].pk));

        getRoles();

        navigate('/horarios');
    } catch(error) {
      const messageError = () => {
        message.error('Documento o contraseña incorrectos. Por favor, inténtelo nuevamente.', 5);
      };
      console.error('Login Failed', error);
      messageError();
    } finally {
      setLoading(false)
    }
}

  const {
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    ...restProps
  } = props;

  const outerClasses = classNames(
    'signin section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'signin-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const sectionHeader = {
    title: 'Iniciar sesión',
  };
  const cambioContrasenia = () => {
    console.log('cambio contraseña');
  }

  return (
    <section
      {...restProps}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader tag="h1" data={sectionHeader} className="center-content" />
          <div className="tiles-wrap">
            <div className="tiles-item">
              <div className="tiles-item-inner">
                <form onSubmit={handlerLogin}>
                  <fieldset>
                    <div className="mb-12">
                      <Input
                        type="number"
                        label="Usuario"
                        placeholder="Documento"
                        ref={inputUserRef}
                        labelHidden
                        required
                      />
                    </div>
                    <div className="mb-12">
                      <Input
                        type="password"
                        label="Contraseña"
                        placeholder="Contraseña"
                        ref={inputPasswordRef} 
                        labelHidden
                        required
                      />
                    </div>
                    <div className="mt-24 mb-32">
                      <Button 
                        color="primary" 
                        wide
                        loading={isLoading}
                      >
                        Iniciar sesión
                      </Button>
                    </div>
                    <div className="signin-footer mb-32">
                      <a onClick={cambioContrasenia}>Olvidé mi contraseña</a>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
