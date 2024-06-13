import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const [userData, setUserData] = useState([{}]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
    fetch('http://localhost:8000/api/verifyToken/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": localStorage.getItem('token'),
            })
        })
        .then(response => {
            if (!response.ok) {
              navigate('/login');
            }
            if (response.status === 200) {
              console.log('funciono el token');
              setIsAuthenticated(true);
              
              
            }
            else {
              navigate('/login');
            }
        })
        if (isAuthenticated) {
          return <>{children}</>;
        }
        
  
};

export default PrivateRoute;