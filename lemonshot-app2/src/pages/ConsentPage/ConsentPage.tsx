import React, { useState } from 'react';
import NavBar2 from './NavBar2.tsx';
import { useNavigate } from 'react-router-dom';
import './ConsentPage.css';

import backBtn from '../../assets/images/back-button.svg';
import backBtnHover from '../../assets/images/back-button-hover.svg';
import nextBtn from '../../assets/images/next-button.svg';
import nextBtnHover from '../../assets/images/next-button-hover.svg';


const ConsentPage = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [terms, setTerms] = useState(false);
  const [backHover, setBackHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // submit 기본 동작 방지

    if (!agree || !terms) {
      alert('개인정보 수집 동의서에 모두 동의해주세요.');
      return;
    }
    navigate('/userinfo');
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동 (혹은 원하는 경로)
  };

  return (
    <div className="page-wrapper">
      <NavBar2 />
      <main className="consent-container">
        <h1 className="consent-title">개인정보 처리방침 및 이용약관 동의</h1>


        <div className="consent-text-frame">
          <p>
            {/* 실제 개인정보 처리방침 예시 텍스트 */}
            개인정보 처리방침 안내문입니다. 본 약관은 서비스 이용 시 개인정보 보호를 위하여 반드시 동의해야 합니다.
            <br /><br />
            1. 수집하는 개인정보 항목<br />
            - 이름, 연락처, 나이, 성별 등<br /><br />
            2. 개인정보 이용 목적<br />
            - 서비스 제공 및 개선, 고객 관리 등<br /><br />
            3. 개인정보 보유 기간<br />
            - 수집일로부터 5년간 보유하며 이후 파기<br /><br />
            4. 개인정보 제3자 제공 동의<br />
            - 관련 법령에 따른 경우 외 제3자에게 제공하지 않습니다.<br /><br />
            5. 이용자의 권리<br />
            - 언제든지 개인정보 열람, 정정, 삭제 요청 가능<br /><br />
            상세 내용은 홈페이지 개인정보처리방침을 참고해 주세요.
          </p>
        </div>

        <form className="consent-form">
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
            />
            개인정보 처리방침에 동의합니다.
          </label>
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={terms}
              onChange={e => setTerms(e.target.checked)}
            />
            이용약관에 동의합니다.
          </label>
          <div className="button-group">
            {/* 이전 단계 버튼 */}
            <button
              type="button"
              className="img-button"
              onClick={handleBackClick}
              onMouseEnter={() => setBackHover(true)}
              onMouseLeave={() => setBackHover(false)}
              aria-label="이전 단계"
            >
              <img src={backHover ? backBtnHover : backBtn} alt="이전 단계" />
            </button>

            {/* 다음 단계 버튼 */}
            <button
              type="submit"
              className="img-button"
              onClick={handleNextClick}
              onMouseEnter={() => setNextHover(true)}
              onMouseLeave={() => setNextHover(false)}
              aria-label="다음 단계"
            >
              <img src={nextHover ? nextBtnHover : nextBtn} alt="다음 단계" />
            </button>
          </div>
        </form>

      </main>
    
    </div>
  );
};

export default ConsentPage;
