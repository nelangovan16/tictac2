import React, { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
}

function Board({ currentPlayer }) {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="status">You are playing as: <strong>{currentPlayer}</strong></div>
      <div className="resizable-container">
        <div className="board">
          {squares.map((val, i) => (
            <Square key={i} value={val} onClick={() => handleClick(i)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  function handlePlayerSelect(player) {
    setSelectedPlayer(player);
  }

  return (
    <div className="game-container">
      {selectedPlayer ? (
        <Board currentPlayer={selectedPlayer} />
      ) : (
        <div className="player-select">
          <h2>Choose your player:</h2>
          <button onClick={() => handlePlayerSelect('X')}>Play as X</button>
          <button onClick={() => handlePlayerSelect('O')}>Play as O</button>
        </div>
      )}
    </div>
  );
}
