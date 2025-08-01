import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FinalPage.css';
import NavBar from '../../components/NavBar.tsx';
import sparkle from '../../assets/images/sparkle.svg'; // SVG 직접 import

const FinalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { winner } = location.state || {};
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (winner?.name) {
      fetch('http://127.0.0.1:5000/set_ideal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idealTypeCelebrity: winner.name,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log('✔️ 이상형 연예인 저장 완료:', data))
        .catch((err) => console.error('❌ 저장 실패:', err));
    }

    const timer = setTimeout(() => {
      navigate('/finalmessage');
    }, 10000);

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate, winner]);

  if (!winner) {
    return <div>선택된 이상형 정보가 없습니다.</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="final-container">
        <h1 className="final-title">🎉 최종 {winner.name}을(를) 선택하셨습니다! 🎉</h1>

        <div className="final-image-wrapper">
          <img src={sparkle} alt="Sparkle" className="sparkle sparkle-1" />
          <img src={sparkle} alt="Sparkle" className="sparkle sparkle-2" />
          <img src={winner.image} alt={winner.name} className="final-image" />
          <img src={sparkle} alt="Sparkle" className="sparkle sparkle-3" />
          <img src={sparkle} alt="Sparkle" className="sparkle sparkle-4" />
          <img src={sparkle} alt="Sparkle" className="sparkle sparkle-5" />
          
        </div>

        <div className="progress-bar-wrapper">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-text">마지막 페이지로 이동 중...</p>
      </div>
    </div>
  );
};

export default FinalPage;
