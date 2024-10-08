import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import './PrivateRoute.scss'; 

const DirectiveRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [mailVerified, setMailVerified] = useState(null);
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [school, setSchool] = useState(sessionStorage.getItem('actual_school'));

    if (token === "" || token === null) {
        navigate('/landing');
    }

    useEffect(() => {
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
                    const userResponse = await fetch('http://127.0.0.1:8000/api/isVerified/', {
                        method: "GET",
                        headers: {
                            'Authorization': 'Token ' + token,
                            'School-ID': school,
                        },
                    });
                    const userData = await userResponse.json();
                    setMailVerified(userData.user_is_verified);

                    if (userData.user_is_verified) {
                        const rolesResponse = await fetch('http://127.0.0.1:8000/api/school/myroles/', {
                            method: "GET",
                            headers: {
                                'Authorization': 'Token ' + token,
                                'School-ID': school,
                            },
                        });
                        const rolesData = await rolesResponse.json();

                        if ((sessionStorage.getItem('rol') === "Directivo" && JSON.stringify(rolesData).includes("Directivo")) ||
                            (sessionStorage.getItem('rol') === "Preceptor" && JSON.stringify(rolesData).includes("Preceptor"))) {
                            setIsAuthenticated(true);
                            localStorage.setItem('user', true);
                        } else {
                            setIsAuthenticated(false);
                        }
                    } else {
                        setMailVerified(false);
                    }
                } else {
                    setIsAuthenticated(false);
                    navigate('/landing');
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
                navigate('/landing');
            }
        };

        verifyToken();
    }, [navigate, token, school]);

    if (isAuthenticated === null || mailVerified === null) {
        return (
            null
        );
    }

    if (isAuthenticated && mailVerified) {
        return children;
    } else if (!isAuthenticated) {
        navigate('/perfil');
    } else {
        navigate('/mailenviado');
    }
};

export default DirectiveRoute;
