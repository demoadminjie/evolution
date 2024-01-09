import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e, path) => {
    e.preventDefault();
    const response = await fetch(`/api/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      if (path === 'login') {
        const data = await response.json();
        setToken(data.token);
      } else {
        alert('User registered');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  const handleJwtTest = async () => {
    const response = await fetch('/api/jwtTest', {
      headers: { Authorization: token },
    });

    if (response.ok) {
      alert('Access granted');
    } else {
      alert('Access denied');
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmit(e, 'register')}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>

      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e, 'login')}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <h1>JWT Test</h1>
      <button onClick={handleJwtTest}>Test</button>
    </div>
  );
}

export default App;
