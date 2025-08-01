import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar.tsx';
import vsIcon from '../../assets/images/vsicon.svg';
import pickHoverIcon from '../../assets/images/pick-hover.svg';
import './IdealWorldcupPage.css';

type Candidate = {
  name: string;
  image: string;
};

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
    setCandidates(shuffled.slice(0, 4)); // 4명 테스트용
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
            idealTypeCelebrity: nextWinners[0].name,
          },
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
      <div className="worldcup-wrapper">
        <div className="worldcup-title">이상형 월드컵</div>
        <div className="round-indicator">
          <div className="current-match">{Math.floor(round / 2) + 1}번째 대결</div>
          <div className="total-round">/ {candidates.length}강</div>
        </div>

        <div className="match-area">
          {/* 왼쪽 후보 */}
          <div
            className="candidate-card"
            onClick={() => handleSelect(left)}
            role="button"
            tabIndex={0}
            aria-label={`선택 ${left.name}`}
          >
            <img src={left.image} alt={left.name} className="candidate-image" />
            <div className="overlay-red" />
            <img src={pickHoverIcon} alt="Pick Hover" className="pick-hover-icon" />
            <div className="candidate-info">
              <div className="candidate-name">{left.name}</div>
            </div>
          </div>

          {/* vs 아이콘 */}
          <img src={vsIcon} alt="vs" className="vs-icon" />

          {/* 오른쪽 후보 */}
          <div
            className="candidate-card"
            onClick={() => handleSelect(right)}
            role="button"
            tabIndex={0}
            aria-label={`선택 ${right.name}`}
          >
            <img src={right.image} alt={right.name} className="candidate-image" />
            <div className="overlay-red" />
            <img src={pickHoverIcon} alt="Pick Hover" className="pick-hover-icon" />
            <div className="candidate-info">
              <div className="candidate-name">{right.name}</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default IdealWorldcupPage;
