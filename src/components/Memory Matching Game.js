import React, { useState, useEffect } from "react";
import "../css/Memory Matching Game.css";

const MemoryGame = () => {
  const symbols = ["🍎", "🍌", "🍓", "🍒", "🍇", "🍉"];
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Initialize game
    const shuffledCards = shuffle([...symbols, ...symbols]);
    setCards(shuffledCards.map((symbol, index) => ({ id: index, symbol, flipped: false })));
    setFlippedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setGameOver(false);
    setTime(0);
  }, []);

  useEffect(() => {
    // Timer logic
    let timer;
    if (!gameOver) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameOver]);

  const shuffle = (array) => {
    // Fisher-Yates Shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || matchedCards.includes(id)) return;

    const flipped = [...flippedCards, id];
    setFlippedCards(flipped);

    if (flipped.length === 2) {
      setAttempts((prev) => prev + 1);
      const [first, second] = flipped.map((i) => cards[i]);
      if (first.symbol === second.symbol) {
        setMatchedCards((prev) => [...prev, first.id, second.id]);
        if (matchedCards.length + 2 === cards.length) setGameOver(true);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const restartGame = () => {
    const shuffledCards = shuffle([...symbols, ...symbols]);
    setCards(shuffledCards.map((symbol, index) => ({ id: index, symbol, flipped: false })));
    setFlippedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setGameOver(false);
    setTime(0);
  };

  return (
    <div className="game-container">
      <h1>Memory Matching Game</h1>
      <div className="game-info">
        <p>Time: {time}s</p>
        <p>Attempts: {attempts}</p>
        {gameOver && <p className="game-over">🎉 Game Over! 🎉</p>}
      </div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${flippedCards.includes(index) || matchedCards.includes(card.id) ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-front">{card.symbol}</div>
            <div className="card-back">❓</div>
          </div>
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default MemoryGame;
