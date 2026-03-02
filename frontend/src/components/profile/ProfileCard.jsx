import React from 'react';
import Avatar from '../common/Avatar';
import SkillsDisplay from './SkillsDisplay';
import GoalsDisplay from './GoalsDisplay';
import AvailabilityStatus from './AvailabilityStatus';
import Button from '../common/Button';

export default function ProfileCard({ user, isOwner, onEditClick, isMatchView }) {
  if (!user) return null;

  const cardStyle = {
    padding: 'var(--spacing-2xl)',
    backgroundColor: 'var(--color-glass)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border)',
    backdropFilter: 'blur(12px)',
    boxShadow: 'var(--shadow-lg)'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xl)',
    marginBottom: 'var(--spacing-2xl)'
  };

  const headerInfoStyle = {
    flex: 1
  };

  const statsStyle = {
    display: 'flex',
    gap: 'var(--spacing-2xl)',
    marginBottom: 'var(--spacing-2xl)',
    paddingBottom: 'var(--spacing-lg)',
    borderBottom: '1px solid var(--color-border)'
  };

  const statBoxStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const statNumStyle = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)'
  };

  const statLabelStyle = {
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)'
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <Avatar src={user.avatar} name={user.name} size="xl" />
        <div style={headerInfoStyle}>
           <h2 style={{ margin: 0, color: 'var(--color-text-primary)' }}>{user.name}</h2>
           <p style={{ margin: 'var(--spacing-xs) 0', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
             {user.role} {user.organization ? `@ ${user.organization}` : ''}
           </p>
           <AvailabilityStatus userId={user.id} fallbackStatus={user.status} />
        </div>
        {isOwner && (
          <Button variant="ghost" label="Edit Info" onClick={onEditClick} />
        )}
      </div>

      <div style={statsStyle}>
         <div style={statBoxStyle}>
            <span style={statNumStyle}>{user.connectionCount || 0}</span>
            <span style={statLabelStyle}>Connections</span>
         </div>
         <div style={statBoxStyle}>
            <span style={statNumStyle}>{user.eventCount || 0}</span>
            <span style={statLabelStyle}>Events</span>
         </div>
      </div>

      <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-sm)' }}>About</h3>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{user.bio || 'No bio provided.'}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        <SkillsDisplay skills={user.skills || []} highlightedSkills={isMatchView ? user.sharedSkills : null} />
        <GoalsDisplay goals={user.goals || []} />
      </div>
    </div>
  );
}
