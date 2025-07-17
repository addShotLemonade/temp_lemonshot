// pages/ConsentPage.tsx
import React from 'react';
import NavBar from '../../components/NavBar.tsx';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import './ConsentPage.css';
import { useNavigate } from 'react-router-dom';

const ConsentPage = () => {

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate('/userinfo');
    };

    return (
      <>
        <NavBar />
        <main className="consent-container">
          <h1>개인정보 처리방침 및 이용약관 동의</h1>
          <p>
            {/* 여기에 동의 내용 텍스트 넣기 */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            {/* 필요에 따라 상세 내용 추가 */}
          </p>
  
          <form className="consent-form">
            <label>
              <input type="checkbox" name="agree" />
              개인정보 처리방침에 동의합니다.
            </label>
            <label>
              <input type="checkbox" name="terms" />
              이용약관에 동의합니다.
            </label>
            <button type="submit" onClick={handleClick}>동의하고 계속하기</button>
          </form>
        </main>
      </>
    );
  };
  
  export default ConsentPage;
  