import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get the source of the admin request from the URL
  const from = location.state?.from || 'projects';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Taylorjmjr1959%' && password === 'Taylorjmjr1959_') {
      // Navigate to admin dashboard with appropriate tab
      if (from === 'resume') {
        navigate('/admin-dashboard', { state: { tab: 'resume' } });
      } else {
        navigate('/admin-dashboard');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container className="admin-login-container">
      <Form onSubmit={handleLogin} className="admin-login-form">
        <h2>Admin Login</h2>
        <p className="text-white mb-4">
          {from === 'resume' ? 'Access Resume Management' : 'Access Project Management'}
        </p>
        {error && <p className="text-danger">{error}</p>}
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="admin-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
          />
        </Form.Group>
        <Button type="submit" variant="danger" className="admin-button mt-3">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default AdminLogin; 