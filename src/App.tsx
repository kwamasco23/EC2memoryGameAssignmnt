import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import { formatTime } from './utils/gameUtils';

function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [stats, setStats] = useState({ moves: 0, time: 0 });

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setGameCompleted(false);
  };

  const handleGameComplete = (moves: number, time: number) => {
    setGameCompleted(true);
    setStats({ moves, time });
  };

  const startNewGame = () => {
    setGameCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-blue-400">Memory Card Game</h1>
        <p className="text-gray-300 text-lg sm:text-xl">Match pairs of cards to win!</p>
      </header>

      {gameCompleted ? (
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg mb-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">Game Completed!</h2>
          <div className="text-xl mb-6">
            <p className="mb-2">Moves: <span className="font-bold">{stats.moves}</span></p>
            <p>Time: <span className="font-bold">{formatTime(stats.time)}</span></p>
          </div>
          <button 
            onClick={startNewGame}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex justify-center gap-2 sm:gap-4">
              <button 
                onClick={() => handleDifficultyChange('easy')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  difficulty === 'easy' 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                Easy
              </button>
              <button 
                onClick={() => handleDifficultyChange('medium')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  difficulty === 'medium' 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                Medium
              </button>
              <button 
                onClick={() => handleDifficultyChange('hard')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  difficulty === 'hard' 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                Hard
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <GameBoard 
              difficulty={difficulty} 
              onGameComplete={handleGameComplete} 
            />
          </div>
        </>
      )}

      <footer className="mt-auto pt-8 text-gray-400 text-center">
        <p>DevOps Assignment - Deploy this game to EC2 using Terraform and Ansible</p>
      </footer>
    </div>
  );
}

export default App;