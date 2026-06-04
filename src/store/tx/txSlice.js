// On importe nos dépendances
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

// On déclare nos actions asynchrones (Thunks)
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchByUser',
  async (_, { rejectWithValue }) => {
    return api.url('/transactions').get().json().catch((err) => rejectWithValue(err.message || 'Erreur lors du chargement des transactions'));
  }
);

// On déclare notre slice
const txSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('transactions/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('transactions/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
        (state, action) => {
          state.loading = false;
          if (action.type.endsWith('/rejected')) {
            state.error = action.payload;
          }
        }
      );
  },
});

export default txSlice.reducer;