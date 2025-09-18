
import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const containerRef = useRef(null);
  const [size, setSize] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  // Only track X's, no O's and no turn switching
  const [squares, setSquares] = useState(Array(9).fill(null));

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
    if (squares[index]) return; // Don't overwrite
    const newSquares = squares.slice();
    newSquares[index] = 'X'; // Always put X
    setSquares(newSquares);
  };

  return (
    <div className="game-container">
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

export default App;
