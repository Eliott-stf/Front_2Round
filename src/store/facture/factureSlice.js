import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

// Thunk pour récupérer les métadonnées de la facture liée à une commande
export const fetchFactureByOrderId = createAsyncThunk(
    'facture/fetchFactureByOrderId',
    async (orderId, { rejectWithValue }) => {
        try {
            return await api.url(`/factures/${orderId}`).get().json();
        } catch (error) {
            return rejectWithValue(
                error.message || 'Erreur lors de la récupération de la facture'
            );
        }
    }
);

// Thunk pour télécharger et sauvegarder localement le PDF de la facture
export const downloadFacture = createAsyncThunk(
    'facture/downloadFacture',
    async ({ orderId, reference, type = 'INVOICE' }, { rejectWithValue }) => {
        try {
            // recup factures
            const factures = await api.url(`/factures/${orderId}`).get().json();
            
            // trouver la facture correspondante
            const facture = Array.isArray(factures) 
                ? factures.find(f => f.type === type) 
                : factures;

            if (!facture) {
                throw new Error("Facture introuvable");
            }

            // recup le blob binaire du fichier PDF
            const blob = await api.url(`/factures/${facture.id}/download`).get().blob();
            
            // simuler le clic de téléchargement
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            const prefix = type === 'REFUND' ? 'Annulation-' : 'Facture-';
            link.setAttribute('download', `${prefix}${reference}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
            
            return facture;
        } catch (error) {
            return rejectWithValue(
                error.message || 'Erreur lors du téléchargement de la facture'
            );
        }
    }
);

const initialState = {
    current: null,
    loading: false,
    downloading: false,
    error: null,
};

const factureSlice = createSlice({
    name: 'facture',
    initialState,
    reducers: {
        clearFactureState: (state) => {
            state.current = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchFactureByOrderId
            .addCase(fetchFactureByOrderId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFactureByOrderId.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(fetchFactureByOrderId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // downloadFacture
            .addCase(downloadFacture.pending, (state) => {
                state.downloading = true;
                state.error = null;
            })
            .addCase(downloadFacture.fulfilled, (state) => {
                state.downloading = false;
            })
            .addCase(downloadFacture.rejected, (state, action) => {
                state.downloading = false;
                state.error = action.payload;
            });
    },
});

export const { clearFactureState } = factureSlice.actions;
export default factureSlice.reducer;
