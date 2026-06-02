import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const createPaymentIntent = createAsyncThunk(
    'stripe/createPaymentIntent',
    async ({ missingAmount, orderDto }, { rejectWithValue }) => {
        try {
            return await api.url('/payments/topup-and-order')
                .post({ missingAmount, orderDto })
                .json();
        } catch (error) {
            return rejectWithValue(error.message || 'Erreur d\'initialisation du paiement');
        }
    }
);

const stripeSlice = createSlice({
    name: 'stripe',
    initialState: {
        clientSecret: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearStripeState: (state) => {
            state.clientSecret = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentIntent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action) => {
                state.loading = false;
                state.clientSecret = action.payload.clientSecret;
            })
            .addCase(createPaymentIntent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearStripeState } = stripeSlice.actions;
export default stripeSlice.reducer;