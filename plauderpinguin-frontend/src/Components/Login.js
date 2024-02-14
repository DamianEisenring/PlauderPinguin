import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Conversation from "./Conversation";
import { fetchMessages } from "../Context/MessageContext";
import App from "../App"

const Login = ({ setLoggedInUser, loggedInUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7232/api/auth/login",
        { username, password }
      );

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
        error.response ? error.response.data : error.message
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7232/api/auth/register",
        {
          username,
          password,
        }
      );

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Login;
