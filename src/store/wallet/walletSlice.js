import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

export const fetchMyWallet = createAsyncThunk(
    'wallet/fetchMyWallet',
    (_, { rejectWithValue }) => {
        return api
            .url('/wallet/me')
            .get()
            .json()
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return rejectWithValue(
                    error.message || 'Erreur lors de la récupération du portefeuille'
                );
            });
    }
);

const initialState = {
    current: null,
    loading: false,
    error: null,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        clearWallet: (state) => {
            state.current = null;
            state.error = null;
        },
        // Mise à jour locale optimiste post-paiement sans recharger depuis l'API
        decrementBalance: (state, action) => {
            if (state.current) {
                state.current.balance -= action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyWallet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(fetchMyWallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearWallet, decrementBalance } = walletSlice.actions;
export default walletSlice.reducer;