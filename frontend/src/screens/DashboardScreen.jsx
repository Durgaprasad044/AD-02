import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/common/Button';

export default function DashboardScreen() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container section flex-column gap-xl animate-fade-in" style={{
      position: 'relative',
      minHeight: '80vh'
    }}>
      <div className="flex-between">
        <div>
          <h1 style={{ marginBottom: 'var(--spacing-xs)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-large" style={{ color: 'var(--color-muted-foreground)' }}>Here&apos;s what&apos;s happening in your network today.</p>
        </div>
        <Button 
          label="Edit Profile" 
          variant="secondary" 
          onClick={() => navigate('/profile')}
        />
      </div>
      
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-xl)' }}>
        
        {/* Smart Matches */}
        <div className="card flex-column gap-md">
          <div className="flex-between">
            <h3 style={{ fontSize: '1.25rem' }}>Smart Matches</h3>
            <span style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold' }}>
              3 New
            </span>
          </div>
          <p style={{ lineHeight: '1.6' }}>We found 3 high-compatibility professionals matching your skills.</p>
          <div style={{ marginTop: 'auto' }}>
            <Button 
              label="View All Matches" 
              variant="secondary" 
              onClick={() => navigate('/matches')}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Active Event */}
        <div className="card flex-column gap-md" style={{ 
          borderTop: '4px solid var(--color-primary)',
        }}>
          <div className="flex-between">
            <h3 style={{ fontSize: '1.25rem' }}>Active Event</h3>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'inline-block', border: '2px solid var(--color-primary)' }}></span>
          </div>
          <div>
            <h4 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>Global Tech Summit 2026</h4>
            <p className="text-small" style={{ color: 'var(--color-primary)' }}>San Francisco, CA • May 15 - 17</p>
          </div>
          <p style={{ lineHeight: '1.6' }}>You have 12 potential networking opportunities at this event.</p>
          <div style={{ marginTop: 'auto' }}>
            <Button 
              label="Event Details" 
              variant="primary" 
              onClick={() => navigate('/events')}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Network Activity */}
        <div className="card flex-column gap-md">
          <h3 style={{ fontSize: '1.25rem' }}>Network Activity</h3>
          <p style={{ lineHeight: '1.6' }}>2 of your connections posted new updates.</p>
          <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-muted)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px', color: 'var(--color-foreground)' }}>Alex Chen</div>
            <p className="text-small" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--color-muted-foreground)' }}>
              Looking forward to discussing AI infrastructure at the summit...
            </p>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
            <button
              onClick={() => navigate('/feed')}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--color-primary)', 
                fontWeight: 600, 
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color var(--transition-fast)'
              }}
              onMouseOver={(e) => e.target.style.color = '#8d6a46'}
              onMouseOut={(e) => e.target.style.color = 'var(--color-primary)'}
            >
              Go to Feed →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
