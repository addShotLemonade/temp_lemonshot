import React, { useState } from 'react';
import NavBar from '../../components/NavBar.tsx';
import { useNavigate } from 'react-router-dom';
import './ConsentPage.css';

const ConsentPage = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // submit 기본 동작 방지

    if (!agree || !terms) {
      alert('개인정보 수집에 동의해주세요.');
      return;
    }
    navigate('/userinfo');
  };

  return (
    <>
      <NavBar />
      <main className="consent-container">
        <h1>개인정보 처리방침 및 이용약관 동의</h1>

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
          <button type="submit" onClick={handleClick}>동의하고 계속하기</button>
        </form>
      </main>
    </>
  );
};

export default ConsentPage;
