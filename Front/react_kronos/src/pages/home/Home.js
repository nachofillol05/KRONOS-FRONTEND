import React from 'react';
import Navegacion from '../../layout/navegacion/navegaciones';
import { useNavigate } from 'react-router-dom';
import {useState } from 'react';
import Button from '../../components/button/buttons';

export default function Home() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([{}]);
    fetch('http://localhost:8000/Kronosapp/verifyToken/', {
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
                console.log('No es valido el token');
                navigate('/login'); 
            }
            if (response.status === 200) {
                console.log('funciono el token');
                setUserData(response.data);
            }
            else {
                navigate('/login');
            }
        })
    function logOut(){
        console.log('logout')
        localStorage.setItem('token', '');
    }

    return (
        <React.StrictMode>
            <Navegacion>
                <Button life/>
            </Navegacion>
        </React.StrictMode>
);
}
