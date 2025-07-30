// src/pages/CameraPage/CameraPage.tsx

import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar.tsx';
import './Success.css';

const SuccessPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { name, gender, age, contact, contactType } = location.state || {};

  const handleStartWorldcup = () => {
    navigate('/idealworldcup', {
      state: { name, gender, age, contact, contactType }  
    });
  };;
  
  return (
    <>
      <NavBar />
      <div className="success-container">
        <img src="/images/fireworks.gif" alt="축하" className="success-image" />
        <h1 className="success-title">🎉 얼굴 분석이 완료되었습니다!</h1>
        <div className="success-buttons">
          <button onClick={handleStartWorldcup}>이상형 월드컵 시작</button>
          <button onClick={() => navigate('/')}>처음으로</button>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
