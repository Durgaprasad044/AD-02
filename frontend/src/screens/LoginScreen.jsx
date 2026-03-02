import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import '../index.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--color-background)',
    padding: 'var(--spacing-md)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)',
  };

  const inputStyle = {
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--color-border)',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <Card style={{ width: '100%', maxWidth: '400px', padding: 'var(--spacing-xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>Login</h2>
        {error && (
          <div style={{ color: 'var(--color-danger)', textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
            {typeof error === 'string' ? error : 'Login failed'}
          </div>
        )}
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <Button
            type="submit"
            label={loading ? 'Logging in...' : 'Login'}
            variant="primary"
            loading={loading}
            style={{ width: '100%' }}
          />
        </form>
      </Card>
    </div>
  );
};

export default LoginScreen;
