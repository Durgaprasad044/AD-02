import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const layoutStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--color-background)',
  };

  const mainAreaStyle = {
    display: 'flex',
    flex: 1,
    paddingTop: '72px', // matches Navbar height
  };

  const contentStyle = {
    flex: 1,
    padding: 'var(--spacing-xl)',
    marginLeft: '250px', // Default sidebar width
    transition: 'margin-left var(--transition-normal)'
  };

  // Mobile responsiveness could adjust marginLeft
  // For simplicity, we assume sticky sidebar layout
  return (
    <div style={layoutStyle}>
      <Navbar onMenuClick={toggleSidebar} />
      <div style={mainAreaStyle}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main style={contentStyle} className="content-area">
          {children}
        </main>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .content-area {
              margin-left: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
}
