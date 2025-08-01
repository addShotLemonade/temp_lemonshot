import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar.tsx';
import './Success.css';
import '../../assets/fonts/fonts.css';

import successIcon from '../../assets/images/successicon.svg';
import heartGif from '../../assets/images/emoji-hearts.gif';

import backIcon from '../../assets/images/back-button.svg';
import backHoverIcon from '../../assets/images/back-button-hover.svg';

import nextIcon from '../../assets/images/next-button.svg';
import nextHoverIcon from '../../assets/images/next-button-hover.svg';

import confetti from 'canvas-confetti';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, gender, age, contact, contactType } = location.state || {};

  const [showFinalText, setShowFinalText] = useState(false);
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  useEffect(() => {
    // 축하 이펙트
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      zIndex: 1000,
    });

    const timer = setTimeout(() => {
      setShowFinalText(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartWorldcup = () => {
    navigate('/idealworldcup', {
      state: { name, gender, age, contact, contactType }
    });
  };

  const handleGoHome = () => {
    navigate('/camera');
  };

  return (
    <div className="page-wrapper">
      <NavBar />

      <div className="success-container">
        {!showFinalText && (
          <>
            <img
              src={successIcon}
              alt="성공"
              className="success-icon animate fade-in delay-1 fade-out-late"
            />
            <h3 className="fade-in delay-1 red-text fade-out-late">🎉 얼굴 인식 완료</h3>
            <h1 className="fade-in delay-2 white-text fade-out-late">{name}님, 환영해요</h1>
          </>
        )}

        {showFinalText && (
          <>
            <img src={heartGif} alt="하트" className="heart-gif fade-in delay-1" />
            <h2 className="fade-in delay-1 white-text new-message">
              잠시 후 이상형 월드컵이 진행됩니다!
            </h2>
            <h4 className="fade-in delay-2 white-text new-message-2">
              두 개의 사진 중 하나를 선택해주시길 바랍니다.
            </h4>

            <div className="button-group fade-in delay-3">
              <img
                src={hoverBack ? backHoverIcon : backIcon}
                className="svg-button"
                alt="처음으로"
                onClick={handleGoHome}
                onMouseOver={() => setHoverBack(true)}
                onMouseOut={() => setHoverBack(false)}
              />
              <img
                src={hoverNext ? nextHoverIcon : nextIcon}
                className="svg-button"
                alt="월드컵 시작"
                onClick={handleStartWorldcup}
                onMouseOver={() => setHoverNext(true)}
                onMouseOut={() => setHoverNext(false)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
