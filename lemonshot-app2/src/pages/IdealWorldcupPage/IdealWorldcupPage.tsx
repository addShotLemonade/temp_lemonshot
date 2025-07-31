// C:\Users\yiuri\OneDrive\문서\GitHub\temp_lemonshot\lemonshot-app2\src\pages\IdealWorldcupPage\IdealWorldcupPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar.tsx';
import IdealMatchFrame from '../../components/IdealMatchFrame'; 
import './IdealWorldcupPage.css';


type Candidate = {
  name: string;
  image: string;
};

// // 테스트용 후보 -> TODO: 이거 다른 파일에 정리하기
const maleCandidates: Candidate[] = [
  { name: '송강', image: '/images/male/송강.png' },
  { name: '변우석', image: '/images/male/변우석.png' },
  { name: '김영광', image: '/images/male/김영광.png' },
  { name: '김선호', image: '/images/male/김선호.png' },
  { name: '정해인', image: '/images/female/정해인.png' },
  { name: '박보검', image: '/images/female/박보검.png' },
];
const femaleCandidates: Candidate[] = [
  { name: '아이유', image: '/images/female/아이유.png' },
  { name: '장원영', image: '/images/female/장원영.png' },
  { name: '카리나', image: '/images/female/카리나.png' },
  { name: '박보영', image: '/images/female/박보영.png' },
  { name: '한소희', image: '/images/female/한소희.png' },
  { name: '설윤', image: '/images/female/설윤.png' },
];

// 셔플 함수
const shuffle = (array: Candidate[]) => [...array].sort(() => Math.random() - 0.5);

const IdealWorldcupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, gender, age, contact, contactType } = location.state || {};

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [round, setRound] = useState(0);
  const [winners, setWinners] = useState<Candidate[]>([]);

  useEffect(() => {
    console.log('넘어온 정보:', name, gender, age, contact, contactType);

    const opponentGender = gender === 'female' ? 'male' : 'female';
    const nameList = opponentGender === 'male' ? maleCandidates : femaleCandidates;
    const shuffled = shuffle(nameList);
    setCandidates(shuffled.slice(0, 4)); // 2명으로 테스트
    setRound(0);
    setWinners([]);
  }, [gender]);

  const handleSelect = (winner: Candidate) => {
    const nextWinners = [...winners, winner];
    const nextRound = round + 2;

    if (nextRound >= candidates.length) {
      if (nextWinners.length === 1) {
        navigate('/final', {
          state: {
            winner: nextWinners[0],
            name,
            gender,
            age,
            contact,
            contactType,
            idealTypeCelebrity: nextWinners[0].name  // ✅ 이거 추가!
          }
        });
      } else {
        setCandidates(nextWinners);
        setWinners([]);
        setRound(0);
      }
    } else {
      setWinners(nextWinners);
      setRound(nextRound);
    }
  };

  if (candidates.length < 2) return <div>Loading...</div>;

  const left = candidates[round];
  const right = candidates[round + 1];


return (
  <>
    <NavBar />
    <div>
      <h2>이상형 월드컵</h2>
      <div className="match-buttons">
        <button onClick={() => handleSelect(left)}>
          <img src={left.image} alt={left.name} />
          <div>{left.name}</div>
        </button>
        <button onClick={() => handleSelect(right)}>
          <img src={right.image} alt={right.name} />
          <div>{right.name}</div>
        </button>
      </div>
      <p className="round-text">{candidates.length}강 - {Math.floor(round / 2) + 1}번째 대결</p>
    </div>
  </>
);

};

export default IdealWorldcupPage;

