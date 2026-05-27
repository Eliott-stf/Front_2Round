import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { apiUpload } from '@lib/api';

export const fetchMe = createAsyncThunk('user/fetchMe', (_, { rejectWithValue }) =>
    api.url('/users/me').get().json().catch(() => rejectWithValue('Erreur chargement profil'))
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
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.fulfilled, (state, action) => { state.me = action.payload; })
            .addCase(updateMe.fulfilled, (state, action) => { state.me = action.payload; })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.me = action.payload;
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