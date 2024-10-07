import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';  // Assuming this is a custom Input component
import Button from '../elements/Button';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

export default function Login(props) {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const inputUserRef = useRef(null);
  const inputPasswordRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const actualSchool = JSON.parse(localStorage.getItem('schools'))[0].pk;
      sessionStorage.setItem('actual_school', actualSchool);
      fetch('http://127.0.0.1:8000/api/school/myroles/', {
        method: "GET",
        headers: {
          'Authorization': 'Token ' + token,
          'School-ID': actualSchool,
        },
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('roles', JSON.stringify(data.roles));
        sessionStorage.setItem('rol', data.roles[0]);
        navigate('/horarios');
      });
    } else {
      console.log('No hay token almacenado');
    }
  }, [navigate]);

  function handleLogin(event) {
    event.preventDefault();
    const usernameValue = inputUserRef.current.value;
    const passwordValue = inputPasswordRef.current.value;

    fetch('http://127.0.0.1:8000/api/login/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "document": usernameValue,
        "password": passwordValue
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(responseData => {
      localStorage.setItem('token', responseData.Token);

      fetch('http://127.0.0.1:8000/api/user_schools/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token'),
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        localStorage.setItem('schools', JSON.stringify(responseData));
        sessionStorage.setItem('actual_school', JSON.stringify(responseData[0].pk));
        setShowError(false);
        fetch('http://127.0.0.1:8000/api/school/myroles/', {
          method: "GET",
          headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'School-ID': sessionStorage.getItem('actual_school'),
          },
        })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('roles', JSON.stringify(data.roles));
          sessionStorage.setItem('rol', data.roles[0]);
          console.log('Login success');
          navigate('/horarios');
        });
      })
      .catch(error => {
        console.error('Login failed:', error);
        setShowError(true);
      });
    })
    .catch(error => {
      console.error('Login failed:', error);
      setShowError(true);
    });
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
                <form onSubmit={handleLogin}>
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
