import React from 'react';

const Settings = ({ onDifficultyChange }) => {
  const handleDifficultyChange = (event) => {
    const difficulty = event.target.value;
    onDifficultyChange(difficulty);
  };

  return (
    <div>
      <label htmlFor="difficulty">Select Difficulty:</label>
      <select id="difficulty" onChange={handleDifficultyChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default Settings;