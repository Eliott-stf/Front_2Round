// On importe nos dépendances
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

// On déclare nos actions asynchrones (Thunks)
export const fetchBankAccounts = createAsyncThunk(
  'bankAccounts/fetchAll',
  async (_, { rejectWithValue }) => {
    return api.url('/bank-accounts').get().json().catch((err) => rejectWithValue(err.message || 'Erreur chargement des comptes bancaires'));
  }
);

export const fetchBankAccountById = createAsyncThunk(
  'bankAccounts/fetchById',
  async (id, { rejectWithValue }) => {
    return api.url(`/bank-accounts/${id}`).get().json().catch((err) => rejectWithValue(err.message || 'Erreur chargement du compte bancaire'));
  }
);

export const createBankAccount = createAsyncThunk(
  'bankAccounts/create',
  async (data, { rejectWithValue }) => {
    return api.url('/bank-accounts').post(data).json().catch((err) => rejectWithValue(err.message || 'Erreur lors de la création du compte bancaire'));
  }
);

export const updateBankAccount = createAsyncThunk(
  'bankAccounts/update',
  async ({ id, data }, { rejectWithValue }) => {
    return api.url(`/bank-accounts/${id}`).patch(data).json().catch((err) => rejectWithValue(err.message || 'Erreur lors de la mise à jour du compte bancaire'));
  }
);

export const setDefaultBankAccount = createAsyncThunk(
  'bankAccounts/setDefault',
  async (id, { rejectWithValue }) => {
    return api.url(`/bank-accounts/${id}/default`).patch().json().catch((err) => rejectWithValue(err.message || 'Erreur lors de la définition du compte par défaut'));
  }
);

export const deleteBankAccount = createAsyncThunk(
  'bankAccounts/delete',
  async (id, { rejectWithValue }) => {
    return api.url(`/bank-accounts/${id}`).delete().json().then(() => id).catch((err) => rejectWithValue(err.message || 'Erreur lors de la suppression du compte bancaire'));
  }
);

// On déclare notre slice
const bankAccountSlice = createSlice({
  name: 'bankAccounts',
  initialState: {
    items: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentBankAccount: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBankAccounts
      .addCase(fetchBankAccounts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // fetchBankAccountById
      .addCase(fetchBankAccountById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      // createBankAccount
      .addCase(createBankAccount.fulfilled, (state, action) => {
        // Si le nouveau compte est par défaut, on retire le flag des autres localement
        if (action.payload.isDefault) {
          state.items.forEach(account => account.isDefault = false);
        }
        state.items.unshift(action.payload);
      })
      // updateBankAccount
      .addCase(updateBankAccount.fulfilled, (state, action) => {
        const index = state.items.findIndex(acc => acc.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
        if (state.current?.id === action.payload.id) {
          state.current = { ...state.current, ...action.payload };
        }
      })
      // setDefaultBankAccount
      .addCase(setDefaultBankAccount.fulfilled, (state, action) => {
        state.items.forEach(account => {
          account.isDefault = account.id === action.payload.id;
        });
      })
      // deleteBankAccount
      .addCase(deleteBankAccount.fulfilled, (state, action) => {
        state.items = state.items.filter(acc => acc.id !== action.payload);
        if (state.current?.id === action.payload) {
          state.current = null;
        }
      })
      // Gestion globale du chargement et des erreurs
      .addMatcher(
        (action) => action.type.startsWith('bankAccounts/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('bankAccounts/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
        (state, action) => {
          state.loading = false;
          if (action.type.endsWith('/rejected')) {
            state.error = action.payload;
          }
        }
      );
  },
});

export const { clearCurrentBankAccount } = bankAccountSlice.actions;
export default bankAccountSlice.reducer;