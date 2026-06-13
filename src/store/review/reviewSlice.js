import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';
import { handleApiError } from '@/utils/apiErrorHandler';

export const fetchReviewsByUser = createAsyncThunk('reviews/fetchByUser', (userId, { rejectWithValue }) =>
  api.url(`/reviews/user/${userId}`).get().json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur chargement avis utilisateur')))
);

export const fetchReviewByOrder = createAsyncThunk('reviews/fetchByOrder', (orderId, { rejectWithValue }) =>
  api.url(`/reviews/order/${orderId}`).get().json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur chargement avis commande')))
);

export const createReview = createAsyncThunk('reviews/create', ({ orderId, data }, { rejectWithValue }) =>
  api.url(`/reviews/${orderId}`).post(data).json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur création avis')))
);

export const deleteReview = createAsyncThunk('reviews/delete', (id, { rejectWithValue }) =>
  api.url(`/reviews/${id}`).delete().res().then(() => id).catch((err) => rejectWithValue(handleApiError(err, 'Erreur suppression avis')))
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    currentOrderReview: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByUser.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchReviewByOrder.fulfilled, (state, action) => {
        state.currentOrderReview = action.payload || null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.currentOrderReview = action.payload;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r.id !== action.payload);
        if (state.currentOrderReview?.id === action.payload) {
          state.currentOrderReview = null;
        }
      })
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

export const { clearReviewError } = reviewSlice.actions;
export default reviewSlice.reducer;