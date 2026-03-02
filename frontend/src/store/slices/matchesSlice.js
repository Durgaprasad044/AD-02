import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import matchingService from '../../services/matching.service';

// Async thunk to fetch matches
export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await matchingService.getMatches(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to accept a match
export const acceptMatch = createAsyncThunk(
  'matches/acceptMatch',
  async (matchId, { rejectWithValue }) => {
    try {
      const response = await matchingService.acceptMatch(matchId);
      return { matchId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to reject a match
export const rejectMatch = createAsyncThunk(
  'matches/rejectMatch',
  async (matchId, { rejectWithValue }) => {
    try {
      await matchingService.rejectMatch(matchId);
      return matchId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    updateMatch: (state, action) => {
      const index = state.items.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    removeMatch: (state, action) => {
      state.items = state.items.filter(m => m.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Matches
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Accept Match
      .addCase(acceptMatch.fulfilled, (state, action) => {
        // Optimistic update: Remove from potential matches list or update status
        state.items = state.items.filter(m => m.id !== action.payload.matchId);
      })
      // Reject Match
      .addCase(rejectMatch.fulfilled, (state, action) => {
        state.items = state.items.filter(m => m.id !== action.payload);
      });
  },
});

export const { updateMatch, removeMatch } = matchesSlice.actions;
export default matchesSlice.reducer;
