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

// Récupérer toutes les commandes
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

// Annuler et rembourser une commande
export const cancelAdminOrder = createAsyncThunk(
    'admin/cancelAdminOrder',
    async (id, { rejectWithValue }) => {
        try {
            return await api.url(`/orders/admin/${id}/cancel-refund`).patch().json();
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'annulation de la commande');
        }
    }
);

// Récupérer tous les signalements pour le BackOffice
export const fetchAdminReports = createAsyncThunk(
    'admin/fetchAdminReports',
    async (_, { rejectWithValue }) => {
        try {
            return await api.url('/reports').get().json();
        } catch (error) {
            return rejectWithValue('Erreur lors du chargement des signalements');
        }
    }
);

// Récupérer le détail d'un signalement
export const fetchAdminReportById = createAsyncThunk(
    'admin/fetchAdminReportById',
    async (reportId, { rejectWithValue }) => {
        try {
            return await api.url(`/reports/${reportId}`).get().json();
        } catch (error) {
            return rejectWithValue('Erreur lors du chargement des détails du signalement');
        }
    }
);

// Marquer un signalement comme résolu
export const resolveAdminReport = createAsyncThunk(
    'admin/resolveAdminReport',
    async (reportId, { rejectWithValue }) => {
        try {
            return await api.url(`/reports/${reportId}/resolve`).patch().json();
        } catch (error) {
            return rejectWithValue('Erreur lors de la résolution du signalement');
        }
    }
);

// Récupérer les statistiques du Dashboard d'administration
export const fetchAdminDashboardStats = createAsyncThunk(
    'admin/fetchAdminDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            return await api.url('/users/admin/dashboard/stats').get().json();
        } catch (error) {
            return rejectWithValue('Erreur lors du chargement des statistiques du dashboard');
        }
    }
);

// Récupérer tous les types de signalement
export const fetchAdminTypeReports = createAsyncThunk(
    'admin/fetchAdminTypeReports',
    async (_, { rejectWithValue }) => {
        try {
            return await api.url('/type-reports').get().json();
        } catch (error) {
            return rejectWithValue('Erreur lors du chargement des types de signalement');
        }
    }
);

// Créer un type de signalement
export const createAdminTypeReport = createAsyncThunk(
    'admin/createAdminTypeReport',
    async (payload, { rejectWithValue }) => {
        try {
            return await api.url('/type-reports').post(payload).json();
        } catch (error) {
            return rejectWithValue('Erreur lors de la création du type de signalement');
        }
    }
);

// Supprimer un type de signalement
export const deleteAdminTypeReport = createAsyncThunk(
    'admin/deleteAdminTypeReport',
    async (id, { rejectWithValue }) => {
        try {
            await api.url(`/type-reports/${id}`).delete().res();
            return id;
        } catch (error) {
            return rejectWithValue('Erreur lors de la suppression du type de signalement');
        }
    }
);

// --- SLICE ---

const adminSlice = createSlice({
    name: 'admin',
    //on déclare nos state
    initialState: {
        users: [],
        products: [],
        orders: [],
        reports: [],
        typeReports: [],
        reportDetail: null,
        userDetail: null,
        dashboardStats: null,
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
                    // On met à jour l'utilisateur dans le signalement en cours si nécessaire
                    if (state.reportDetail) {
                        if (state.reportDetail.user?.id === updatedUser.id) {
                            state.reportDetail.user = { ...state.reportDetail.user, ...updatedUser };
                        }
                        if (state.reportDetail.product?.seller?.id === updatedUser.id) {
                            state.reportDetail.product.seller = { ...state.reportDetail.product.seller, ...updatedUser };
                        }
                        if (state.reportDetail.conversation) {
                            if (state.reportDetail.conversation.buyer?.id === updatedUser.id) {
                                state.reportDetail.conversation.buyer = { ...state.reportDetail.conversation.buyer, ...updatedUser };
                            }
                            if (state.reportDetail.conversation.product?.seller?.id === updatedUser.id) {
                                state.reportDetail.conversation.product.seller = { ...state.reportDetail.conversation.product.seller, ...updatedUser };
                            }
                        }
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
                    // On met à jour le produit dans le signalement en cours si nécessaire
                    if (state.reportDetail) {
                        if (state.reportDetail.productId === updatedProduct.id && state.reportDetail.product) {
                            state.reportDetail.product = { ...state.reportDetail.product, ...updatedProduct };
                        }
                        if (state.reportDetail.conversation?.product?.id === updatedProduct.id) {
                            state.reportDetail.conversation.product = { ...state.reportDetail.conversation.product, ...updatedProduct };
                        }
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
                //loading et erreur
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminOrders.fulfilled, (state, action) => {
                //loading et erreur
                state.loading = false;
                state.orders = action.payload?.data || action.payload || [];
            })
            .addCase(fetchAdminOrders.rejected, (state, action) => {
                //loading et erreur
                state.loading = false;
                state.error = action.payload;
            })

            // CANCEL ORDER
            .addCase(cancelAdminOrder.fulfilled, (state, action) => {
                const updatedOrder = action.payload?.data || action.payload;
                if (updatedOrder) {
                    const index = state.orders.findIndex(o => o.id === updatedOrder.id);
                    if (index !== -1) {
                        state.orders[index] = { ...state.orders[index], status: updatedOrder.status };
                    }
                }
            })
            
            // FETCH ALL REPORTS
            .addCase(fetchAdminReports.pending, (state) => {
                //loading et erreur
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminReports.fulfilled, (state, action) => {
                //loading et erreur
                state.loading = false;
                state.reports = action.payload?.data || action.payload || [];
            })
            .addCase(fetchAdminReports.rejected, (state, action) => {
                //loading et erreur
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH REPORT BY ID
            .addCase(fetchAdminReportById.pending, (state) => {
                //loading et erreur
                state.loading = true;
                state.error = null;
                state.reportDetail = null;
            })
            .addCase(fetchAdminReportById.fulfilled, (state, action) => {
                //loading et erreur
                state.loading = false;
                state.reportDetail = action.payload?.data || action.payload;
            })
            .addCase(fetchAdminReportById.rejected, (state, action) => {
                //loading et erreur
                state.loading = false;
                state.error = action.payload;
            })

            // RESOLVE REPORT
            .addCase(resolveAdminReport.fulfilled, (state, action) => {
                const updatedReport = action.payload?.data || action.payload;
                if (updatedReport && updatedReport.id) {
                    const index = state.reports.findIndex(r => r.id === updatedReport.id);
                    if (index !== -1) {
                        state.reports[index] = { ...state.reports[index], ...updatedReport };
                    }
                    if (state.reportDetail?.id === updatedReport.id) {
                        state.reportDetail = { ...state.reportDetail, ...updatedReport };
                    }
                }
            })
            
            // FETCH DASHBOARD STATS
            .addCase(fetchAdminDashboardStats.pending, (state) => {
                //loading et erreur
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminDashboardStats.fulfilled, (state, action) => {
                //loading et erreur
                state.loading = false;
                state.dashboardStats = action.payload?.data || action.payload || null;
            })
            .addCase(fetchAdminDashboardStats.rejected, (state, action) => {
                //loading et erreur
                state.loading = false;
                state.error = action.payload;
            })
            
            // FETCH TYPE REPORTS
            .addCase(fetchAdminTypeReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminTypeReports.fulfilled, (state, action) => {
                state.loading = false;
                state.typeReports = action.payload?.data || action.payload || [];
            })
            .addCase(fetchAdminTypeReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // CREATE TYPE REPORT
            .addCase(createAdminTypeReport.fulfilled, (state, action) => {
                const newType = action.payload?.data || action.payload;
                if (newType) {
                    state.typeReports.push(newType);
                }
            })
            
            // DELETE TYPE REPORT
            .addCase(deleteAdminTypeReport.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.typeReports = state.typeReports.filter(tr => tr.id !== deletedId);
            });
    }
});

export default adminSlice.reducer;
