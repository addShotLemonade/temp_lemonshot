import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalMessagePage.css';
import '../../assets/fonts/fonts.css';
import NavBar from '../../components/NavBar.tsx';

import LetterOuter from '../../assets/images/letterouter.svg';
import LetterInner from '../../assets/images/letterinner.svg';
import LetterFront from '../../assets/images/letterouter-front.svg'; // 새로 추가된 앞면 덮개

const FinalMessagePage = () => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpened(true);
    }, 1000); // 1초 후 슬라이드
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavBar />
          <div className="final-message-page">
      <div className="envelope-stack">
        <img src={LetterOuter} alt="Envelope Back" className="layer back" />
        
        <div className={`layer inner-wrapper ${opened ? 'slide-up' : ''}`}>
          <img
            src={LetterInner}
            alt="Letter Inner"
            className="layer inner-img"
          />
          <div className="inner-text">
            데모데이 이후 순차적으로<br />
            매칭 결과를 전달드릴 예정이니<br />
            조금만 기다려 주세요 :)<br />
            감사합니다!
          </div>
        </div>

        <img src={LetterFront} alt="Envelope Front Flap" className="layer front" />
      </div>

      <button className="home-button" onClick={() => navigate('/')}>
        처음으로
      </button>
    </div>
        
    </>
  );
};

export default FinalMessagePage;
