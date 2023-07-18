import React, { useState, useEffect } from 'react';
import '../App.css';
import Cell from './Cell';
import { getLocalStorageData, setLocalStorageData } from '../utilities/localStorage';

const Board = ({ difficulty, gameActive }) => {
  const [board, setBoard] = useState([]);
  const [boardExists, setBoardExists] = useState(false);
  const [boardMined, setBoardMined] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(null);

  const handleCellClick = (row, col) => {
    if (gameOver || board[row][col].isClicked) {
      return;
    }
    const updatedBoard = [...board];
    const clickedCell = updatedBoard[row][col];
    if (clickedCell.isBomb) {
      setGameOver(true);
    } else {
      clickedCell.isClicked = true;
      if (clickedCell.adjacentBombCount === 0) {
        revealEmptyCells(updatedBoard, row, col);
      }
      setBoard(updatedBoard);
      if (checkWinCondition(updatedBoard)) {
        handleGameOver(true);
      }
    }
  };

  const createBoard = () => {
    const newBoard = [];
    for (let row = 0; row < 10; row++) {
      const newRow = [];
      for (let col = 0; col < 10; col++) {
        newRow.push({
          row,
          col,
          isClicked: false,
          isBomb: false,
          adjacentBombCount: 0,
        });
      }
      newBoard.push(newRow);
    }
    setBoard(newBoard);
    setBoardExists(true);
  };

  const placeMines = () => {
    const updatedBoard = [...board];
    let minesPlaced = 0;
    while (minesPlaced < 10) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      if (updatedBoard[randomRow] && updatedBoard[randomRow][randomCol]) {
        const cell = updatedBoard[randomRow][randomCol];
        if (!cell.isBomb) {
          cell.isBomb = true;
          minesPlaced++;
        }
      }
    }
    setBoard(updatedBoard);
    setBoardMined(true);
  };

  const calculateAdjacentBombCount = () => {
    const updatedBoard = [...board];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = updatedBoard[row][col];
        if (!cell.isBomb) {
          let bombCount = 0;
          for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
              if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                if (updatedBoard[i][j].isBomb) {
                  bombCount++;
                }
              }
            }
          }
          cell.adjacentBombCount = bombCount;
        }
      }
    }

    setBoard(updatedBoard);
  };

  const revealEmptyCells = (updatedBoard, row, col) => { // Getting this to work was the bane of my existence
    const cell = updatedBoard[row][col];
    cell.isClicked = true;
  
    if (cell.adjacentBombCount === 0) {
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
      ];
      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
          const adjacentCell = updatedBoard[newRow][newCol];
          if (!adjacentCell.isClicked && !adjacentCell.isBomb) {
            revealEmptyCells(updatedBoard, newRow, newCol);
          }
        }
      });
    }
  };

    const handleCellFlag = (row, col) => {
      if (!gameOver) {
        const updatedBoard = [...board];
        updatedBoard[row][col].isFlagged = !updatedBoard[row][col].isFlagged;
        setBoard(updatedBoard);
      }
    };

    const checkWinCondition = (currentBoard) => {
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const cell = currentBoard[row][col];
          if (!cell.isBomb && !cell.isClicked) {
            return false;
          }
        }
      }
      return true;
    };

  const handleGameOver = () => {
    setGameWon(true);
    setGameOver(true);
    const gameTime = getGameTimeInSeconds();
    const userTimes = getLocalStorageData('userTimes') || [];
    userTimes.push({ difficulty, time: gameTime });
    userTimes.sort((a, b) => a.time - b.time);
    userTimes.splice(30);
    setLocalStorageData('userTimes', userTimes);
  };

  const winLoss = () => {
    if (gameOver === true) {
      if (gameWon === true) {
        return (
          <span>Congratulations, you've won!</span>
        );
      } else {
        return (
          <span>Sadly, you have no legs now.</span>
        );
      }
    } else return;
  };

  const getGameTimeInSeconds = () => {
    if (!gameStartTime) {
      return 0;
    }
    const endTime = new Date();
    const startTime = new Date(gameStartTime);
    const timeDifference = endTime - startTime;
    return Math.floor(timeDifference / 1000);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    if (board.length > 0) {
      placeMines();
    }
  }, [boardExists]);

  useEffect(() => {
    if (board.length > 0) {
      calculateAdjacentBombCount();
    }
  }, [boardMined]);

  useEffect(() => {
    setGameStartTime(new Date());
  }, []);

  useEffect(() => {
    winLoss();
  }, [gameOver])

  return (
    <div className="container">
      {winLoss()}
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              cellData={cell}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onFlag={() => handleCellFlag(rowIndex, colIndex)}
              isGameOver={gameOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;