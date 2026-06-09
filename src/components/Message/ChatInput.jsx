import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Send } from 'lucide-react';
import { sendMessage } from '@store/message/messageSlice';

export default function ChatInput({ activeId }) {
    // On récupère les hooks
    const dispatch = useDispatch();

    // On déclare nos states locaux
    const [text, setText] = useState("");

    // Méthode de soumission
    const handleSubmit = (e) => {
        //le fameux eheh
        e.preventDefault();
        if (!text.trim()) return;

        //méthode du slice
        dispatch(sendMessage({
            conversationId: activeId,
            content: text.trim()
        }));

        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4 border-t border-gray-dark bg-[#000000] shrink-0">
            {/* Text input */}
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Écrire un message..."
                className="flex-1 bg-gray-dark text-white text-sm px-4 py-2.5 rounded-xl border border-gray-mid/50 placeholder:text-gray focus:outline-none focus:border-red/40 transition-colors font-body"
            />

            {/* Send */}
            <button
                type="submit"
                disabled={!text.trim()}
                className="shrink-0 w-10 h-10 rounded-xl bg-red flex items-center justify-center text-white hover:bg-red/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <Send className="w-4 h-4" />
            </button>
        </form>
    );
}