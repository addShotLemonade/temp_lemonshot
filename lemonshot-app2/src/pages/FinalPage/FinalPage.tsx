import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FinalPage.css';
import NavBar from '../../components/NavBar.tsx';

const FinalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { winner } = location.state || {};
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // ✅ POST: 이상형 연예인만 업데이트
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

    // 10초 후 이동
    const timer = setTimeout(() => {
      navigate('/finalmessage');
    }, 10000);

    // 로딩바 진행
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100); // 10초 동안 0 → 100%

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate, winner]);

  if (!winner) {
    return <div>선택된 이상형 정보가 없습니다.</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>최종 {winner.name}을(를) 선택하셨습니다!</h1>
        <img src={winner.image} alt={winner.name} className="final-image" />
        <div className="progress-bar-wrapper">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p>결과 페이지로 이동 중...</p>
      </div>
    </>
  );
};

export default FinalPage;
