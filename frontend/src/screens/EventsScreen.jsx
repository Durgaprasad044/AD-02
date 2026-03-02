import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function EventsScreen() {
  const navigate = useNavigate();

  return (
    <div className="container section animate-fade-in flex-column gap-xl">
      <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
        <div>
          <h1 style={{ marginBottom: 'var(--spacing-xs)' }}>Events</h1>
          <p className="text-large">Discover tech conferences, hackathons, and startup mixers.</p>
        </div>
        <Button 
          label="Host an Event" 
          variant="secondary" 
          style={{ borderColor: 'var(--color-border)' }}
        />
      </div>
      
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 'var(--spacing-2xl)' }}>
        
        {/* Active Event Card */}
        <div className="card flex-column gap-md" style={{ 
          background: 'var(--color-card)', 
          border: '1px solid var(--color-border)', 
          borderTop: '4px solid var(--color-primary)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div className="flex-between">
            <span style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid var(--color-border)' }}>
              Happening Now
            </span>
            <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.9rem' }}>San Francisco, CA</span>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>Global Tech Summit 2026</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--color-muted-foreground)' }}>
              The premier gathering for AI infrastructure engineering and SaaS Founders.
            </p>
          </div>
          
          <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-muted)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div className="flex-between" style={{ marginBottom: '8px' }}>
              <span className="text-small" style={{ fontWeight: 600 }}>Attendees</span>
              <span className="text-small" style={{ color: 'var(--color-primary)' }}>1,442 Registered</span>
            </div>
            {/* Avatar stack placeholder */}
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', border: '2px solid var(--color-border)', marginLeft: '-10px' }}></div>
              ))}
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', border: '2px solid var(--color-border)', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--color-accent-foreground)', fontWeight: 'bold' }}>+1k</div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: 'var(--spacing-md)' }}>
            <Button 
              label="Find Matches" 
              variant="primary" 
              onClick={() => navigate('/matches')}
              style={{ flex: 1 }}
            />
            <Button 
              label="Details" 
              variant="secondary" 
              style={{ flex: 1 }}
            />
          </div>
        </div>

        {/* Upcoming Event Card */}
        <div className="card flex-column gap-md" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <div className="flex-between">
            <span style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid var(--color-border)' }}>
              Starts in 2 weeks
            </span>
            <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.9rem' }}>Remote</span>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>Web3 Builders Hackathon</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--color-muted-foreground)' }}>
              48 hours to build the future of decentralized networks. Over $200k in bounties.
            </p>
          </div>

          <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-muted)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div className="flex-between">
              <span className="text-small" style={{ fontWeight: 600 }}>Your Status</span>
              <span className="text-small" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Registered</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <Button 
              label="Join Networking Lobby" 
              variant="secondary" 
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
