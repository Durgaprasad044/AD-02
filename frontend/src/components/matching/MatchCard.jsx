import React from 'react';
import PropTypes from 'prop-types';
import '../../index.css';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import CompatibilityScore from './CompatibilityScore';

const MatchCard = ({ match, onConnect, onViewProfile, onDismiss }) => {
  const { id, name, avatar, bio, role, compatibilityScore, sharedSkills, reasoning } = match;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    header: {
      display: 'flex',
      gap: '16px',
      marginBottom: '16px',
      alignItems: 'flex-start',
    },
    info: {
      flex: 1,
    },
    nameRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px',
    },
    name: {
      fontSize: '1.125rem',
      fontWeight: 700,
      color: 'var(--color-text-primary)',
    },
    role: {
      fontSize: '0.85rem',
      color: 'var(--color-text-secondary)',
      fontWeight: 500,
    },
    scoreLabel: {
      fontSize: '0.7rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--color-text-secondary)',
      marginTop: '8px',
      marginBottom: '4px',
      fontWeight: 600,
    },
    reasoning: {
      fontSize: '0.875rem',
      color: 'var(--color-text-secondary)',
      fontStyle: 'italic',
      marginBottom: 'var(--spacing-md)',
      padding: 'var(--spacing-sm)',
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderRadius: 'var(--radius-sm)',
      borderLeft: '2px solid var(--color-primary)'
    },
    bio: {
      fontSize: '0.9rem',
      color: 'var(--color-text-secondary)',
      lineHeight: 1.6,
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      marginBottom: 'var(--spacing-md)',
      flex: 1,
    },
    skillsContainer: {
      marginBottom: 'var(--spacing-lg)',
    },
    skillsLabel: {
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--spacing-sm)',
      letterSpacing: '0.05em',
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    tag: {
      backgroundColor: 'var(--color-glass)',
      color: 'var(--color-primary)',
      padding: '6px 12px',
      borderRadius: 'var(--radius-sm)',
      fontSize: '0.75rem',
      fontWeight: 600,
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      backdropFilter: 'blur(4px)',
    },
    actions: {
      display: 'flex',
      gap: 'var(--spacing-sm)',
      marginTop: 'auto',
    },
  };

  return (
    <Card hoverable padding="24px" style={{ height: '100%' }}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ position: 'relative' }}>
            <Avatar src={avatar} name={name} size="lg" />
            <div style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '12px',
              height: '12px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '50%',
              border: '2px solid var(--color-card)',
              boxShadow: '0 0 8px var(--color-primary)'
            }} />
          </div>
          <div style={styles.info}>
            <div style={styles.nameRow}>
               <div style={styles.name}>{name}</div>
            </div>
            <div style={styles.role}>{role || 'Professional'}</div> 
            <div style={styles.scoreLabel}>Match Score</div>
            <CompatibilityScore score={compatibilityScore || 0} />
          </div>
        </div>

        {reasoning && (
          <div style={styles.reasoning}>"{reasoning}"</div>
        )}

        <div style={styles.bio}>{bio}</div>

        <div style={styles.skillsContainer}>
          <div style={styles.skillsLabel}>Shared Skills</div>
          <div style={styles.tags}>
            {sharedSkills?.length > 0 ? sharedSkills.slice(0, 4).map((skill, index) => (
              <span key={index} style={styles.tag}>{skill}</span>
            )) : <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>No shared skills specified</span>}
            {sharedSkills?.length > 4 && (
              <span style={styles.tag}>+{sharedSkills.length - 4}</span>
            )}
          </div>
        </div>
        
        <div style={styles.actions}>
          <Button 
            label="Dismiss" 
            variant="ghost" 
            onClick={() => onDismiss(id)}
            style={{ flex: 1, padding: '8px 0', fontSize: '0.85rem' }}
          />
          <Button 
            label="Profile" 
            variant="ghost" 
            onClick={() => onViewProfile(id)}
            style={{ flex: 1, padding: '8px 0', fontSize: '0.85rem' }}
          />
          <Button 
            label="Connect" 
            variant="primary" 
            onClick={() => onConnect(id)} 
            style={{ flex: 1.5, padding: '8px 0', fontSize: '0.85rem' }}
          />
        </div>
      </div>
    </Card>
  );
};

MatchCard.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    bio: PropTypes.string,
    role: PropTypes.string,
    compatibilityScore: PropTypes.number,
    sharedSkills: PropTypes.arrayOf(PropTypes.string),
    reasoning: PropTypes.string
  }).isRequired,
  onConnect: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default MatchCard;
