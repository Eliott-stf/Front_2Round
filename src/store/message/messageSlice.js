import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@lib/api';
import { handleApiError } from '@/utils/apiErrorHandler';

export const sendMessage = createAsyncThunk(
  'messages/send',
  async ({ conversationId, content }, { rejectWithValue }) => {
    try {
      const response = await api.url(`/conversations/${conversationId}/messages`).post({ content }).json();
      return { conversationId, message: response };
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Erreur lors de l'envoi du message"));
    }
  }
);

export const markMessagesAsRead = createAsyncThunk(
  'messages/markAsRead',
  async (conversationId, { rejectWithValue }) => {
    try {
      await api.url(`/conversations/${conversationId}/messages/read`).post().res();
      return conversationId;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Erreur lors du marquage des messages'));
    }
  }
);

// État initial
const initialState = {
  items: {}, 
  loading: false,
  error: null,
};

// Slice
const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // Action synchrone pour la réception via WebSocket
    receiveMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.items[conversationId]) {
        state.items[conversationId] = [];
      }
      state.items[conversationId].push(message);
    },
    // Remettre à zéro les messages d'une conversation spécifique si nécessaire
    clearConversationMessages: (state, action) => {
      const conversationId = action.payload;
      delete state.items[conversationId];
    },
    clearMessageError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // send
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const { conversationId, message } = action.payload;
        if (!state.items[conversationId]) {
          state.items[conversationId] = [];
        }
        state.items[conversationId].push(message);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // markAsRead
      .addCase(markMessagesAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const conversationId = action.payload;
        if (state.items[conversationId]) {
          // Met à jour localement le statut des messages
          state.items[conversationId] = state.items[conversationId].map((msg) => ({
            ...msg,
            isRead: true,
          }));
        }
      })
      .addCase(markMessagesAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { receiveMessage, clearConversationMessages, clearMessageError } = messageSlice.actions;

export default messageSlice.reducer;