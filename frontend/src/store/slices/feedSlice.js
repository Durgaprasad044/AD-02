import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedService from '../../services/feed.service';

export const fetchPosts = createAsyncThunk('feed/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await feedService.getFeeds();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createPost = createAsyncThunk('feed/create', async (content, { rejectWithValue }) => {
  try {
    const response = await feedService.createPost(content);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addPost: (state, action) => {
      // For real-time updates
      state.posts.unshift(action.payload);
    },
    setPosts: (state, action) => {
      // For manual setting if needed
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload || [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      });
  },
});

export const { addPost, setPosts } = feedSlice.actions;
export default feedSlice.reducer;
