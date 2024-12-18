import React, { useState, useEffect } from "react";
import "../css/Color Clicker Challenge.css";

const colors = ["red", "blue", "green", "yellow"];

const ColorClickerGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleBoxClick = (color) => {
    if (timeLeft <= 0) return;

    if (color === targetColor) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }

    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div className="game-container">
      <h1>Color Clicker Challenge</h1>
      <h2>Target: <span style={{ color: targetColor }}>{targetColor.toUpperCase()}</span></h2>
      <h3>Score: {score}</h3>
      <h3>Time Left: {timeLeft}s</h3>
      <div className="color-grid">
        {colors.map((color) => (
          <div
            key={color}
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={() => handleBoxClick(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorClickerGame;
