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
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(null);

  // Fetch trivia questions from API
  const fetchData = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10&type=boolean");
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
        setCurrentIndex(0);
        setLives(3);
        setScore(0);
        setTimer(0);
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

  useEffect(() => {
    if (gameOver || questions.length === 0 || currentIndex >= questions.length) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, gameOver, questions]);

  const handleAnswer = (userAnswer) => {
    if (gameOver || currentIndex >= questions.length) return;

    const correctAnswer = questions[currentIndex].correct_answer;

    if (userAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      setLives((prev) => prev - 1);
    }

    nextQuestion();
  };

  const nextQuestion = () => {
    if (lives <= 0) {
      setGameOver(true);
      return;
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setTimer(0);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    fetchData();
  };

  return (
    <div className="trivia-container">
      <h2>Trivia Game</h2>
      <p>❤️ Lives: {lives} | ⏱️ Time Taken: {timer}s | 🎯 Score: {score}</p>

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
