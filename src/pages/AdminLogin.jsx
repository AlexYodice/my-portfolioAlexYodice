import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the source of the admin request from the URL
  const from = location.state?.from || 'projects';

  // Hash password using Web Crypto API (SHA-256)
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Hash the input password
      const passwordHash = await hashPassword(password);

      // Query the database for the username
      const { data, error: queryError } = await supabase
        .from('admin_users')
        .select('username, password_hash')
        .eq('username', username)
        .single();

      if (queryError) {
        // If user not found or other error
        if (queryError.code === 'PGRST116') {
          // No rows returned
          setError('Invalid credentials');
        } else {
          console.error('Database error:', queryError);
          setError('Login failed. Please try again.');
        }
        setLoading(false);
        return;
      }

      // Compare the hashed password
      if (data && data.password_hash === passwordHash) {
        // Successful login - navigate to admin dashboard
        if (from === 'resume') {
          navigate('/admin-dashboard', { state: { tab: 'resume' } });
        } else {
          navigate('/admin-dashboard');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
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
        <Button 
          type="submit" 
          variant="danger" 
          className="admin-button mt-3"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default AdminLogin; 