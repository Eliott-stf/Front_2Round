import { API_ROOT } from '@constants/apiConstant';
import React from 'react';


export default function ChatHeader({ conversation, interlocutor, isBuyer, onOpenOfferModal }) {
    // On déclare nos constantes de confort
    const product = conversation.product;
    const interlocutorName = interlocutor ? `${interlocutor.name || ''} ${interlocutor.lastname || ''}`.trim() : 'Utilisateur';

    const mediaPath = product?.medias?.[0]?.path;
    const productImage = mediaPath ? `${API_ROOT}${mediaPath}` : null;

    return (
        <header className="flex items-center p-5 border-b border-gray-dark shrink-0 bg-black z-10">
            <div className="w-16 h-16 shrink-0 bg-gray-dark mr-5 overflow-hidden">
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
                <p className="text-gray font-inter text-sm mt-1">
                    {product?.title} {product?.condition ? `- ${product.condition}` : ''}
                </p>
                <p className="text-white font-bebas text-xl mt-1 tracking-wide">
                    {product?.price} €
                </p>
            </div>

            {isBuyer && (
                <button
                    onClick={onOpenOfferModal}
                    className="ml-auto px-6 h-10 border border-[#333333] text-white font-inter text-xs font-semibold uppercase tracking-widest hover:border-white transition-colors shrink-0 rounded-xl"
                >
                    Faire une offre
                </button>
            )}
        </header>
    );
}