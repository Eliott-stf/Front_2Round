import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import MessageNode from './MessageNode';
import OfferNode from './OfferNode';
import { useAuthContext } from '@contexts/AuthContext';

export default function MessageList({ activeId, conversation, initialMessages = [], initialOffers = [], onPaymentRequest }) {
    // On récupère l'id du AuthContext
    const { userId } = useAuthContext();

    // On déclare nos states locaux et store
    const { items: storeMessagesMap } = useSelector((state) => state.messages);
    const storeMessages = storeMessagesMap[activeId] || [];

    const timeline = useMemo(() => {
        // Fusion des messages initiaux et de ceux stockés dans Redux
        const combinedMessages = [...initialMessages, ...storeMessages];

        // Suppression des doublons basés sur l'ID
        const uniqueMessages = Array.from(new Map(combinedMessages.map(msg => [msg.id, msg])).values())
            .map(msg => ({ ...msg, type: 'message' }));

        // Formatage des offres pour la timeline
        const formattedOffers = initialOffers.map(offer => ({ ...offer, type: 'offer' }));

        // Tri chronologique de l'ensemble
        return [...uniqueMessages, ...formattedOffers].sort((a, b) =>
            new Date(a.createdAt) - new Date(b.createdAt)
        );
    }, [initialMessages, storeMessages, initialOffers]);

    // Référence pour le scroll automatique
    const bottomRef = useRef(null);

    // UseEffect pour scroller vers le bas lors de chaque mise à jour de la timeline
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [timeline]);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
            {timeline.map((item) => {
                if (item.type === 'message') {
                    return (
                        <MessageNode
                            key={`msg-${item.id}`}
                            isSelf={item.senderId === userId}
                            data={{
                                text: item.content,
                                createdAt: item.createdAt
                            }}
                        />
                    );
                }

                if (item.type === 'offer') {
                    const isSelf = conversation.buyerId === userId;
                    return (
                        <OfferNode
                            key={`offer-${item.id}`}
                            offer={item}
                            isSelf={isSelf}
                            originalPrice={conversation.product?.price}
                            onPaymentRequest={() => onPaymentRequest(item.proposedPrice)}
                        />
                    );
                }

                return null;
            })}
            <div ref={bottomRef} />
        </div>
    );
}