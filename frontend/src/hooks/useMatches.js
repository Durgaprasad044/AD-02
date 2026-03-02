import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches, acceptMatch } from '../store/slices/matchesSlice';

export default function useMatches() {
  const dispatch = useDispatch();
  const { items: matches, loading, error } = useSelector((state) => state.matches);

  useEffect(() => {
    // Only fetch if empty or on distinct mount
    if (matches.length === 0 && !loading) {
      dispatch(fetchMatches());
    }
  }, [dispatch, matches.length, loading]);

  const updateFilters = useCallback((newFilters) => {
    dispatch(fetchMatches(newFilters));
  }, [dispatch]);

  const connect = useCallback((matchId) => {
    dispatch(acceptMatch(matchId));
  }, [dispatch]);

  return {
    matches,
    loading,
    error,
    updateFilters,
    connect
  };
}
