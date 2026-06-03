import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '@store/message/messageSlice';

export default function ChatInput({ activeId }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');

    const handleSend = () => {
        if (!content.trim()) return;
        dispatch(sendMessage({ conversationId: activeId, content }));
        setContent('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="p-6 shrink-0 bg-black">
            <div className="w-full bg-[#f4f4f4] flex items-center pr-4">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Écrivez votre message."
                    className="flex-1 bg-transparent text-[#737373] font-inter text-sm p-4 outline-none placeholder:text-[#a0a0a0]"
                />
                <button
                    onClick={handleSend}
                    className="shrink-0 flex items-center justify-center transition-opacity hover:opacity-75"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    );
}