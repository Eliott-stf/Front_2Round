import { API_ROOT } from '@constants/apiConstant';
import React from 'react';
import { AlertTriangle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function ChatHeader({ conversation, interlocutor, isBuyer, onOpenOfferModal, onOpenReportModal, onBack }) {
    // On déclare nos constantes de confort
    const product = conversation.product;
    const interlocutorName = interlocutor ? `${interlocutor.name || ''} ${interlocutor.lastname || ''}`.trim() : 'Utilisateur';

    const mediaPath = product?.medias?.[0]?.path;
    const productImage = mediaPath ? `${API_ROOT}${mediaPath}` : null;

    return (
        <header className="flex items-center p-3 md:p-5 border-b border-gray-dark shrink-0 bg-[#000000] z-10">
            {/* Bouton retour visible uniquement sur mobile et tablette */}
            <button
                onClick={onBack}
                className="lg:hidden mr-3 p-1.5 text-white hover:bg-[#1a1a1a] rounded-full transition-colors cursor-pointer shrink-0"
                title="Retour"
            >
                <ChevronLeft size={24} />
            </button>

            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-gray-dark mr-3 md:mr-5 overflow-hidden">
                {productImage ? (
                    <img src={productImage} alt={product?.title || 'Produit'} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#1a1a1a]" />
                )}
            </div>

            <div className="flex flex-col min-w-0">
                <h2 className="text-white font-bebas text-lg md:text-2xl tracking-wide uppercase truncate">
                    <Link to={`/profil/${interlocutor.id}`} className="hover:text-red transition-colors">
                        {interlocutorName}
                    </Link>
                </h2>
                <p className="text-gray font-inter text-xs md:text-sm mt-0.5 truncate">
                    {product?.title} {product?.condition ? `- ${product.condition}` : ''}
                </p>
                <p className="text-white font-bebas text-md md:text-xl mt-0.5 tracking-wide">
                    {product?.price} €
                </p>
            </div>

            <div className="ml-auto flex items-center gap-2 md:gap-4 shrink-0">
                {isBuyer && (
                    <button
                        onClick={onOpenOfferModal}
                        className="px-3 md:px-6 h-9 md:h-10 border border-[#333333] text-white font-inter text-[10px] md:text-xs font-semibold uppercase tracking-widest hover:border-white transition-colors rounded-xl shrink-0"
                    >
                        Offre
                    </button>
                )}
                <button
                    onClick={onOpenReportModal}
                    title="Signaler la conversation"
                    className="p-2 md:p-2.5 text-gray hover:text-red hover:bg-[#1a1a1a] transition-all rounded-xl border border-white/5 flex items-center justify-center cursor-pointer shrink-0"
                >
                    <AlertTriangle size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
            </div>
        </header>
    );
}