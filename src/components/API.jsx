import React, { useEffect, useState } from "react";
import "../index.css";

const decodeHTML = (str) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

const API = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10&type=boolean");
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
        setCurrentIndex(0);
        setLives(3);
        setGameOver(false);
        setError(null);
      } else {
        setError("No questions returned. Try again later.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAnswer = (userAnswer) => {
    if (gameOver || currentIndex >= questions.length) return;

    const correctAnswer = questions[currentIndex].correct_answer;

    if (userAnswer === correctAnswer) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (lives > 1) {
        setLives((prev) => prev - 1);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setLives(0);
        setGameOver(true);
      }
    }
  };

  const restartGame = () => {
    fetchData();
  };

  return (
    <div className="trivia-container">
      <h2 className="trivia-text">Trivia Game</h2>
      <p>❤️ Lives: {lives}</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {gameOver ? (
        <div>
          <h3>💀 Game Over!</h3>
          <button className="trivia-button" onClick={restartGame}>
            Restart
          </button>
        </div>
      ) : questions.length > 0 && currentIndex < questions.length ? (
        <div>
          <p className="trivia-question">
            {decodeHTML(questions[currentIndex].question)}
          </p>
          <button className="trivia-button-true" onClick={() => handleAnswer("True")}>
            True
          </button>
          <button className="trivia-button-false" onClick={() => handleAnswer("False")}>
            False
          </button>
        </div>
      ) : (
        <div>
          <h3>✅ You finished all the questions!</h3>
          <button className="trivia-button" onClick={restartGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default API;
