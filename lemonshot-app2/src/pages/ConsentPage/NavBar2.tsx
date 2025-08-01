import React from 'react';
import { useNavigate } from 'react-router-dom';  // 페이지 이동용 훅
import logo2 from './logo2.svg';
import './NavBar2.css';  


const NavBar2 = () => {
  const navigate = useNavigate();

  // 홈으로 이동 (restart 버튼 클릭 시)
  const handleRestart = () => {
    navigate('/');  
  };

  return (
    <nav className="navbar">
      {/* 로고 */}
      <img src={logo2} alt="로고" className="navbar-logo" />

      {/* restart 버튼 */}
      <button className="navbar-restart-button" onClick={handleRestart}>
        Restart
      </button>
    </nav>
  );
};

export default NavBar2;
