// pages/FinalPage.tsx
import React from 'react';
import NavBar from '../../components/NavBar.tsx';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import './FinalPage.css'
import { useNavigate } from 'react-router-dom';


const FinalPage = () => {

    const navigate = useNavigate();

    const handleStartClick = () =>{
        navigate('/');
    };

    return (
        <>  
            
            
            <h1>마지막 성공!</h1>

        </>
    )
}

export default FinalPage;