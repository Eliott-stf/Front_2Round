import React from 'react';

const BACKEND_URL = 'http://localhost:3000';

export default function ChatHeader({ conversation, interlocutor }) {
    const product = conversation.product;
    const interlocutorName = interlocutor ? `${interlocutor.name || ''} ${interlocutor.lastname || ''}`.trim() : 'Utilisateur';

    // Ciblage strict du média du produit
    const mediaPath = product?.medias?.[0]?.path;
    const productImage = mediaPath ? `${BACKEND_URL}${mediaPath}` : null;

    return (
        <header className="flex items-center p-5 border-b border-[#2f2f2f] shrink-0 bg-black z-10">
            <div className="w-16 h-16 shrink-0 bg-[#2f2f2f] mr-5 overflow-hidden">
                {productImage ? (
                    <img src={productImage} alt={product?.title || 'Produit'} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#1a1a1a]" />
                )}
            </div>

            <div className="flex flex-col">
                <h2 className="text-white font-bebas text-2xl tracking-wide uppercase">
                    {interlocutorName}
                </h2>
                <p className="text-[#737373] font-inter text-sm mt-1">
                    {product?.title} {product?.condition ? `- ${product.condition}` : ''}
                </p>
                <p className="text-white font-bebas text-xl mt-1 tracking-wide">
                    {product?.price} €
                </p>
            </div>
        </header>
    );
}