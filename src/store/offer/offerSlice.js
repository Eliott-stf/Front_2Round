import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';

/**
 * Création d'une nouvelle offre
 */
export const createOffer = createAsyncThunk(
  'offers/create',
  async (offerData, { rejectWithValue }) => {
    try {
      return await api.url('/offers').post(offerData).json();
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la création de l'offre");
    }
  }
);

/**
 * Récupération des offres reçues (Vendeur)
 */
export const fetchReceivedOffers = createAsyncThunk(
  'offers/fetchReceived',
  async (_, { rejectWithValue }) => {
    try {
      return await api.url('/offers/received').get().json();
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la récupération des offres reçues');
    }
  }
);

/**
 * Récupération des offres envoyées (Acheteur)
 */
export const fetchSentOffers = createAsyncThunk(
  'offers/fetchSent',
  async (_, { rejectWithValue }) => {
    try {
      return await api.url('/offers/sent').get().json();
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la récupération des offres envoyées');
    }
  }
);

/**
 * Acceptation d'une offre (Vendeur)
 */
export const acceptOffer = createAsyncThunk(
  'offers/accept',
  async (offerId, { rejectWithValue }) => {
    try {
      return await api.url(`/offers/${offerId}/accept`).patch().json();
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de l'acceptation de l'offre");
    }
  }
);

/**
 * Refus d'une offre (Vendeur)
 */
export const rejectOffer = createAsyncThunk(
  'offers/reject',
  async (offerId, { rejectWithValue }) => {
    try {
      return await api.url(`/offers/${offerId}/reject`).patch().json();
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors du refus de l'offre");
    }
  }
);

// On déclare l'état initial
const initialState = {
  received: [],
  sent: [],
  loading: false,
  error: null,
};

// Création du slice
const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    clearOfferErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Remplissage des offres reçues
      .addCase(fetchReceivedOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.received = action.payload;
      })
      // Remplissage des offres envoyées
      .addCase(fetchSentOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.sent = action.payload;
      })
      // Ajout d'une offre envoyée
      .addCase(createOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.sent.unshift(action.payload);
      })
      // Mise à jour de l'état suite à une acceptation
      .addCase(acceptOffer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOffer = action.payload;
        const indexReceived = state.received.findIndex(o => o.id === updatedOffer.id);
        if (indexReceived !== -1) {
          state.received[indexReceived] = updatedOffer;
        }
      })
      // Mise à jour de l'état suite à un refus
      .addCase(rejectOffer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOffer = action.payload;
        const indexReceived = state.received.findIndex(o => o.id === updatedOffer.id);
        if (indexReceived !== -1) {
          state.received[indexReceived] = updatedOffer;
        }
      })
      // Factorisation du chargement
      .addMatcher(
        (action) => action.type.startsWith('offers/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Factorisation des erreurs
      .addMatcher(
        (action) => action.type.startsWith('offers/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearOfferErrors } = offerSlice.actions;

export default offerSlice.reducer;