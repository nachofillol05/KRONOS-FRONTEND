import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

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
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Puedes renderizar un spinner u otro indicador de carga aquí
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
