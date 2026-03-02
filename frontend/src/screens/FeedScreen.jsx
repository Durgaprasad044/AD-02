import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '../store/slices/feedSlice';
import CreatePost from '../components/feed/CreatePost';
import Card from '../components/common/Card';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';

const FeedScreen = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.feed);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = (content) => {
    dispatch(createPost({ content }));
  };

  const containerStyle = {
    maxWidth: '720px',
    margin: '0 auto',
    padding: 'var(--spacing-xl) 0',
  };

  const postHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-md)',
  };

  const postAuthorStyle = {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: 'var(--color-text-primary)',
  };

  const postDateStyle = {
    fontSize: '0.8rem',
    color: 'var(--color-text-secondary)',
  };

  const postContentStyle = {
    marginBottom: 'var(--spacing-lg)',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    color: 'var(--color-text-primary)',
    fontSize: '1rem',
  };

  const postActionsStyle = {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    borderTop: '1px solid var(--color-border)',
    paddingTop: 'var(--spacing-md)',
  };

  if (loading && posts.length === 0) {
    return (
      <div style={containerStyle}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <ErrorState message={error} onRetry={() => dispatch(fetchPosts())} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <CreatePost onPost={handleCreatePost} user={user} />

      {posts.length === 0 ? (
        <EmptyState 
          icon="📭" 
          title="Your feed is empty" 
          message="Connect with others to see their updates here." 
        />
      ) : (
        posts.map((post) => (
          <Card key={post.id} style={{ marginBottom: 'var(--spacing-xl)', backgroundColor: 'var(--color-glass)', backdropFilter: 'blur(12px)' }} hoverable>
            <div style={postHeaderStyle}>
              <Avatar src={post.author?.avatar} name={post.author?.name || 'Unknown'} size="md" />
              <div>
                <div style={postAuthorStyle}>{post.author?.name || 'Unknown User'}</div>
                <div style={postDateStyle}>
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { 
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                  }) : ''}
                </div>
              </div>
            </div>
            <div style={postContentStyle}>{post.content}</div>
            <div style={postActionsStyle}>
              <Button 
                label={`Like ${post.likes > 0 ? `(${post.likes})` : ''}`} 
                variant="ghost" 
                size="sm" 
                icon="👍"
                style={{ color: 'var(--color-text-secondary)' }}
              />
              <Button label="Comment" variant="ghost" size="sm" icon="💬" style={{ color: 'var(--color-text-secondary)' }} />
              <Button label="Share" variant="ghost" size="sm" icon="🔗" style={{ color: 'var(--color-text-secondary)' }} />
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default FeedScreen;
