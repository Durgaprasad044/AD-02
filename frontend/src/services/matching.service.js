import api from './api';

export const getMatches = (filters = {}) => {
  return api.get('/matches', { params: filters });
};

export const acceptMatch = (matchId) => {
  return api.post(`/matches/${matchId}/accept`);
};

export const rejectMatch = (matchId) => {
  return api.post(`/matches/${matchId}/reject`);
};

export default {
  getMatches,
  acceptMatch,
  rejectMatch,
};
