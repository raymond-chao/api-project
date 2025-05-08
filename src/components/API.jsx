import React, { useEffect, useState } from "react";

const decodeHTML = (str) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };
  
const API = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
      } else {
        console.warn("API returned non-success code:", data.response_code);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Trivia Questions</h1>
      {error && <p>{error}</p>}
      {questions.length > 0 ? (
        <ul>
          {questions.map((q, index) => (
            <li key={index}>{decodeHTML(q.question)}</li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default API;
