import React from 'react';

interface CardProps {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, value, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div 
      className={`card w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner w-full h-full">
        <div className={`card-front ${isMatched ? 'card-matched' : ''} flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold`}>
          {value}
        </div>
        <div className="card-back flex items-center justify-center text-xl">
          ?
        </div>
      </div>
    </div>
  );
};

export default Card;