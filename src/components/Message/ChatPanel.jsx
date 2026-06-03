import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationById } from '@store/conversation/conversationSlice';
import { markMessagesAsRead } from '@store/message/messageSlice';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useAuthContext } from '@contexts/AuthContext';

export default function ChatPanel({ activeId }) {
    const dispatch = useDispatch();
    const { currentConversation, loading } = useSelector((state) => state.conversations);
    const { userId } = useAuthContext();

    useEffect(() => {
        if (activeId) {
            dispatch(fetchConversationById(activeId));
            dispatch(markMessagesAsRead(activeId));
        }
    }, [activeId, dispatch]);

    if (!activeId) {
        return (
            <div className="flex-1 bg-black flex items-center justify-center">
                <span className="text-[#737373] font-inter">Sélectionnez une conversation</span>
            </div>
        );
    }

    if (loading || !currentConversation || currentConversation.id !== activeId) {
        return (
            <div className="flex-1 bg-black flex items-center justify-center">
                <span className="text-[#737373] font-inter">Chargement de la discussion...</span>
            </div>
        );
    }

    const isBuyer = currentConversation.buyerId === userId;
    const interlocutor = isBuyer ? currentConversation.product?.seller : currentConversation.buyer;

    return (
        <section className="flex-1 flex flex-col bg-black relative min-w-0">
            <ChatHeader conversation={currentConversation} interlocutor={interlocutor} />
            <MessageList activeId={activeId} initialMessages={currentConversation.messages} />
            <ChatInput activeId={activeId} />
        </section>
    );
}