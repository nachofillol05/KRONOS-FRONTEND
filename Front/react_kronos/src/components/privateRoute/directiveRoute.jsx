import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DirectiveRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  if (localStorage.getItem('token') === "" || localStorage.getItem('token') === null){
    navigate('/login');
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
                if (sessionStorage.getItem('rol') === "Directivo") {
                    setIsAuthenticated(true);
                    response.json().then(data => {
                        localStorage.setItem('user', JSON.stringify(data));
                    });
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            setIsAuthenticated(false);
        }
    };

    verifyToken();
}, [navigate]);

  return isAuthenticated ? children : navigate('/Perfil');
};

export default DirectiveRoute;
