import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMatches = createAsyncThunk('matches/fetch', async () => {
  return []; // Mock
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    removeMatch: (state, action) => {
      state.data = state.data.filter(match => match.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeMatch } = matchSlice.actions;
export default matchSlice.reducer;
