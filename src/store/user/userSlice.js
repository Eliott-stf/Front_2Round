import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { apiUpload } from '@lib/api';

export const fetchMe = createAsyncThunk('user/fetchMe', (_, { rejectWithValue }) =>
    api.url('/users/me').get().json().catch(() => rejectWithValue('Erreur chargement profil'))
);

export const fetchUserById = createAsyncThunk('user/fetchById', (id, { rejectWithValue }) =>
    api.url(`/users/${id}`).get().json().catch(() => rejectWithValue('Erreur chargement utilisateur'))
);

export const fetchMyFavorites = createAsyncThunk('user/fetchMyFavorites', (_, { rejectWithValue }) =>
    api.url('/users/me/favorites').get().json().catch(() => rejectWithValue('Erreur chargement favoris'))
);

export const updateMe = createAsyncThunk('user/updateMe', (data, { rejectWithValue }) =>
    api.url('/users/me').patch(data).json().catch(() => rejectWithValue('Erreur mise à jour profil'))
);

export const uploadAvatar = createAsyncThunk('user/uploadAvatar', async (file, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('avatar', file);

        return await apiUpload.url('/users/me/avatar').patch(formData).json();
    } catch (error) {
        return rejectWithValue('Erreur upload avatar');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        me: null,
        myFavorites: [],
        currentProfile: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.me = action.payload?.data || action.payload;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.currentProfile = action.payload?.data || action.payload;
            })
            .addCase(fetchMyFavorites.fulfilled, (state, action) => {
                // CORRECTION ICI : On gère le cas où l'API renvoie { data: [...] }
                const favoritesData = action.payload?.data || action.payload;
                state.myFavorites = Array.isArray(favoritesData) ? favoritesData : [];
            })
            .addCase(updateMe.fulfilled, (state, action) => {
                state.me = action.payload?.data || action.payload;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.me = action.payload?.data || action.payload;
            })
            .addMatcher(
                (action) => action.type.startsWith('user/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('user/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
                (state, action) => {
                    state.loading = false;
                    if (action.type.endsWith('/rejected')) state.error = action.payload;
                }
            );
    },
});

export default userSlice.reducer;