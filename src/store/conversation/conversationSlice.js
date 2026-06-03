import api from '@lib/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConversations = createAsyncThunk(
    'conversations/fetchAll',
    async (_, thunkAPI) => {
        try {
            return await api.url('/conversations').get().json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Impossible de récupérer les conversations');
        }
    }
);

export const fetchConversationById = createAsyncThunk(
    'conversations/fetchById',
    async (id, thunkAPI) => {
        try {
            return await api.url(`/conversations/${id}`).get().json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Impossible de récupérer le détail de la conversation');
        }
    }
);

export const createConversation = createAsyncThunk(
    'conversations/create',
    async (conversationData, thunkAPI) => {
        try {
            return await api.url('/conversations').post(conversationData).json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Impossible d\'initier la conversation');
        }
    }
);

const conversationSlice = createSlice({
    name: 'conversations',
    initialState: {
        items: [],
        currentConversation: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrentConversation: (state) => {
            state.currentConversation = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchConversationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversationById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentConversation = action.payload;
            })
            .addCase(fetchConversationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.currentConversation = action.payload;

                const exists = state.items.some((conv) => conv.id === action.payload.id);
                if (!exists) {
                    state.items.unshift(action.payload);
                }
            })
            .addCase(createConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // SYNCHRONISATION INTER-SLICE : Met à jour la liste locale lors d'une lecture
            .addCase('messages/markAsRead/fulfilled', (state, action) => {
                const conversationId = action.payload;

                // Mise à jour dans la liste des conversations (Sidebar)
                const conversation = state.items.find(conv => conv.id === conversationId);
                if (conversation && conversation.messages) {
                    conversation.messages.forEach(msg => {
                        msg.isRead = true;
                    });
                }

                // Mise à jour dans la conversation courante si active
                if (state.currentConversation && state.currentConversation.id === conversationId) {
                    if (state.currentConversation.messages) {
                        state.currentConversation.messages.forEach(msg => {
                            msg.isRead = true;
                        });
                    }
                }
            });
    },
});

export const { clearCurrentConversation } = conversationSlice.actions;
export default conversationSlice.reducer;