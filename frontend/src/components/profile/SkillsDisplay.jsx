import React from 'react';

export default function SkillsDisplay({ skills, highlightedSkills = [] }) {
  if (!skills || skills.length === 0) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Skills</h3>
        <p style={styles.empty}>No skills listed.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Skills</h3>
      <div style={styles.grid}>
        {skills.map((skill, index) => {
          const isHighlighted = highlightedSkills && highlightedSkills.includes(skill.name);
          return (
            <div 
              key={index}
              style={{
                ...styles.pill,
                backgroundColor: isHighlighted ? 'rgba(62, 207, 142, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: isHighlighted ? 'var(--color-primary)' : 'var(--color-border)',
                color: isHighlighted ? 'var(--color-primary)' : 'var(--color-text-primary)'
              }}
            >
              <span style={styles.name}>{skill.name || skill}</span>
              {skill.level && (
                <span style={styles.level}> • {skill.level}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    // Add margin if needed
  },
  title: {
    fontSize: '1rem',
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--spacing-md)'
  },
  empty: {
    color: 'var(--color-text-secondary)',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing-sm)'
  },
  pill: {
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: '100px',
    border: '1px solid',
    fontSize: '0.875rem',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all var(--transition-fast)'
  },
  name: {
    fontWeight: 500
  },
  level: {
    fontSize: '0.75rem',
    opacity: 0.7,
    marginLeft: '4px'
  }
};
