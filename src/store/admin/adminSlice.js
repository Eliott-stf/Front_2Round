import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

// --- THUNKS ---

// Récupérer tous les utilisateurs
export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            return await api.url('/users').get().json();
        } catch (error) {
            return rejectWithValue('Erreur lors du chargement des utilisateurs');
        }
    }
);

// Bannir / Débannir un utilisateur (Toggle)
export const toggleUserBan = createAsyncThunk(
    'admin/toggleUserBan',
    async (userId, { rejectWithValue }) => {
        try {
            return await api.url(`/users/${userId}/ban`).patch().json();
        } catch (error) {
            return rejectWithValue('Erreur lors de la modification du statut');
        }
    }
);

// Récupérer tous les produits pour le BackOffice
export const fetchAdminProducts = createAsyncThunk(
    'admin/fetchAdminProducts',
    async (_, { rejectWithValue }) => {
        try {
            return await api.url('/products/admin/all').get().json();
        } catch (error) {
            return rejectWithValue('Erreur lors du chargement des produits');
        }
    }
);

// Archiver / Désarchiver un produit
export const toggleAdminProductArchive = createAsyncThunk(
    'admin/toggleAdminProductArchive',
    async (productId, { rejectWithValue }) => {
        try {
            return await api.url(`/products/admin/${productId}/toggle-archive`).patch().json();
        } catch (error) {
            return rejectWithValue('Erreur lors de la modification du statut du produit');
        }
    }
);

// Récupérer le détail complet d'un utilisateur pour le BackOffice
export const fetchAdminUserDetail = createAsyncThunk(
    'admin/fetchAdminUserDetail',
    async (userId, { rejectWithValue }) => {
        try {
            return await api.url(`/users/admin/${userId}`).get().json();
        } catch (error) {
            return rejectWithValue('Erreur lors du chargement des détails de l\'utilisateur');
        }
    }
);

// Récupérer toutes les commandes pour le BackOffice
export const fetchAdminOrders = createAsyncThunk(
    'admin/fetchAdminOrders',
    async (_, { rejectWithValue }) => {
        try {
            return await api.url('/orders/all').get().json();
        } catch (error) {
            return rejectWithValue('Erreur lors du chargement des commandes');
        }
    }
);

// --- SLICE ---

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        products: [],
        orders: [],
        userDetail: null,
        loading: false,
        error: null,
    },
    reducers: {
        // Reducers synchrones si besoin
    },
    extraReducers: (builder) => {
        builder
            // FETCH ALL USERS
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                // Gestion de { data: [...] } ou [...] selon l'API
                state.users = action.payload?.data || action.payload || [];
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // TOGGLE USER BAN
            .addCase(toggleUserBan.fulfilled, (state, action) => {
                const updatedUser = action.payload?.data || action.payload;
                if (updatedUser && updatedUser.id) {
                    const index = state.users.findIndex(u => u.id === updatedUser.id);
                    if (index !== -1) {
                        // On met à jour l'utilisateur dans la liste sans recharger toute la page
                        state.users[index] = { ...state.users[index], ...updatedUser };
                    }
                }
            })
            
            // FETCH ALL PRODUCTS
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload?.data || action.payload || [];
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // TOGGLE PRODUCT ARCHIVE
            .addCase(toggleAdminProductArchive.fulfilled, (state, action) => {
                const updatedProduct = action.payload?.data || action.payload;
                if (updatedProduct && updatedProduct.id) {
                    const index = state.products.findIndex(p => p.id === updatedProduct.id);
                    if (index !== -1) {
                        state.products[index] = { ...state.products[index], ...updatedProduct };
                    }
                }
            })
            
            // FETCH USER DETAIL
            .addCase(fetchAdminUserDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.userDetail = null;
            })
            .addCase(fetchAdminUserDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail = action.payload?.data || action.payload;
            })
            .addCase(fetchAdminUserDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // FETCH ALL ORDERS
            .addCase(fetchAdminOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload?.data || action.payload || [];
            })
            .addCase(fetchAdminOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default adminSlice.reducer;
