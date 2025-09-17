import React, { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i]) return; // Don't overwrite
    nextSquares[i] = 'X';
    setSquares(nextSquares);
  }

  return (
    <div className="board">
      {squares.map((val, i) => (
        <Square key={i} value={val} onClick={() => handleClick(i)} />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="game-container">
      <Board />
    </div>
  );
}
