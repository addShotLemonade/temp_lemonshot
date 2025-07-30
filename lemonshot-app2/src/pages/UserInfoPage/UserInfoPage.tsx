import NavBar from '../../components/NavBar.tsx';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import './UserInfoPage.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const UserInfoPage = () => {
    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [gender, setGender] = useState(''); // 'male' or 'female'
    const [age, setAge] = useState('');
    const [usePhone, setUsePhone] = useState(true);
    const [phone, setPhone] = useState('');
    const [instagram, setInstagram] = useState('');
    const [error, setError] = useState('');

   

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
          console.log({ name, gender, age, phone, instagram });
          // 다음 페이지로 이동하거나 서버로 전송

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
        <>
        <NavBar />
        <div className="userinfo-container">
            <div className="userinfo-header">
                <h2>개인정보 입력</h2>
            </div>
            <div className="userinfo-form">
                <label>이름를 입력해주세요</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />

                <label>성별을 입력해주세요</label>
                <div>
                    <button
                    className={gender === 'male' ? 'selected' : ''}
                    onClick={() => setGender('male')}
                    >
                    남성
                    </button>
                    <button
                    className={gender === 'female' ? 'selected' : ''}
                    onClick={() => setGender('female')}
                    >
                    여성
                    </button>
                </div>

                <label>나이를 입력해주세요</label>
                <input
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
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                    />
                    </>
                )}

                {error && <p className="error-text">{error}</p>}
                   
            <div className="button-group">
                <button onClick={() => navigate(-1)}>이전단계</button>
                <button onClick={handleSubmit}>완료하기</button>
            </div>

            </div>     
        </div>
        </>
        
          
        
      );
};

export default UserInfoPage;


