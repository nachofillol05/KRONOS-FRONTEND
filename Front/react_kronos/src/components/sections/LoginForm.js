import React, { useState, useEffect, useRef } from 'react';
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
  const [showError, setShowError] = useState(false);
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

async function handlerLogin (event) {
    event.preventDefault();
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
        console.error('Login Failed', error)
        setShowError(true);
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
                      <Button color="primary" wide>Iniciar sesión</Button>
                    </div>
                    {showError && <p>El documento y la contraseña no coinciden</p>}
                    <div className="signin-footer mb-32">
                      {/*<Link to="/recover-password/" className="func-link text-xs">Olvidó su contraseña?</Link>*/}
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
