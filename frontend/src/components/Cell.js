import React from 'react';
import './Cell.css';

const Cell = React.memo(({ cellData, onClick, onFlag, isGameOver }) => {
  const { isClicked, isBomb, adjacentBombCount, isFlagged } = cellData;

  const handleCellClick = () => {
    if (!isFlagged && !isClicked) {
      onClick();
    }
  };

  const handleCellRightClick = (e) => {
    e.preventDefault();
    if (!isClicked) {
      onFlag();
    }
  };

  return (
    <div
      className={`cell ${isClicked ? 'clicked' : ''}`}
      onClick={handleCellClick}
      onContextMenu={handleCellRightClick}
    >
      {isClicked && isBomb && <span className="bomb">💣</span>}
      {isGameOver && !isClicked && isBomb && <span className="bomb">💣</span>}
      {isClicked && !isBomb && adjacentBombCount > 0 && (
        <span className={`bomb-count-${adjacentBombCount}`}>
          {adjacentBombCount}
        </span>
      )}
      {isFlagged && !isClicked && <span className="flag">🚩</span>}
    </div>
  );
});

export default Cell;