
import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const containerRef = useRef(null);
  const [size, setSize] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const handleResizing = (e) => {
    if (isResizing && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newSize = Math.max(
        100,
        Math.min(
          Math.min(window.innerWidth, window.innerHeight),
          e.clientX - rect.left
        )
      );
      setSize(newSize);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleResizing);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', handleResizing);
      window.removeEventListener('mouseup', stopResizing);
    };
  });

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game-container">
      <div className="status">{status}</div>
      <div
        className="resizable-board"
        ref={containerRef}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div className="board">
          {squares.map((value, idx) => (
            <div
              key={idx}
              className="square"
              onClick={() => handleClick(idx)}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="resize-handle" onMouseDown={startResizing} />
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
