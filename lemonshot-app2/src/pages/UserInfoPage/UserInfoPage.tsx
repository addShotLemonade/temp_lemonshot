import NavBar from '../../components/NavBar.tsx';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './UserInfoPage.css';
import '../../assets/fonts/fonts.css';

import backBtn from '../../assets/images/back-button.svg';
import backBtnHover from '../../assets/images/back-button-hover.svg';
import nextBtn from '../../assets/images/next-button.svg';
import nextBtnHover from '../../assets/images/next-button-hover.svg';

const UserInfoPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [usePhone, setUsePhone] = useState(true);
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState('');
  const [genderHover, setGenderHover] = useState('');
  const [backHover, setBackHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  const validatePhone = (phone: string) => {
    const regex = /^010-\d{4}-\d{4}$/;
    return regex.test(phone);
  };

  const handleSubmit = () => {
    if (!name || !gender || !age || (usePhone ? !phone : !instagram)) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }
    if (usePhone && !validatePhone(phone)) {
      setError('전화번호는 010-xxxx-xxxx 형식이어야 합니다.');
      return;
    }

    setError('');
    navigate('/camera', {
      state: {
        name,
        gender,
        age,
        contact: usePhone ? phone : instagram,
        contactType: usePhone ? 'phone' : 'instagram',
      },
    });
  };

  return (
    <div className="userinfo-page-wrapper">
      <NavBar />
      <div className="userinfo-container">
        <div className="userinfo-header">
          <h2>개인정보 입력</h2>
        </div>

        <div className="userinfo-form">
          <label>이름을 입력해주세요</label>
          <input
            className="input-long"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>성별을 입력해주세요</label>
          <div className="gender-buttons">
            <button
              className={`input-short gender-box ${gender === 'male' ? 'selected' : ''}`}
              onClick={() => setGender('male')}
              onMouseEnter={() => setGenderHover('male')}
              onMouseLeave={() => setGenderHover('')}
            >
              <span className={`gender-label ${genderHover === 'male' ? 'hovered' : ''}`}>
                남자
              </span>
            </button>

            <button
              className={`input-short gender-box ${gender === 'female' ? 'selected' : ''}`}
              onClick={() => setGender('female')}
              onMouseEnter={() => setGenderHover('female')}
              onMouseLeave={() => setGenderHover('')}
            >
              <span className={`gender-label ${genderHover === 'female' ? 'hovered' : ''}`}>
                여자
              </span>
            </button>
          </div>

          <label>나이를 입력해주세요</label>
          <input
            className="input-short"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <div className="toggle-contact">
            <button onClick={() => setUsePhone(true)} className={usePhone ? 'selected' : ''}>
              전화번호로 입력
            </button>
            <button onClick={() => setUsePhone(false)} className={!usePhone ? 'selected' : ''}>
              인스타 아이디로 입력
            </button>
          </div>

          {usePhone ? (
            <>
              <label>전화번호</label>
              <input
                className="input-long"
                type="text"
                value={phone}
                placeholder="010-xxxx-xxxx"
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          ) : (
            <>
              <label>인스타그램 아이디</label>
              <input
                className="input-long"
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </>
          )}

          {error && <p className="error-text">{error}</p>}

          <div className="button-group">
            <img
              src={backHover ? backBtnHover : backBtn}
              alt="이전 단계"
              className="svg-button"
              onClick={() => navigate(-1)}
              onMouseEnter={() => setBackHover(true)}
              onMouseLeave={() => setBackHover(false)}
            />
            <img
              src={nextHover ? nextBtnHover : nextBtn}
              alt="다음 단계"
              className="svg-button"
              onClick={handleSubmit}
              onMouseEnter={() => setNextHover(true)}
              onMouseLeave={() => setNextHover(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
