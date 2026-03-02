import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

import '../../index.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const navStyle = {
    height: '72px',
    backgroundColor: 'var(--color-card)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'var(--shadow-sm)',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 var(--spacing-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  };

  const brandStyle = {
    fontWeight: 700,
    fontSize: '1.4rem',
    color: 'var(--color-foreground)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '-0.015em',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  const linkContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
  };

  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.95rem',
    position: 'relative',
    transition: 'color var(--transition-fast)',
    padding: '4px 0',
    borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* Brand */}
        <NavLink to={isAuthenticated ? '/dashboard' : '/'} style={brandStyle}>
          <span style={{ color: 'var(--color-primary)' }}>⚡</span> ATRIUS
        </NavLink>
        
        {/* Navigation Links - Only show if authenticated */}
        {isAuthenticated && (
          <div style={linkContainerStyle}>
            <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
            <NavLink to="/matches" style={linkStyle}>Matches</NavLink>
            <NavLink to="/feed" style={linkStyle}>Feed</NavLink>
            <NavLink to="/events" style={linkStyle}>Events</NavLink>
            <NavLink to="/chat" style={linkStyle}>Messages</NavLink>
          </div>
        )}

        {/* User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          {isAuthenticated ? (
            <>
              <div style={{ textAlign: 'right', marginRight: '8px', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)' }}>{user?.name || 'User'}</div>
              </div>
              
              <div 
                style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-foreground)', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => navigate('/profile')}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>

              <button 
                onClick={handleLogout}
                style={{ 
                  color: 'var(--color-muted-foreground)', 
                  fontWeight: 500, 
                  fontSize: '0.875rem', 
                  marginLeft: 'var(--spacing-sm)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--color-destructive)'}
                onMouseOut={(e) => e.target.style.color = 'var(--color-muted-foreground)'}
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              className="btn-primary" 
              onClick={() => navigate('/dashboard')}
              style={{ 
                padding: '8px 20px', 
                backgroundColor: 'var(--color-primary)', 
                color: 'var(--color-primary-foreground)', 
                fontWeight: '600', 
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#8d6a46'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
