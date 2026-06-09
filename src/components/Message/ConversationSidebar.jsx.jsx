import React from 'react';
import { useSelector } from 'react-redux';
import ConversationItem from './ConversationItem';
import { useAuthContext } from '@contexts/AuthContext';
import { API_ROOT } from '@constants/apiConstant';
import { formatDateLocaleFR } from '@/utils/formateDate';

export default function ConversationSidebar({ activeId, setActiveId }) {
    const { items: conversations, loading } = useSelector((state) => state.conversations);
    const { userId } = useAuthContext();

    if (loading && (!conversations || conversations.length === 0)) {
        return (
            <aside className="w-full h-full border-r border-[#2f2f2f] bg-[#000000] p-5 text-[#737373] font-inter">
                Chargement...
            </aside>
        );
    }

    return (
        <aside className="w-full h-full border-r border-[#2f2f2f] flex flex-col bg-[#000000] overflow-y-auto custom-scrollbar">
            {conversations && conversations.map((conv) => {
                if (!conv) return null;

                //On déclare nos const de confort et flag
                const isBuyer = conv.buyerId === userId;
                const interlocutor = isBuyer ? conv.product?.seller : conv.buyer;
                const interlocutorName = interlocutor ? `${interlocutor.name || ''} ${interlocutor.lastname || ''}`.trim() : 'Utilisateur';
                const rawAvatar = interlocutor?.avatarUrl;
                const finalAvatar = rawAvatar ? `${API_ROOT}${rawAvatar}` : '/images/pp/pp.png';

                const hasUnread = Array.isArray(conv.messages) && conv.messages.some(
                    (msg) => msg && !msg.isRead && msg.senderId !== userId
                );

                return (
                    <ConversationItem
                        key={conv.id}
                        data={{
                            name: interlocutorName,
                            product: conv.product?.title || 'Produit indisponible',
                            time: conv.updatedAt ? formatDateLocaleFR(conv.updatedAt) : '',
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