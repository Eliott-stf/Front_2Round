import React from 'react';

export default function MessageNode({ isSelf, type, data }) {
    const isOffer = type === 'offer';

    return (
        <div className={`flex w-full ${isSelf ? 'justify-end' : 'justify-start'} items-end gap-3`}>

            {!isSelf && (
                <div className="w-8 h-8 rounded-full bg-[#2f2f2f] shrink-0" />
            )}

            <div className="max-w-[70%]">
                {isOffer ? (
                    <div className="bg-[#1a1a1a] p-4 flex flex-col">
                        <span className="text-[#737373] text-sm font-inter mb-3">
                            {data.title || "Vous avez fait une offre."}
                        </span>
                        <div className="flex gap-2 items-baseline">
                            <span className="text-white font-bebas text-xl tracking-wide">{data.oldPrice}</span>
                            <span className="text-white font-bebas text-2xl tracking-wide ml-2">{data.newPrice}</span>
                        </div>
                    </div>
                ) : (
                    <div className={`p-4 font-inter text-sm ${isSelf ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'}`}>
                        {data.text}
                    </div>
                )}
            </div>

            {isSelf && (
                <div className="w-8 h-8 rounded-full bg-[#d9d9d9] shrink-0" />
            )}

        </div>
    );
}