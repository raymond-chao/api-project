import { useState } from "react";
import "../index.css";
import React from "react";

const LoginRegister = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegistration = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    setMessage("Registration successful!");
  };


    const handleLogin = (e) => {
        e.preventDefault();
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    setMessage("Login successful!");
    onAuthSuccess(username);
  } else {
    setMessage("Invalid username or password");
  }
};


  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className={`wrapper ${isRegistering ? "active" : ""}`}>
      <div className={`form-box ${isRegistering ? "register" : "login"}`}>
        <form onSubmit={isRegistering ? handleRegistration : handleLogin}>
          <h1>{isRegistering ? "Register" : "Login"}</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
             <a href="#"> I agree to the terms & conditions</a>
            </label>
          </div>

          <button type="submit">{isRegistering ? "Register" : "Login"}</button>

          {message && <p style={{ color: "green" }}>{message}</p>}

          <div className="register-link">
            <p>
              {isRegistering ? (
                <>
                  Already have an account?{" "}
                  <a href="#" onClick={toggleForm}>
                    Login
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <a href="#" onClick={toggleForm}>
                    Register
                  </a>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
