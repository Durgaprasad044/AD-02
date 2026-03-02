import React from 'react';

export default function GoalsDisplay({ goals }) {
  if (!goals || goals.length === 0) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Goals</h3>
        <p style={styles.empty}>No network goals listed.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Networking Goals</h3>
      <div style={styles.list}>
        {goals.map((goal, index) => (
          <div key={index} style={styles.badge}>
            {goal}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {},
  title: {
    fontSize: '1rem',
    color: 'var(--color-foreground)',
    marginBottom: 'var(--spacing-md)',
    fontWeight: 600,
  },
  empty: {
    color: 'var(--color-muted-foreground)',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing-sm)'
  },
  badge: {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-secondary-foreground)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    border: '1px solid var(--color-border)'
  }
};
