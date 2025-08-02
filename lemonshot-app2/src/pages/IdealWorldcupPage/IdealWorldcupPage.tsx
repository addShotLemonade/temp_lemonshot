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
  { name: '서강준', image: '/images/male/서강준.png' },
  { name: '방탄소년단_제이홉', image: '/images/male/방탄소년단_제이홉.png' },
  { name: '세븐틴_조슈아', image: '/images/male/세븐틴_조슈아.png' },
  { name: '세븐틴_에스쿱스', image: '/images/male/세븐틴_에스쿱스.png' },
  { name: '보이넥스트도어_성호', image: '/images/male/보이넥스트도어_성호.png' },
  { name: '몬스타엑스_아이엠', image: '/images/male/몬스타엑스_아이엠.png' },
  { name: '방탄소년단_정국', image: '/images/male/방탄소년단_정국.png' },
  { name: '보이넥스트도어_태산', image: '/images/male/보이넥스트도어_태산.png' },
  { name: '방탄소년단_진', image: '/images/male/방탄소년단_진.png' },
  { name: '엔시티_천러', image: '/images/male/엔시티_천러.png' },
  { name: '엔시티_재희', image: '/images/male/엔시티_재희.png' },
  { name: '엔시티_텐', image: '/images/male/엔시티_텐.png' },
  { name: '엔시티_마크', image: '/images/male/엔시티_마크.png' },
  { name: '방탄소년단_RM', image: '/images/male/방탄소년단_RM.png' },
  { name: '몬스타엑스_기현', image: '/images/male/몬스타엑스_기현.png' },
  { name: '엔시티_유우시', image: '/images/male/엔시티_유우시.png' },
  { name: '세븐틴_원우', image: '/images/male/세븐틴_원우.png' },
  { name: '세븐틴_도겸', image: '/images/male/세븐틴_도겸.png' },
  { name: '엔시티_시온', image: '/images/male/엔시티_시온.png' },
  { name: '방탄소년단_지민', image: '/images/male/방탄소년단_지민.png' },
  { name: '라이즈_은석', image: '/images/male/라이즈_은석.png' },
  { name: '몬스타엑스_셔누', image: '/images/male/몬스타엑스_셔누.png' },
  { name: '세븐틴_호시', image: '/images/male/세븐틴_호시.png' },
  { name: '엔시티_태용', image: '/images/male/엔시티_태용.png' },
  { name: '방탄소년단_슈가', image: '/images/male/방탄소년단_슈가.png' },
  { name: '세븐틴_디에잇', image: '/images/male/세븐틴_디에잇.png' },
  { name: '라이즈_성찬', image: '/images/male/라이즈_성찬.png' },
  { name: '보이넥스트도어_명재현', image: '/images/male/보이넥스트도어_명재현.png' },
  { name: '엔시티_도영', image: '/images/male/엔시티_도영.png' },
  { name: '세븐틴_승관', image: '/images/male/세븐틴_승관.png' },
  { name: '몬스타엑스_주헌', image: '/images/male/몬스타엑스_주헌.png' },
  { name: '엔시티_쿤', image: '/images/male/엔시티_쿤.png' },
  { name: '보이넥스트도어_이한', image: '/images/male/보이넥스트도어_이한.png' },
  { name: '방탄소년단_뷔', image: '/images/male/방탄소년단_뷔.png' },
  { name: '엔시티_런쥔', image: '/images/male/엔시티_런쥔.png' },
  { name: '엔시티_해찬', image: '/images/male/엔시티_해찬.png' },
  { name: '엔시티_리쿠', image: '/images/male/엔시티_리쿠.png' },
  { name: '세븐틴_버논', image: '/images/male/세븐틴_버논.png' },
  { name: '박해진', image: '/images/male/박해진.png' },
  { name: '이광수', image: '/images/male/이광수.png' },
  { name: '송승헌', image: '/images/male/송승헌.png' },
  { name: '변우석', image: '/images/male/변우석.png' },
  { name: '윤시윤', image: '/images/male/윤시윤.png' },
  { name: '김동욱', image: '/images/male/김동욱.png' },
  { name: '안효섭', image: '/images/male/안효섭.png' },
  { name: '박형식', image: '/images/male/박형식.png' },
  { name: '송중기', image: '/images/male/송중기.png' },
  { name: '김영광', image: '/images/male/김영광.png' },
  { name: '공유', image: '/images/male/공유.png' },
  { name: '박서준', image: '/images/male/박서준.png' },
  { name: '박보검', image: '/images/male/박보검.png' },
  { name: '송강', image: '/images/male/송강.png' },
  { name: '김우빈', image: '/images/male/김우빈.png' },
  { name: '엔시티_재민', image: '/images/male/엔시티_재민.png' },
  { name: '엔시티_샤오쥔', image: '/images/male/엔시티_샤오쥔.png' },
  { name: '보이넥스트도어_운학', image: '/images/male/보이넥스트도어_운학.png' },
  { name: '엔시티_쟈니', image: '/images/male/엔시티_쟈니.png' },
  { name: '엔시티_유타', image: '/images/male/엔시티_유타.png' },
  { name: '세븐틴_정한', image: '/images/male/세븐틴_정한.png' },
  { name: '몬스타엑스_민혁', image: '/images/male/몬스타엑스_민혁.png' },
  { name: '세븐틴_준', image: '/images/male/세븐틴_준.png' },
  { name: '엔시티_재현', image: '/images/male/엔시티_재현.png' },
  { name: '몬스타엑스_형원', image: '/images/male/몬스타엑스_형원.png' },
  { name: '원빈', image: '/images/male/원빈.png' },
  { name: '엔시티_윈윈', image: '/images/male/엔시티_윈윈.png' },
  { name: '라이즈_앤톤', image: '/images/male/라이즈_앤톤.png' },
  { name: '세븐틴_디노', image: '/images/male/세븐틴_디노.png' },
  { name: '라이즈_원빈', image: '/images/male/라이즈_원빈.png' },
  { name: '강하늘', image: '/images/male/강하늘.png' },
  { name: '엔시티_정우', image: '/images/male/엔시티_정우.png' },
  { name: '세븐틴_민규', image: '/images/female/세븐틴_민규.png' },
  { name: '보이넥스트도어_리우', image: '/images/female/보이넥스트도어_리우.png' }
];

const femaleCandidates: Candidate[] = [
  { name: '김태리', image: '/images/female/김태리.png' },
  { name: '김채원', image: '/images/female/김채원.png' },
  { name: '고윤정', image: '/images/female/고윤정.png' },
  { name: '김민주', image: '/images/female/김민주.png' },
  { name: '김태희', image: '/images/female/김태희.png' },
  { name: '나연', image: '/images/female/나연.png' },
  { name: '노윤서', image: '/images/female/노윤서.png' },
  { name: '민지', image: '/images/female/민지.png' },
  { name: '리사', image: '/images/female/리사.png' },
  { name: '미연', image: '/images/female/미연.png' },
  { name: '로제', image: '/images/female/로제.png' },
  { name: '닝닝', image: '/images/female/닝닝.png' },
  { name: '박신혜', image: '/images/female/박신혜.png' },
  { name: '박보영', image: '/images/female/박보영.png' },
  { name: '설윤', image: '/images/female/설윤.png' },
  { name: '백지헌', image: '/images/female/백지헌.png' },
  { name: '사나', image: '/images/female/사나.png' },
  { name: '슬기', image: '/images/female/슬기.png' },
  { name: '신세경', image: '/images/female/신세경.png' },
  { name: '안유진', image: '/images/female/안유진.png' },
  { name: '아이유', image: '/images/female/아이유.png' },
  { name: '아린', image: '/images/female/아린.png' },
  { name: '신예은', image: '/images/female/신예은.png' },
  { name: '아이린', image: '/images/female/아이린.png' },
  { name: '김세정', image: '/images/female/김세정.png' },
  { name: '레드벨벳_웬디', image: '/images/female/레드벨벳_웬디.png' },
  { name: 'ITZY_리아', image: '/images/female/ITZY_리아.png' },
  { name: '레드벨벳_조이', image: '/images/female/레드벨벳_조이.png' },
  { name: '고민시', image: '/images/female/고민시.png' },
  { name: '르세라핌_사쿠라', image: '/images/female/르세라핌_사쿠라.png' },
  { name: '배우_김유정', image: '/images/female/배우_김유정.png' },
  { name: '르세라핌_허윤진', image: '/images/female/르세라핌_허윤진.png' },
  { name: '르세라핌_홍은채', image: '/images/female/르세라핌_홍은채.png' },
  { name: '비비지_엄지', image: '/images/female/비비지_엄지.png' },
  { name: '배우_정호연', image: '/images/female/배우_정호연.png' },
  { name: '손나은', image: '/images/female/손나은.png' },
  { name: '비비지_은하', image: '/images/female/비비지_은하.png' },
  { name: '스테이씨_세은', image: '/images/female/스테이씨_세은.png' },
  { name: '비비지_신비', image: '/images/female/비비지_신비.png' },
  { name: '엔믹스_배이', image: '/images/female/엔믹스_배이.png' },
  { name: '스테이씨_수민', image: '/images/female/스테이씨_수민.png' },
  { name: '배우_한소희', image: '/images/female/배우_한소희.png' },
  { name: '엔믹스_규진', image: '/images/female/엔믹스_규진.png' },
  { name: '스테이씨_윤', image: '/images/female/스테이씨_윤.png' },
  { name: '엔믹스_릴리', image: '/images/female/엔믹스_릴리.png' },
  { name: '스테이씨_시은', image: '/images/female/스테이씨_시은.png' },
  { name: '에이핑크_정은지', image: '/images/female/에이핑크_정은지.png' },
  { name: '엔믹스_지우', image: '/images/female/엔믹스_지우.png' },
  { name: '키스오브라이프_나띠', image: '/images/female/키스오브라이프_나띠.png' },
  { name: '키스오브라이프_벨', image: '/images/female/키스오브라이프_벨.png' },
  { name: '스테이씨_아이사', image: '/images/female/스테이씨_아이사.png' },
  { name: '애프터스쿨_유이', image: '/images/female/애프터스쿨_유이.png' },
  { name: '스테이씨_재이', image: '/images/female/스테이씨_재이.png' },
  { name: '신시아', image: '/images/female/신시아.png' },
  { name: '키스오브라이프_줄리', image: '/images/female/키스오브라이프_줄리.png' },
  { name: '트와이스_나연', image: '/images/female/트와이스_나연.png' },
  { name: '윈터', image: '/images/female/윈터.png' },
  { name: '이나경', image: '/images/female/이나경.png' },
  { name: '이성경', image: '/images/female/이성경.png' },
  { name: '예리', image: '/images/female/예리.png' },
  { name: '오해원', image: '/images/female/오해원.png' },
  { name: '프로미스나인_박지원', image: '/images/female/프로미스나인_박지원.png' },
  { name: '트와이스_정연', image: '/images/female/트와이스_정연.png' },
  { name: '트와이스_쯔위', image: '/images/female/트와이스_쯔위.png' },
  { name: '트와이스_지효', image: '/images/female/트와이스_지효.png' },
  { name: '트와이스_채영', image: '/images/female/트와이스_채영.png' },
  { name: '키스오브라이프_하늘', image: '/images/female/키스오브라이프_하늘.png' },
  { name: '프로미스나인_이새롬', image: '/images/female/프로미스나인_이새롬.png' },
  { name: '프로미스나인_이서연', image: '/images/female/프로미스나인_이서연.png' },
  { name: '프로미스나인_장규리', image: '/images/female/프로미스나인_장규리.png' },
  { name: '전종서', image: '/images/female/전종서.png' },
  { name: '제니', image: '/images/female/제니.png' },
  { name: '이채영', image: '/images/female/이채영.png' },
  { name: '전지현', image: '/images/female/전지현.png' },
  { name: '장원영', image: '/images/female/장원영.png' },
  { name: '태연', image: '/images/female/태연.png' },
  { name: '지수', image: '/images/female/지수.png' },
  { name: '카리나', image: '/images/female/카리나.png' },
  { name: '지젤', image: '/images/female/지젤.png' },
  { name: '츄', image: '/images/female/츄.png' },
  { name: '카즈하', image: '/images/female/카즈하.png' },
  { name: '혜인', image: '/images/female/혜인.png' },
  { name: '해린', image: '/images/female/해린.png' },
  { name: '하니', image: '/images/female/하니.png' },

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
