import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateUserProfile, logout } from '../store/slices/authSlice';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const containerStyle = {
    maxWidth: '640px',
    margin: '0 auto',
    padding: 'var(--spacing-2xl)',
    backgroundColor: 'var(--color-card)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border)',
    marginTop: 'var(--spacing-2xl)',
    boxShadow: 'var(--shadow-md)'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xl)',
    marginBottom: 'var(--spacing-2xl)',
  };

  const fieldStyle = {
    marginBottom: 'var(--spacing-lg)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 'var(--spacing-sm)',
    color: 'var(--color-muted-foreground)',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'uppercase'
  };

  const inputStyle = {
    width: '100%',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-muted)',
    color: 'var(--color-foreground)',
    outline: 'none',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'all var(--transition-fast)'
  };

  if (loading && !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <Loader />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div style={{ padding: 'var(--spacing-xl)' }}>
        <ErrorState message={error} onRetry={() => dispatch(fetchProfile())} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <Avatar name={user?.name || 'User'} size="lg" src={user?.avatar} />
        <div>
          <h2 style={{ margin: 0, color: 'var(--color-foreground)' }}>{user?.name}</h2>
          <p style={{ margin: 0, color: 'var(--color-muted-foreground)' }}>{user?.email}</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
           {!isEditing && (
             <Button label="Edit Profile" variant="ghost" onClick={() => setIsEditing(true)} />
           )}
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Full Name</label>
        <input
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          disabled={!isEditing}
          style={{ ...inputStyle, opacity: isEditing ? 1 : 0.7 }}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Bio</label>
        <textarea
          name="bio"
          value={formData.bio || ''}
          onChange={handleChange}
          disabled={!isEditing}
          style={{ ...inputStyle, height: '100px', resize: 'vertical', opacity: isEditing ? 1 : 0.7 }}
        />
      </div>
      
      {/* Add more fields (skills, title, etc) as needed */}

      {isEditing && (
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end', marginTop: 'var(--spacing-xl)' }}>
          <Button label="Cancel" variant="ghost" onClick={() => { setIsEditing(false); setFormData(user); }} />
          <Button label="Save Changes" variant="primary" onClick={handleSave} />
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--color-border)', marginTop: 'var(--spacing-2xl)', paddingTop: 'var(--spacing-lg)' }}>
        <Button 
          label="Sign Out" 
          variant="danger" 
          onClick={() => dispatch(logout())} 
          style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--color-destructive)', color: 'var(--color-destructive)' }}
        />
      </div>
    </div>
  );
};

export default ProfileScreen;
