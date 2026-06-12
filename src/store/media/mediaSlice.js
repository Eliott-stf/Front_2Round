import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';
import { API_ROOT } from '@constants/apiConstant';

export const uploadProductImages = createAsyncThunk('media/upload', async ({ productId, files }, { getState, rejectWithValue }) => {
    try {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        // Extraction manuelle du token 
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_ROOT}/media/products/${productId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
              
            },
            body: formData
        });

        if (!response.ok) throw new Error('Upload failed');
        return await response.json();
    } catch (error) {
        return rejectWithValue('Erreur lors de l\'envoi des images');
    }
});

export const deleteProductImage = createAsyncThunk('media/delete', async (mediaId, { rejectWithValue }) => {
    return api.url(`/media/${mediaId}`).delete().res().then(() => mediaId).catch(() => rejectWithValue('Erreur lors de la suppression'));
});

const mediaSlice = createSlice({
    name: 'media',
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.startsWith('media/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('media/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
                (state, action) => {
                    state.loading = false;
                    if (action.type.endsWith('/rejected')) state.error = action.payload;
                }
            );
    },
});

export default mediaSlice.reducer;