import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const sidebarStyle = {
    width: '250px',
    height: 'calc(100vh - 72px)',
    position: 'fixed',
    top: '72px',
    left: 0,
    backgroundColor: 'var(--color-sidebar)',
    borderRight: '1px solid var(--color-border)',
    padding: 'var(--spacing-lg) 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
    transition: 'transform var(--transition-normal)',
    zIndex: 900,
  };

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: '⚡' },
    { name: 'Smart Matches', path: '/matches', icon: '🎯' },
    { name: 'Feed', path: '/feed', icon: '📝' },
    { name: 'Messages', path: '/chat', icon: '💬' },
    { name: 'Events', path: '/events', icon: '📅' },
  ];

  return (
    <>
      <aside style={sidebarStyle} className={`sidebar ${isOpen ? 'open' : ''}`}>
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <NavLink 
              key={link.path}
              to={link.path} 
              style={{
                padding: 'var(--spacing-md) var(--spacing-xl)',
                textDecoration: 'none',
                color: isActive ? 'var(--color-accent-foreground)' : 'var(--color-sidebar-foreground)',
                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                fontSize: '0.95rem',
                fontWeight: isActive ? 600 : 500,
                borderRight: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
              onClick={() => onClose && onClose()}
            >
              <span>{link.icon}</span>
              {link.name}
            </NavLink>
          );
        })}
      </aside>
      <style>
        {`
          @media (max-width: 768px) {
            .sidebar {
              transform: translateX(-100%);
            }
            .sidebar.open {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </>
  );
}
