import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

// Méthode pour récup les donne de L'API (types de signalements)
export const fetchTypeReports = createAsyncThunk('reports/fetchTypes', async (_, { rejectWithValue }) =>
    api.url('/type-reports').get().json().catch(() => rejectWithValue('Erreur lors du chargement des motifs de signalement'))
);

// Méthode pour créer un signalement via L'API
export const createReport = createAsyncThunk('reports/create', async (data, { rejectWithValue }) =>
    api.url('/reports').post(data).json().catch(() => rejectWithValue('Erreur lors de la création du signalement'))
);

const reportSlice = createSlice({
    name: 'reports',
    //on déclare nos state
    initialState: {
        typeReports: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypeReports.fulfilled, (state, action) => {
                state.typeReports = action.payload || [];
            })
            .addCase(createReport.fulfilled, (state) => {
                // Aucun traitement spécifique après création
            })
            .addMatcher(
                (action) => action.type.startsWith('reports/') && action.type.endsWith('/pending'),
                (state) => {
                    //loading et erreur
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('reports/') && (action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled')),
                (state, action) => {
                    //loading et erreur
                    state.loading = false;
                    if (action.type.endsWith('/rejected')) {
                        state.error = action.payload;
                    }
                }
            );
    },
});

export default reportSlice.reducer;
