import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { handleApiError } from '@/utils/apiErrorHandler';

// Récupération de la liste des adresses
export const fetchAddresses = createAsyncThunk(
    'address/fetchAddresses',
    async (_, { rejectWithValue }) => {
        try {
            return await api.url('/addresses').get().json();
        } catch (error) {
            return rejectWithValue(handleApiError(error, 'Échec de la récupération des adresses'));
        }
    }
);

// Création d'une nouvelle adresse
export const createAddress = createAsyncThunk(
    'address/createAddress',
    async (addressDto, { rejectWithValue }) => {
        try {
            return await api.url('/addresses').post(addressDto).json();
        } catch (error) {
            return rejectWithValue(handleApiError(error, 'Échec de la création de l\'adresse'));
        }
    }
);

// Mise à jour d'une adresse existante
export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async ({ id, ...addressDto }, { rejectWithValue }) => {
        try {
            return await api.url(`/addresses/${id}`).patch(addressDto).json();
        } catch (error) {
            return rejectWithValue(handleApiError(error, 'Échec de la mise à jour de l\'adresse'));
        }
    }
);

// Suppression d'une adresse
export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (id, { rejectWithValue }) => {
        try {
            await api.url(`/addresses/${id}`).delete().res();
            return id; 
        } catch (error) {
            return rejectWithValue(handleApiError(error, 'Échec de la suppression de l\'adresse'));
        }
    }
);

const initialState = {
    list: [],
    selectedShippingId: null,
    selectedBillingId: null,
    isFormOpen: false,
    loading: false,
    error: null,
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setShippingId: (state, action) => {
            state.selectedShippingId = action.payload;
            // Par défaut, l'adresse de facturation s'aligne sur la livraison si non spécifiée
            if (!state.selectedBillingId) {
                state.selectedBillingId = action.payload;
            }
        },
        setBillingId: (state, action) => {
            state.selectedBillingId = action.payload;
        },
        toggleForm: (state, action) => {
            state.isFormOpen = action.payload !== undefined ? action.payload : !state.isFormOpen;
        },
        clearAddressError: (state) => {
            state.error = null;
        },
        resetAddressState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                // Auto-sélection si la liste n'est pas vide et qu'aucune sélection n'est active
                if (action.payload.length > 0 && !state.selectedShippingId) {
                    state.selectedShippingId = action.payload[0].id;
                    state.selectedBillingId = action.payload[0].id;
                }
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create
            .addCase(createAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
                state.selectedShippingId = action.payload.id;
                state.selectedBillingId = action.payload.id;
                state.isFormOpen = false;
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((a) => a.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
                state.isFormOpen = false;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((a) => a.id !== action.payload);
                if (state.selectedShippingId === action.payload) {
                    state.selectedShippingId = state.list.length > 0 ? state.list[0].id : null;
                }
                if (state.selectedBillingId === action.payload) {
                    state.selectedBillingId = state.list.length > 0 ? state.list[0].id : null;
                }
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setShippingId, setBillingId, toggleForm, clearAddressError, resetAddressState } = addressSlice.actions;
export default addressSlice.reducer;