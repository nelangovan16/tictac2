// App.js
import React, { useRef, useState } from 'react';
import './App.css';

const App = () => {
  const containerRef = useRef(null);
  const [size, setSize] = useState(300); // Initial size in px
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const handleResizing = (e) => {
    if (isResizing) {
      const newSize = Math.min(window.innerWidth, window.innerHeight, e.clientX - containerRef.current.offsetLeft);
      setSize(newSize);
    }
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleResizing);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', handleResizing);
      window.removeEventListener('mouseup', stopResizing);
    };
  });

  return (
    <div className="game-container">
      <div
        className="resizable-board"
        ref={containerRef}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div className="board">
          {Array(9).fill(null).map((_, idx) => (
            <div className="square" key={idx}>{/* Place X or O here later */}</div>
          ))}
        </div>
        <div
          className="resize-handle"
          onMouseDown={startResizing}
        />
      </div>
    </div>
  );
};

export default App;
