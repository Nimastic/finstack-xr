import React, { useState } from 'react';
import axios from 'axios';

function AdminPortal() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/auth/signup', {
        email
      });
      setMessage(`User created: ${JSON.stringify(res.data.user)}`);
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>FinStack XR Admin Portal</h1>
      <div>
        <label>Email for signup:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={{ marginLeft: '10px' }}
        />
        <button onClick={handleSignup}>Sign Up & Whitelist</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminPortal;
