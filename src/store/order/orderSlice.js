import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderDto, { rejectWithValue }) => {
    try {
      return await api.url('/orders').post(orderDto).json();
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la création de la commande');
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await api.url('/orders').get().json();
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la récupération des commandes');
    }
  }
);

export const fetchMySales = createAsyncThunk(
  'orders/fetchMySales',
  async (_, { rejectWithValue }) => {
    try {
      return await api.url('/orders/selling').get().json();
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la récupération des ventes');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      return await api.url(`/orders/${id}`).get().json();
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la récupération de la commande');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (id, { rejectWithValue }) => {
    try {
      return await api.url(`/orders/${id}/cancel`).patch().json();
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de l\'annulation de la commande');
    }
  }
);

const initialState = {
  current: null,
  myOrders: [],
  mySales: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchMyOrders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchMySales
      .addCase(fetchMySales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMySales.fulfilled, (state, action) => {
        state.loading = false;
        state.mySales = action.payload;
      })
      .addCase(fetchMySales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchOrderById
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // cancelOrder
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;