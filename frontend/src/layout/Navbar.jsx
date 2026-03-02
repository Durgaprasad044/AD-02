import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const navStyle = {
    height: '72px',
    backgroundColor: 'var(--color-card)',
    borderBottom: '1px solid var(--color-border)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
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
    padding: '4px 0',
    borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
    transition: 'color var(--transition-fast)',
  });

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          {/* Hamburger for Sidebar */}
          <button 
            className="mobile-only"
            onClick={onMenuClick}
            style={{ background: 'none', border: 'none', color: 'var(--color-foreground)', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ☰
          </button>

          <NavLink to={isAuthenticated ? '/dashboard' : '/'} style={brandStyle}>
            <span style={{ color: 'var(--color-primary)' }}>⚡</span> ATRIUS
          </NavLink>
        </div>
        
        {isAuthenticated && (
          <div style={linkContainerStyle} className="desktop-only">
            <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
            <NavLink to="/matches" style={linkStyle}>Matches</NavLink>
            <NavLink to="/feed" style={linkStyle}>Feed</NavLink>
            <NavLink to="/events" style={linkStyle}>Events</NavLink>
            <NavLink to="/chat" style={linkStyle}>Messages</NavLink>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          {isAuthenticated ? (
            <>
              <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)' }}>{user?.name || 'User'}</div>
              </div>
              <div 
                style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-foreground)', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => navigate('/profile')}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <button 
                onClick={() => { dispatch(logout()); navigate('/'); }}
                style={{ color: 'var(--color-muted-foreground)', fontWeight: 500, fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/dashboard')}
              style={{ padding: '8px 20px', backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)', fontWeight: '600', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}
            >
              Log In
            </button>
          )}
        </div>
      </div>
      <style>
        {`
          .mobile-only { display: none; }
          @media (max-width: 768px) {
            .mobile-only { display: block; }
            .desktop-only { display: none !important; }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
