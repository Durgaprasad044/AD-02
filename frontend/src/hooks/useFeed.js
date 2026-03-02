import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed, createPost } from '../store/slices/feedSlice';

export default function useFeed() {
  const dispatch = useDispatch();
  const { data: posts, loading, error, hasMore } = useSelector((state) => state.feed);

  useEffect(() => {
    // Only fetch if empty to prevent remount fetch loops
    if (posts.length === 0 && !loading) {
      dispatch(fetchFeed({ page: 1 }));
    }
  }, [dispatch, posts.length, loading]);

  const loadMore = () => {
    if (!loading && hasMore) {
      // Calculate next page based on current posts length or store page state
      const nextPage = Math.floor(posts.length / 10) + 1;
      dispatch(fetchFeed({ page: nextPage }));
    }
  };

  const submitPost = (content) => {
    dispatch(createPost({ content }));
  };

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    submitPost
  };
}
