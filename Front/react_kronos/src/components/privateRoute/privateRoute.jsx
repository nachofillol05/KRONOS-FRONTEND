import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivateRoute.scss'; 

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
          return navigate('/landing');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsAuthenticated(false);
        return navigate('/landing');
      }
    };

    verifyToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="spinner-container">
        <Spin size="large" />
      </div>
    );
  }

  return isAuthenticated ? children : navigate('/login');
};

export default PrivateRoute;
