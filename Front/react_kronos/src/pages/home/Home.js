import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState } from 'react';
import Button from '../../components/button/buttons';

export default function Home() {
    const navigate = useNavigate();
    
    function logOut(){
        console.log('logout')
        localStorage.setItem('token', '');
    }

    return (
            <>
            
            </>
);
}
