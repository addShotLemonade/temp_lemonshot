// pages/FinalMessagePage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalMessagePage.css';
import NavBar from '../../components/NavBar.tsx';

const FinalMessagePage = () => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpened(true);
    }, 1000); // 1초 후 편지 열림
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavBar />
      <div className="message-container">
        <div className={`envelope ${opened ? 'open' : ''}`}>
          <div className="flap" />
          <div className="letter">
            <p>
              데모데이 이후 순차적으로 <br />
              매칭 결과를 전달드릴 예정이니 <br />
              조금만 기다려 주세요 :)
            </p>
          </div>
        </div>
        <button className="home-button" onClick={() => navigate('/')}>
          처음으로
        </button>
      </div>
    </>
  );
};

export default FinalMessagePage;
