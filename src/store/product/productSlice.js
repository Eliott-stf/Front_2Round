import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

export const fetchProducts = createAsyncThunk('products/fetchAll', (filters = {}, { rejectWithValue }) => {
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
    return api.url('/products').query(cleanFilters).get().json().catch(() => rejectWithValue('Erreur chargement produits'));
});

export const fetchProductById = createAsyncThunk('products/fetchOne', (id, { rejectWithValue }) =>
    api.url(`/products/${id}`).get().json().catch(() => rejectWithValue('Produit introuvable'))
);

export const fetchMyProducts = createAsyncThunk('products/fetchMine', (sellerId, { rejectWithValue }) =>
    api.url('/products').query({ sellerId }).get().json().catch(() => rejectWithValue('Erreur chargement mes produits'))
);

export const createProduct = createAsyncThunk('products/create', (data, { rejectWithValue }) =>
    api.url('/products').post(data).json().catch(() => rejectWithValue('Erreur création produit'))
);

export const updateProduct = createAsyncThunk('products/update', ({ id, data }, { rejectWithValue }) =>
    api.url(`/products/${id}`).patch(data).json().catch(() => rejectWithValue('Erreur modification produit'))
);

export const deleteProduct = createAsyncThunk('products/delete', (id, { rejectWithValue }) =>
    api.url(`/products/${id}`).delete().res().then(() => id).catch(() => rejectWithValue('Erreur suppression produit'))
);

const initialFilters = {
    search: '', categoryId: '', condition: '', minPrice: '', maxPrice: '', page: 1, limit: 20,
};

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        myItems: [],
        current: null,
        meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
        filters: initialFilters,
        loading: false,
        error: null,
    },
    reducers: {
        setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload, page: 1 }; },
        setPage: (state, action) => { state.filters.page = action.payload; },
        resetFilters: (state) => { state.filters = initialFilters; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => { state.current = action.payload; })
            .addCase(fetchMyProducts.fulfilled, (state, action) => {
                console.log('action.payload:', action.payload); // ← ajoute ce log
                state.myItems = action.payload.data; // ← doit être .data
            })
            .addCase(createProduct.fulfilled, (state, action) => { state.myItems.unshift(action.payload); })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.myItems.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.myItems[index] = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.myItems = state.myItems.filter(p => p.id !== action.payload);
            })
            .addMatcher(
                (action) => action.type.startsWith('products/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('products/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
                (state, action) => {
                    state.loading = false;
                    if (action.type.endsWith('/rejected')) state.error = action.payload;
                }
            );
    },
});

export const { setFilters, setPage, resetFilters } = productSlice.actions;
export default productSlice.reducer;