import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DirectiveRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [school, setSchool] = useState(sessionStorage.getItem('actual_school'));
  if (token === "" || token === null){
    navigate('/landing');
  }

useEffect(() => {
    const verifyToken = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/verifyToken/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "token": localStorage.getItem('token'),
                })
            });

            if (response.ok) {
                fetch('http://127.0.0.1:8000/api/school/myroles/', {
                    method: "GET",
                    headers: {
                        'Authorization': 'Token ' + token,
                        'School-ID': school,
                    },
                }).then(response => response.json())
                .then(data => {
                    if (sessionStorage.getItem('rol') === "Directivo" && JSON.stringify(data).includes("Directivo") === true) {
                        setIsAuthenticated(true);
                        response.json().then(data => {
                            localStorage.setItem('user', JSON.stringify(data));
                        });
                    } else {
                        setIsAuthenticated(false);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                
            } else {
                setIsAuthenticated(false);
                return navigate('/loginAnterior')
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            setIsAuthenticated(false);
            return navigate('/loginAnterior')
        }
    };

    verifyToken();
}, [navigate]);

  return isAuthenticated ? children : navigate('/Perfil');
};

export default DirectiveRoute;
