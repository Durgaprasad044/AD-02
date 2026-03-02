import api from './api';

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const getProfile = () => {
  return api.get('/auth/me');
};

export const updateProfile = (data) => {
  return api.put('/auth/me', data);
};

export default {
  login,
  register,
  getProfile,
  updateProfile,
};
