// pages/LandingPage.tsx
import React from 'react';
// import NavBer from '../components/NavBar';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import './LandingPage.css'
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {

    const navigate = useNavigate();

    const handleStartClick = () =>{
        navigate('/consent');
    };

    return (
        <div className="landing-container">
            {/* 자유 배치 아이콘들 */}
            <img className="landingItem1" src="/assets/landingpage-1.png" alt="1" />
            <img className="landingItem2" src="/assets/landingpage.png" alt="2" />
            <img className="landingItem3" src="/assets/landingpage.png" alt="3" />
            <img className="landingItem4" src="/assets/landingpage-4.png" alt="4" />
            <img className="landingItem5" src="/assets/landingpage.png" alt="5" />
        
            {/* 메인 텍스트와 버튼 */}
            <div className="landingText">
            <img src="/assets/logo.svg" alt="로고" />
            <h1 className="MainText">사랑찾아 데모데이</h1>
            <h3 className="SubText">이상형을 매칭해드립니다!!</h3>
            </div>

            <button className="start-button" onClick={handleStartClick}>
            <img className="start-bg" src="/assets/landing-startbutton.png" alt="버튼배경" />
                <span className="start-text">시작하기</span>
                <img className="start-heart" src="/assets/landing-startbutton-hearts.png" alt="하트" />
            </button>

            
        </div>
    )
}

export default LandingPage;