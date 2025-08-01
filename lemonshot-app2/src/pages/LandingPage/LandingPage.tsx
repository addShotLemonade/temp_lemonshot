// pages/LandingPage.tsx
// import NavBer from '../components/NavBar';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import './LandingPage.css'
import { useNavigate } from 'react-router-dom';
import '../../assets/fonts/fonts.css';



const LandingPage = () => {
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();

    const handleStartClick = () =>{
        navigate('/consent');
    };

    return (
        
        <div className="landing-container">
            {/* 자유 배치 아이콘들 */}
            <img className="landingItem1" src="/assets/landingpage-1.svg" alt="1" />
            <img className="landingItem2" src="/assets/landingpage-3.svg" alt="2" />
            <img className="landingItem3" src="/assets/landingpage-1.svg" alt="3" />
            <img className="landingItem4" src="/assets/landingpage-4.svg" alt="4" />
            <img className="landingItem5" src="/assets/landingpage-5.svg" alt="5" />
            <img className="landingItem6" src="/assets/landingpage-1.svg" alt="1" />
            <img className="landingItem7" src="/assets/landingpage-1.svg" alt="1" />
        
            {/* 메인 텍스트와 버튼 */}
            <div className="landingText">
            
            <img src = "/assets/logo.svg" alt="로고" />

            </div>
            <h1 className="MainText">사랑찾아 데모데이</h1>
            <h3 className="SubText">이상형을 매칭해드립니다!!</h3>
            

            <button
                className="start-button"
                onClick={handleStartClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                >
                <img
                    className="start-bg"
                    src={
                    isHovering
                        ? '/assets/landing-startbutton-hover.svg'
                        : '/assets/landing-startbutton.svg'
                    }
                    alt="버튼배경"
                />
                
                
            </button>

            
        </div>

        
    )
}

export default LandingPage;