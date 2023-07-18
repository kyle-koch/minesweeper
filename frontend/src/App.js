import React, { useState } from 'react';
import Board from './components/Board';
import Settings from './components/Settings';
import Timer from './components/Timer';
import UserTimes from './components/UserTimes';

const App = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
  };

  const handleGameOver = () => {
    setGameActive(false);
    setGameOver(true);
  };

  return (
    <div>
      <Settings onDifficultyChange={handleDifficultyChange} />
      <Timer isActive={gameActive} />
      <Board
        difficulty={difficulty}
        gameActive={gameActive}
        onGameOver={handleGameOver}
      />
      <button onClick={startGame}>Start Game</button>
      <UserTimes />
    </div>
  );
};

export default App;
