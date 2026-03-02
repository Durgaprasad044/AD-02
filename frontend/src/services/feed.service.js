import api from './api';

export const getFeeds = () => {
  return api.get('/posts');
};

export const createPost = (content) => {
  return api.post('/posts', { content });
};

export const likePost = (postId) => {
  return api.post(`/posts/${postId}/like`);
};

export default {
  getFeeds,
  createPost,
  likePost,
};
