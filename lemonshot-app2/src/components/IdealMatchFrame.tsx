// src/components/IdealMatchFrame.tsx
import React from 'react';
import './IdealMatchFrame.css';

type Candidate = {
  name: string;
  image: string;
};

type Props = {
  left: Candidate;
  right: Candidate;
  onSelect: (winner: Candidate) => void;
};

const IdealMatchFrame = ({ left, right, onSelect }: Props) => {
  return (
    <div className="match-frame">
      <div className="candidate" onClick={() => onSelect(left)}>
        <img src={left.image} alt={left.name} />
        <p>{left.name}</p>
      </div>
      <div className="vs-text">VS</div>
      <div className="candidate" onClick={() => onSelect(right)}>
        <img src={right.image} alt={right.name} />
        <p>{right.name}</p>
      </div>
    </div>
  );
};

export default IdealMatchFrame;
