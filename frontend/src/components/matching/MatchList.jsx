import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMatches from '../../hooks/useMatches';
import MatchCard from './MatchCard';
import Loader from '../common/Loader';
import ErrorState from '../common/ErrorState';
import Button from '../common/Button';

export default function MatchList() {
  const { matches, loading, error, connect, updateFilters, filters } = useMatches();
  const navigate = useNavigate();

  const handleConnect = (id) => {
    connect(id);
  };

  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleDismiss = (id) => {
    // Optionally implement a dismiss action in useMatches/Redux
    console.log('Dismissed match:', id);
  };

  // Simple filter UI example if needed, or rely on Redux state
  const handleFilterChange = (filterType) => {
    updateFilters({ ...filters, type: filterType });
  };

  if (loading && matches.length === 0) {
    return (
      <div style={styles.center}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <ErrorState message={error} onRetry={() => updateFilters({ ...filters })} />
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h3 style={styles.emptyTitle}>No matches found</h3>
        <p style={styles.emptyText}>We couldn't find any professionals matching your current criteria.</p>
        <Button label="Clear Filters" variant="outline" onClick={() => updateFilters({})} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Your Smart Matches</h2>
        <div style={styles.filters}>
          {/* Example filter triggers */}
          <Button 
            label="All" 
            variant={!filters?.type ? 'primary' : 'ghost'} 
            onClick={() => handleFilterChange(null)} 
          />
          <Button 
            label="High Compatibility" 
            variant={filters?.type === 'high' ? 'primary' : 'ghost'} 
            onClick={() => handleFilterChange('high')} 
          />
          <Button 
            label="Shared Skills" 
            variant={filters?.type === 'skills' ? 'primary' : 'ghost'} 
            onClick={() => handleFilterChange('skills')} 
          />
        </div>
      </div>
      <div style={styles.grid}>
        {matches.map(match => (
          <MatchCard 
            key={match.id} 
            match={match} 
            onConnect={handleConnect} 
            onViewProfile={handleViewProfile}
            onDismiss={handleDismiss} 
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xl)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)'
  },
  title: {
    color: 'var(--color-text-primary)',
    margin: 0,
    fontSize: '1.5rem'
  },
  filters: {
    display: 'flex',
    gap: 'var(--spacing-sm)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'var(--spacing-xl)',
    alignItems: 'stretch' // Ensures cards in a row have same height
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px'
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-3xl)',
    backgroundColor: 'var(--color-glass)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    textAlign: 'center',
    backdropFilter: 'blur(12px)'
  },
  emptyTitle: {
    color: 'var(--color-text-primary)',
    fontSize: '1.25rem',
    marginBottom: 'var(--spacing-sm)'
  },
  emptyText: {
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--spacing-lg)'
  }
};
