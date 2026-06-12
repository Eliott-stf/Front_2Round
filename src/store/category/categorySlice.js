import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, { rejectWithValue }) =>
    api.url('/categories').get().json().catch(() => rejectWithValue('Erreur chargement catégories'))
);

export const fetchCategoryById = createAsyncThunk('categories/fetchOne', async (id, { rejectWithValue }) =>
    api.url(`/categories/${id}`).get().json().catch(() => rejectWithValue('Catégorie introuvable'))
);

export const createCategory = createAsyncThunk('categories/create', async (data, { rejectWithValue }) =>
    api.url('/categories').post(data).json().catch(() => rejectWithValue('Erreur création catégorie'))
);

export const updateCategory = createAsyncThunk('categories/update', async ({ id, data }, { rejectWithValue }) =>
    api.url(`/categories/${id}`).patch(data).json().catch(() => rejectWithValue('Erreur modification catégorie'))
);

export const deleteCategory = createAsyncThunk('categories/delete', async (id, { rejectWithValue }) =>
    api.url(`/categories/${id}`).delete().res().then(() => id).catch(() => rejectWithValue('Erreur suppression catégorie'))
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        current: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.items = action.payload?.data || action.payload || [];
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.current = action.payload?.data || action.payload;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                const newCat = action.payload?.data || action.payload;
                if (!newCat.parentId) {
                    state.items.push(newCat);
                } else {
                    const parent = state.items.find(c => c.id === newCat.parentId);
                    if (parent) {
                        if (!parent.children) parent.children = [];
                        parent.children.push(newCat);
                    }
                }
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const updatedCategory = action.payload?.data || action.payload;
                const index = state.items.findIndex(c => c.id === updatedCategory.id);
                if (index !== -1) {
                    state.items[index] = updatedCategory;
                }
                if (state.current?.id === updatedCategory.id) {
                    state.current = updatedCategory;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(c => c.id !== action.payload);
                if (state.current?.id === action.payload) {
                    state.current = null;
                }
            })
            .addMatcher(
                (action) => action.type.startsWith('categories/') && action.type.endsWith('/pending'),
                (state) => { 
                    state.loading = true; 
                    state.error = null; 
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('categories/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
                (state, action) => {
                    state.loading = false;
                    if (action.type.endsWith('/rejected')) {
                        state.error = action.payload;
                    }
                }
            );
    },
});

export default categorySlice.reducer;