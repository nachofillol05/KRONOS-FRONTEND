import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivateRoute.scss'; 

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const [mailVerified, setMailVerified] = useState(null);

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
        fetch('http://127.0.0.1:8000/api/isVerified/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        }).then(response => response.json())
            .then(data => {
                setIsAuthenticated(true);
                setMailVerified(data.user_is_verified);
                if(data.user_is_verified){
                    response.json().then(data => {
                        localStorage.setItem('user', true);
                    });
                } else {
                  setMailVerified(false);
                }
            })
            .catch(error => {
                console.error('Error:', error);
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

  if (isAuthenticated === null || mailVerified === null) {
    return (
      null
    );
  }

  if (isAuthenticated && mailVerified) {
    return children;
  } else if (!isAuthenticated ) {
    return navigate('/landing');
  } else {
    return navigate('/mailenviado');
  }
};

export default PrivateRoute;
