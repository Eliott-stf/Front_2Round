import React from 'react';
import { useSelector } from 'react-redux';
import ConversationItem from './ConversationItem';
import { useAuthContext } from '@contexts/AuthContext';

const BACKEND_URL = 'http://localhost:3000';

export default function ConversationSidebar({ activeId, setActiveId }) {
    const { items: conversations, loading } = useSelector((state) => state.conversations);
    const { userId } = useAuthContext();

    if (loading && (!conversations || conversations.length === 0)) {
        return (
            <aside className="w-[300px] md:w-[350px] shrink-0 border-r border-[#2f2f2f] bg-black p-5 text-[#737373] font-inter">
                Chargement...
            </aside>
        );
    }

    return (
        <aside className="w-[300px] md:w-[350px] shrink-0 border-r border-[#2f2f2f] flex flex-col bg-black overflow-y-auto custom-scrollbar">
            {conversations && conversations.map((conv) => {
                if (!conv) return null;

                const isBuyer = conv.buyerId === userId;
                const interlocutor = isBuyer ? conv.product?.seller : conv.buyer;
                const interlocutorName = interlocutor ? `${interlocutor.name || ''} ${interlocutor.lastname || ''}`.trim() : 'Utilisateur';

                const hasUnread = Array.isArray(conv.messages) && conv.messages.some(
                    (msg) => msg && !msg.isRead && msg.senderId !== userId
                );

                // Ciblage de l'avatar de l'interlocuteur réel
                const rawAvatar = interlocutor?.avatarUrl;
                const finalAvatar = rawAvatar ? `${BACKEND_URL}${rawAvatar}` : '/images/default-avatar.png';

                return (
                    <ConversationItem
                        key={conv.id}
                        data={{
                            name: interlocutorName,
                            product: conv.product?.title || 'Produit indisponible',
                            time: conv.updatedAt ? new Date(conv.updatedAt).toLocaleDateString() : '',
                            avatar: finalAvatar
                        }}
                        isActive={activeId === conv.id}
                        hasUnread={hasUnread}
                        onClick={() => setActiveId(conv.id)}
                    />
                );
            })}
        </aside>
    );
}