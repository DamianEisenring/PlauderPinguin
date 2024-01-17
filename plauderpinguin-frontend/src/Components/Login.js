import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7232/api/auth/login', { username, password });
      const token = response.data;
      localStorage.setItem('token', token);
      setLoggedInUser({ username }); // Set the logged-in user
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUser({ username: decodedToken.username });
    }
  }, []); // Run only once on component mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://localhost:7232/api/auth/register', {
        username,
        password,
      });

      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>


      {loggedInUser ? (
        <div>
          <p>Welcome, {loggedInUser.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default Login;
