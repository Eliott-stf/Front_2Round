import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';
import { handleApiError } from '@/utils/apiErrorHandler';

export const fetchProducts = createAsyncThunk('products/fetchAll', (filters = {}, { rejectWithValue }) => {
    const { price, ...apiFilters } = filters;
    const cleanFilters = Object.fromEntries(Object.entries(apiFilters).filter(([_, v]) => v !== ''));
    const queryString = new URLSearchParams(cleanFilters).toString();
    const url = queryString ? `/products?${queryString}` : '/products';

    return api.url(url).get().json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur chargement produits')));
});

export const fetchProductById = createAsyncThunk('products/fetchOne', (id, { rejectWithValue }) =>
    api.url(`/products/${id}`).get().json().catch((err) => rejectWithValue(handleApiError(err, 'Produit introuvable')))
);

export const fetchMyProducts = createAsyncThunk('products/fetchMine', (sellerId, { rejectWithValue }) =>
    api.url(`/products?sellerId=${sellerId}`).get().json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur chargement mes produits')))
);

export const createProduct = createAsyncThunk('products/create', (data, { rejectWithValue }) =>
    api.url('/products').post(data).json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur création produit')))
);

export const updateProduct = createAsyncThunk('products/update', ({ id, data }, { rejectWithValue }) =>
    api.url(`/products/${id}`).patch(data).json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur modification produit')))
);

export const deleteProduct = createAsyncThunk('products/delete', (id, { rejectWithValue }) =>
    api.url(`/products/${id}`).delete().res().then(() => id).catch((err) => rejectWithValue(handleApiError(err, 'Erreur suppression produit')))
);

export const toggleFavorite = createAsyncThunk('products/toggleFavorite', (id, { rejectWithValue }) =>
    api.url(`/products/${id}/favorite`).post().json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur lors de la mise en favori')))
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
        clearProductError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const data = action.payload?.data || action.payload?.items || action.payload;
                state.items = Array.isArray(data) ? data : [];
                state.meta = action.payload?.meta || state.meta;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.current = action.payload?.data || action.payload;
            })
            .addCase(fetchMyProducts.fulfilled, (state, action) => {
                const data = action.payload?.data || action.payload?.items || action.payload;
                state.myItems = Array.isArray(data) ? data : [];
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.myItems.unshift(action.payload?.data || action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload?.data || action.payload;
                const index = state.myItems.findIndex(p => p.id === updatedProduct.id);
                if (index !== -1) state.myItems[index] = updatedProduct;
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

export const { setFilters, setPage, resetFilters, clearProductError } = productSlice.actions;
export default productSlice.reducer;