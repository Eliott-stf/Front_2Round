import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';
import { handleApiError } from '@/utils/apiErrorHandler';

//Méthode pour récup les donne de L'API - tous les attributs
export const fetchAttributes = createAsyncThunk('attributes/fetchAll', async (_, { rejectWithValue }) =>
    api.url('/attributes').get().json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur chargement attributs')))
);

//Méthode pour récup les donne de L'API - un attribut spécifique
export const fetchAttributeById = createAsyncThunk('attributes/fetchOne', async (id, { rejectWithValue }) =>
    api.url(`/attributes/${id}`).get().json().catch((err) => rejectWithValue(handleApiError(err, 'Attribut introuvable')))
);

//Méthode pour récup les donne de L'API - créer un attribut (Admin)
export const createAttribute = createAsyncThunk('attributes/create', async (data, { rejectWithValue }) =>
    api.url('/attributes').post(data).json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur création attribut')))
);

//Méthode pour récup les donne de L'API - modifier un attribut (Admin)
export const updateAttribute = createAsyncThunk('attributes/update', async ({ id, data }, { rejectWithValue }) =>
    api.url(`/attributes/${id}`).patch(data).json().catch((err) => rejectWithValue(handleApiError(err, 'Erreur modification attribut')))
);

//Méthode pour récup les donne de L'API - supprimer un attribut (Admin)
export const deleteAttribute = createAsyncThunk('attributes/delete', async (id, { rejectWithValue }) =>
    api.url(`/attributes/${id}`).delete().res().then(() => id).catch((err) => rejectWithValue(handleApiError(err, 'Erreur suppression attribut')))
);

const attributeSlice = createSlice({
    name: 'attributes',
    initialState: {
        items: [],
        current: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearAttributeError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttributes.fulfilled, (state, action) => {
                state.items = action.payload?.data || action.payload || [];
            })
            .addCase(fetchAttributeById.fulfilled, (state, action) => {
                state.current = action.payload?.data || action.payload;
            })
            .addCase(createAttribute.fulfilled, (state, action) => {
                const newAttr = action.payload?.data || action.payload;
                state.items.push(newAttr);
            })
            .addCase(updateAttribute.fulfilled, (state, action) => {
                const updatedAttr = action.payload?.data || action.payload;
                const index = state.items.findIndex(a => a.id === updatedAttr.id);
                if (index !== -1) {
                    state.items[index] = updatedAttr;
                }
                if (state.current?.id === updatedAttr.id) {
                    state.current = updatedAttr;
                }
            })
            .addCase(deleteAttribute.fulfilled, (state, action) => {
                state.items = state.items.filter(a => a.id !== action.payload);
                if (state.current?.id === action.payload) {
                    state.current = null;
                }
            })
            .addMatcher(
                (action) => action.type.startsWith('attributes/') && action.type.endsWith('/pending'),
                (state) => { 
                    state.loading = true; 
                    state.error = null; 
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('attributes/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
                (state, action) => {
                    state.loading = false;
                    if (action.type.endsWith('/rejected')) {
                        state.error = action.payload;
                    }
                }
            );
    },
});

export const { clearAttributeError } = attributeSlice.actions;
export default attributeSlice.reducer;
