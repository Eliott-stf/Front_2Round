import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import MessageNode from './MessageNode';
import { useAuthContext } from '@contexts/AuthContext';

export default function MessageList({ activeId, initialMessages = [] }) {
    const { items } = useSelector((state) => state.messages);
    const { userId } = useAuthContext();

    const storeMessages = items[activeId] || [];

    // Fusion des tableaux et élimination des doublons via Map
    const mergedMessages = useMemo(() => {
        const combined = [...initialMessages, ...storeMessages];
        return Array.from(new Map(combined.map(msg => [msg.id, msg])).values());
    }, [initialMessages, storeMessages]);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mergedMessages]);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
            {mergedMessages.map((msg) => (
                <MessageNode
                    key={msg.id}
                    isSelf={msg.senderId === userId}
                    type={msg.type || 'text'}
                    data={{
                        text: msg.content,
                        title: msg.title,
                        oldPrice: msg.oldPrice,
                        newPrice: msg.newPrice
                    }}
                />
            ))}
            <div ref={bottomRef} />
        </div>
    );
}