import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { fetchMessages } from "../Context/MessageContext";
import "./Login.css";
import { FaRegUserCircle, FaUser, FaLock } from "react-icons/fa";

const Login = ({ setLoggedInUser, loggedInUser }) => {
  const [username, setUsername] = useState(() =>
    localStorage.checkbox ? localStorage.username : "",
  );
  const [password, setPassword] = useState(() =>
    localStorage.checkbox ? localStorage.password : "",
  );
  const [isChecked, setIsChecked] = useState(() => !!localStorage.checkbox);
  const [mode, setMode] = useState("login");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7232/api/auth/login",
        { username, password },
      );
      if (isChecked && username !== "") {
        localStorage.username = username;
        localStorage.password = password;
        localStorage.checkbox = isChecked ? "1" : "";
      }

      console.log("Login response:", response.data);

      const token = response.data;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);

      console.log("Decoded Token:", decodedToken);

      // Set the logged-in user in the parent component (App)
      setLoggedInUser({
        username:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
      });
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  useEffect(() => {
    console.log(loggedInUser);
    if (loggedInUser && loggedInUser.username) {
      fetchMessages(loggedInUser);
    }
  }, [loggedInUser]);
  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7232/api/auth/register",
        {
          username,
          password,
        },
      );

      console.log("Registration successful:", response.data);
      handleLogin();
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <FaRegUserCircle id="login-icon" />
        <div className="login-form">
          <div className="form-group">
            <FaUser className="input-icon" />
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="remember-me">
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={isChecked}
              name="lsRememberMe"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label>Remember me</label>
          </div>

          <label
            onClick={() =>
              setMode((prev) => (prev === "login" ? "register" : "login"))
            }
          >
            {mode === "login"
              ? "Create Account"
              : "Already have an account?"}{" "}
          </label>
        </div>
        <div className="button-container">
          <button onClick={handleSubmit}>
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
