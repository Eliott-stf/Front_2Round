import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';
import { USER_INFOS } from '@constants/appConstant';

export const register = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
    try {
        await api.url('/auth/register').post(formData).json();
    } catch (error) {
        return rejectWithValue('Erreur lors de l\'inscription');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload; },
        setUser: (state, action) => { state.user = action.payload; },
        setToken: (state, action) => { state.token = action.payload; },
        setError: (state, action) => { state.error = action.payload; },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem(USER_INFOS);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setLoading, setUser, setToken, setError, logout } = authSlice.actions;

export const login = ({ email, password }) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const { access_token } = await api.url('/auth/login').post({ email, password }).json();
        localStorage.setItem('token', access_token);
        dispatch(setToken(access_token));

        const user = await api.url('/users/me').get().json();

        localStorage.setItem(USER_INFOS, JSON.stringify({
            userId: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            role: user.role,
        }));
        dispatch(setUser(user));

    } catch (error) {
        dispatch(setError('Identifiants incorrects'));
        console.error(`Erreur login : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

export default authSlice.reducer;