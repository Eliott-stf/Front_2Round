import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { useAuthContext } from './AuthContext';
import { API_ROOT } from '@constants/apiConstant';
import { receiveMessage } from '@store/message/messageSlice';
import { 
    fetchConversations,
    appendMessageToConversation, 
    appendOfferToConversation, 
    updateOfferStatusInConversation 
} from '@store/conversation/conversationSlice';

const SocketContext = createContext(null);

export function SocketContextProvider({ children }) {
    const dispatch = useDispatch();
    const { userId } = useAuthContext();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!userId) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            return;
        }

        // Fetch conversations once upon login to update read/unread states
        dispatch(fetchConversations());

        const token = localStorage.getItem('token');
        const newSocket = io(API_ROOT, {
            auth: { token },
            transports: ['websocket'],
        });

        newSocket.on('connect', () => {
            console.log('WebSocket connected:', newSocket.id);
        });

        newSocket.on('message', (payload) => {
            // payload = { conversationId, message }
            dispatch(receiveMessage(payload));
            dispatch(appendMessageToConversation(payload));
        });

        newSocket.on('offer', (payload) => {
            // payload = { conversationId, offer }
            dispatch(appendOfferToConversation(payload));
        });

        newSocket.on('offer_status_updated', (payload) => {
            // payload = { conversationId, offerId, status }
            dispatch(updateOfferStatusInConversation(payload));
        });

        newSocket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [userId, dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);
