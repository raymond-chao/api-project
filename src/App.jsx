import { useState } from "react";
import Login from "./components/Login.jsx";
import LoginRegister from "./components/Registration.jsx";
import API from "./components/API.jsx";
import React from "react";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  const handleAuthSuccess = (username) => {
  console.log("Authenticated as:", username);
  setIsAuthenticated(true);
  setUsername(username);
};


  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        showRegister ? (
          <LoginRegister
            onAuthSuccess={handleAuthSuccess}
            toggleForm={toggleForm}
          />
        ) : (
          <Login onAuthSuccess={handleAuthSuccess} toggleForm={toggleForm} />
        )
      ) : (
        <div>
          <h2 className="welcome">Welcome, {username}!</h2>
          <button className="logout" onClick={handleLogout}>Logout</button>
          <API />
        </div>
      )}
    </div>
  );
}

export default App;
