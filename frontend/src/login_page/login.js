import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_LOGIN = "http://127.0.0.1:8000/api/login/";

  // const API_USER_QUERIES = "http://ec2-13-238-141-127.ap-southeast-2.compute.amazonaws.com/api/login/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_LOGIN, {
        username,
        password
      });

      if (response.data.authenticated) {
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-box p-4 shadow">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
