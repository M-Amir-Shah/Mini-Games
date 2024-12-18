import React, { useState, useEffect } from "react";
import "../css/Whack-a-Mole Game.css";

const WhackAMole = () => {
  const [moles, setMoles] = useState(Array(9).fill(false)); // 9 "holes"
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(30); // 30 seconds game time
  const [activeMole, setActiveMole] = useState(null); // Current active mole index

  useEffect(() => {
    if (gameOver) return;

    // Start the timer countdown
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setGameOver(true);
    }
  }, [timer, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    // Randomly activate a mole every 1 second
    const moleInterval = setInterval(() => {
      const randomMole = Math.floor(Math.random() * 9);
      setMoles((prev) => {
        const newMoles = [...prev];
        newMoles[randomMole] = true; // Activate a mole
        return newMoles;
      });

      // Deactivate mole after 1 second
      setTimeout(() => {
        setMoles((prev) => {
          const newMoles = [...prev];
          newMoles[randomMole] = false;
          return newMoles;
        });
      }, 1000);
    }, 1000);

    return () => clearInterval(moleInterval);
  }, [gameOver]);

  const handleMoleClick = (index) => {
    if (moles[index] === true) {
      setScore((prev) => prev + 1);
      setMoles((prev) => {
        const newMoles = [...prev];
        newMoles[index] = false; // Deactivate the mole after it's hit
        return newMoles;
      });
    }
  };

  const restartGame = () => {
    setMoles(Array(9).fill(false));
    setScore(0);
    setTimer(30);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Whack-a-Mole Game</h1>
      <div className="game-info">
        <p>Time Left: {timer}s</p>
        <p>Score: {score}</p>
        {gameOver && <p className="game-over">Game Over!</p>}
      </div>
      <div className="grid">
        {moles.map((mole, index) => (
          <div
            key={index}
            className={`hole ${mole ? "active" : ""}`}
            onClick={() => handleMoleClick(index)}
          >
            {mole && <div className="mole">🐹</div>}
          </div>
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default WhackAMole;
