import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

export const fetchReviewsByUser = createAsyncThunk('reviews/fetchByUser', (userId, { rejectWithValue }) =>
  api.url(`/reviews/user/${userId}`).get().json().catch(() => rejectWithValue('Erreur chargement avis'))
);

export const createReview = createAsyncThunk('reviews/create', ({ orderId, data }, { rejectWithValue }) =>
  api.url(`/reviews/${orderId}`).post(data).json().catch(() => rejectWithValue('Erreur création avis'))
);

export const deleteReview = createAsyncThunk('reviews/delete', (id, { rejectWithValue }) =>
  api.url(`/reviews/${id}`).delete().res().then(() => id).catch(() => rejectWithValue('Erreur suppression avis'))
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByUser.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(createReview.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(deleteReview.fulfilled, (state, action) => { state.items = state.items.filter(r => r.id !== action.payload); })
      .addMatcher(
        (action) => action.type.startsWith('reviews/') && action.type.endsWith('/pending'),
        (state) => { state.loading = true; state.error = null; }
      )
      .addMatcher(
        (action) => action.type.startsWith('reviews/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
        (state, action) => {
          state.loading = false;
          if (action.type.endsWith('/rejected')) state.error = action.payload;
        }
      );
  },
});

export default reviewSlice.reducer;