import React, { useState, useEffect } from 'react';
import Card from './Card';
import { shuffleArray } from '../utils/gameUtils';

interface GameBoardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onGameComplete: (moves: number, time: number) => void;
}

interface CardType {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ difficulty, onGameComplete }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameTime, setGameTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // Set up game based on difficulty
  useEffect(() => {
    setupGame();
  }, [difficulty]);

  const setupGame = () => {
    let symbols: string[] = [];
    let pairsCount = 0;
    
    switch (difficulty) {
      case 'easy':
        symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];
        pairsCount = 6;
        break;
      case 'medium':
        symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁'];
        pairsCount = 10;
        break;
      case 'hard':
        symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🦄'];
        pairsCount = 12;
        break;
    }

    // Create pairs of cards
    const cardPairs = symbols.slice(0, pairsCount).flatMap((symbol) => [
      { id: Math.random(), value: symbol, isFlipped: false, isMatched: false },
      { id: Math.random(), value: symbol, isFlipped: false, isMatched: false }
    ]);

    // Shuffle the cards
    setCards(shuffleArray(cardPairs));
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameTime(0);
    setGameStarted(false);
    
    // Clear existing timer
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  useEffect(() => {
    // Check if all pairs are matched
    if (matchedPairs > 0 && matchedPairs === cards.length / 2) {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      onGameComplete(moves, gameTime);
    }
  }, [matchedPairs, cards.length, onGameComplete, moves, gameTime, timerId]);

  const handleCardClick = (id: number) => {
    // Start the timer on first card click
    if (!gameStarted) {
      setGameStarted(true);
      const timer = setInterval(() => {
        setGameTime(prevTime => prevTime + 1);
      }, 1000);
      setTimerId(timer);
    }

    // Don't allow more than 2 cards to be flipped at once
    if (flippedCards.length === 2) return;
    
    // Don't allow the same card to be flipped twice
    if (flippedCards.includes(id)) return;

    // Flip the card
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    // Add card to flipped cards
    setFlippedCards(prev => [...prev, id]);

    // If two cards are flipped, check for a match
    if (flippedCards.length === 1) {
      setMoves(prevMoves => prevMoves + 1);
      
      // Get the values of both flipped cards
      const firstCardId = flippedCards[0];
      const secondCardId = id;
      
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      // Check if cards match
      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Mark cards as matched
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          )
        );
        
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        // If no match, flip cards back after a delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  // Determine grid columns based on difficulty
  const gridCols = difficulty === 'easy' 
    ? 'grid-cols-3' 
    : difficulty === 'medium' 
      ? 'grid-cols-4' 
      : 'grid-cols-4 md:grid-cols-6';

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">Moves: {moves}</p>
        <p className="text-lg font-semibold">Time: {gameTime}s</p>
      </div>
      
      <div className={`grid ${gridCols} gap-3 md:gap-4`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            value={card.value}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={handleCardClick}
          />
        ))}
      </div>
      
      <button 
        onClick={setupGame}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
      >
        Reset Game
      </button>
    </div>
  );
};

export default GameBoard;