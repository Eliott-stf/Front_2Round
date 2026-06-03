import React from 'react';

export default function ConversationItem({ data, isActive, hasUnread, onClick }) {
    if (!data) return null;

    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 p-5 border-b border-[#2f2f2f] cursor-pointer transition-colors ${isActive ? 'bg-[#111111]' : 'hover:bg-[#111111]/50'
                }`}
        >
            <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#2f2f2f]">
                    <img src={data.avatar || '/images/default-avatar.png'} alt={data.name || 'Avatar'} className="w-full h-full object-cover" />
                </div>
                {hasUnread && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red rounded-full border-2 border-black z-10" />
                )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-white font-bebas text-xl tracking-wide truncate">
                        {data.name || 'Utilisateur'}
                    </span>
                    <span className="text-[#737373] text-xs font-inter shrink-0 ml-2">
                        {data.time}
                    </span>
                </div>
                <span className={`text-sm font-inter truncate transition-colors ${hasUnread ? 'text-white font-medium' : 'text-[#737373]'}`}>
                    {data.product}
                </span>
            </div>
        </div>
    );
}