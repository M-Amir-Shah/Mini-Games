import "../css/Typing Speed Test.css";
import React, { useState, useEffect } from "react";

const TypingSpeedTest = () => {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  let timer; // Declare the timer variable here

  useEffect(() => {
    if (startTime && !endTime) {
      // Start the timer when the test begins and stop it when finished
      timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    // Clean up the timer when the component unmounts or test ends
    return () => clearInterval(timer);
  }, [startTime, endTime]); // Only run when startTime or endTime change

  const handleChange = (event) => {
    const input = event.target.value;
    setUserInput(input);

    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    if (input === text && !endTime) {
      // Set the end time only once the input matches the target text
      setEndTime(Date.now());
      clearInterval(timer); // Stop the timer when the user finishes
      calculateWPM(input);
    }
  };

  const calculateWPM = (input) => {
    if (startTime && endTime) {
      const timeTakenInMinutes = (endTime - startTime) / 60000; // Use endTime to calculate exact time
      const wordCount = input.trim().split(" ").length;
      const wpm = Math.floor(wordCount / timeTakenInMinutes);
      setWpm(wpm);
    }
  };

  const resetTest = () => {
    setText("The quick brown fox jumps over the lazy dog.");
    setUserInput("");
    setIsStarted(false);
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setTimeElapsed(0);
  };

  return (
    <div className="typing-test-container">
      <h1>Typing Speed Test</h1>
      <p className="text-to-type">{text}</p>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        className="typing-input"
        disabled={endTime !== null}
      />
      <div className="results">
        {endTime && <p>Time: {timeElapsed} seconds</p>}
        {endTime && <p>WPM: {wpm}</p>}
      </div>
      <button onClick={resetTest} className="reset-btn">
        Restart
      </button>
    </div>
  );
};

export default TypingSpeedTest;
 