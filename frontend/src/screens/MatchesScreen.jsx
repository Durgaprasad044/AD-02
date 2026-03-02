import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches, acceptMatch, rejectMatch } from '../store/slices/matchesSlice'; 
import MatchCard from '../components/matching/MatchCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';

const MatchesScreen = () => {
  const dispatch = useDispatch();
  const { items: matches, loading, error } = useSelector((state) => state.matches);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const handleConnect = (id) => {
    dispatch(acceptMatch(id));
  };

  const handleDismiss = (id) => {
    dispatch(rejectMatch(id));
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--spacing-xl) 0',
  };

  const headerStyle = {
    marginBottom: 'var(--spacing-3xl)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    marginBottom: 'var(--spacing-sm)',
    color: 'var(--color-text-primary)',
    fontWeight: '700',
    letterSpacing: '-0.03em',
  };

  const subtitleStyle = {
    color: 'var(--color-text-secondary)',
    fontSize: '1.25rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: 'var(--spacing-2xl)',
    alignItems: 'stretch',
  };

  if (loading && matches.length === 0) {
    return (
      <div style={containerStyle}>
        <Loader size="48px" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <ErrorState message={error} onRetry={() => dispatch(fetchMatches())} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>AI-Powered Matches</h2>
        <p style={subtitleStyle}>Professionals curated just for you based on your skills and goals.</p>
      </div>

      {matches.length === 0 ? (
        <EmptyState 
          icon="✨" 
          title="You're all caught up!" 
          message="We're looking for more great matches for you. Check back soon." 
        />
      ) : (
        <div style={gridStyle}>
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onConnect={handleConnect}
              onDismiss={handleDismiss}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesScreen;
