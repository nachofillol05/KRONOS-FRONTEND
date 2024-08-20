import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log("Token is null or empty");
      navigate('/landing');
    }
  }, [navigate]);
  
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
          setIsAuthenticated(true);
          response.json().then(data => {
            localStorage.setItem('user', JSON.stringify(data));
          });
        } else {
          setIsAuthenticated(false);
          return navigate('/loginAnterior');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsAuthenticated(false);
        return navigate('/loginAnterior');
      }
    };

    verifyToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Puedes renderizar un spinner u otro indicador de carga aquí
  }

  return isAuthenticated ? children : navigate('/login');
};

export default PrivateRoute;
