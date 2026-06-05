// src/components/Admin/Report/TargetElementCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ExternalLink } from 'lucide-react';
import { API_ROOT } from '@constants/apiConstant';

export default function TargetElementCard({ 
    isProductReport, 
    targetProduct, 
    targetConversation, 
    onInspect,
    onToggleArchive
}) {
    //on déclere nos const
    // Si c'est un signalement de produit
    if (isProductReport) {
        //Vérif si le produit existe
        if (!targetProduct) {
            return (
                <div className="p-4 bg-red/10 border border-red/20 rounded-xl text-red font-inter text-sm text-center">
                    Le produit signalé a été supprimé de la base de données.
                </div>
            );
        }

        const productImg = targetProduct.medias && targetProduct.medias.length > 0
            ? (targetProduct.medias[0].path.startsWith('http') ? targetProduct.medias[0].path : `${API_ROOT}${targetProduct.medias[0].path}`)
            : null;

        const sellerName = targetProduct.seller 
            ? `${targetProduct.seller.name} ${targetProduct.seller.lastname}` 
            : 'Inconnu';

        return (
            <div className="flex flex-col sm:flex-row gap-5 bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 items-center justify-between font-inter">
                <div className="flex items-center gap-5 w-full sm:w-auto min-w-0">
                    <div className="w-18 h-18 bg-black/40 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-white/5">
                        {productImg ? (
                            <img
                                src={productImg}
                                alt={targetProduct.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xs text-[#555555]">IMAGE</span>
                        )}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h4 className="text-white font-bold text-base truncate">{targetProduct.title}</h4>
                        <span className="text-red font-bebas text-lg mt-1">{targetProduct.price} €</span>
                        <span className="text-white/40 text-[11px] mt-1 truncate">
                            Vendeur : {sellerName}
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-0 shrink-0">
                    {/* Badge Disponibilité */}
                    <span className={`px-2.5 h-8 text-[11px] font-inter font-medium rounded-lg flex items-center gap-1.5 shrink-0 ${
                        targetProduct.status === 'AVAILABLE' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-white/5 text-white/40 border border-white/5'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                            targetProduct.status === 'AVAILABLE' ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'
                        }`} />
                        {targetProduct.status === 'AVAILABLE' ? 'Disponible' : 'Archivé'}
                    </span>

                    {/* Archiver / Restaurer */}
                    {onToggleArchive && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleArchive(targetProduct.id);
                            }}
                            className={`h-8 px-3.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors duration-200 shrink-0 cursor-pointer ${
                                targetProduct.status === 'AVAILABLE'
                                    ? 'border border-red/20 text-red hover:bg-red/5'
                                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                            }`}
                        >
                            {targetProduct.status === 'AVAILABLE' ? 'Archiver' : 'Restaurer'}
                        </button>
                    )}

                    {/* Inspecter l'article (Modale Admin) */}
                    <button
                        onClick={onInspect}
                        className="h-8 px-3.5 bg-white text-black hover:bg-[#e5e5e5] text-[11px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors duration-200 shrink-0 cursor-pointer"
                    >
                        Inspecter l'article
                    </button>

                    {/* Fiche article (Lien public) */}
                    <Link
                        to={`/product/${targetProduct.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-3.5 bg-transparent border border-white/10 text-white/80 hover:text-white hover:border-white text-[11px] font-semibold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors duration-200 shrink-0 cursor-pointer"
                    >
                        Fiche article <ExternalLink size={11} />
                    </Link>
                </div>
            </div>
        );
    }

    // Sinon c'est un signalement de conversation
    //Vérif si la conversation existe
    if (!targetConversation) {
        return (
            <div className="p-4 bg-red/10 border border-red/20 rounded-xl text-red font-inter text-sm text-center">
                La conversation associée a été supprimée ou est introuvable.
            </div>
        );
    }

    const buyerName = targetConversation.buyer 
        ? `${targetConversation.buyer.name} ${targetConversation.buyer.lastname}` 
        : 'Inconnu';

    const conversationSellerName = targetConversation.product?.seller 
        ? `${targetConversation.product.seller.name} ${targetConversation.product.seller.lastname}` 
        : 'Inconnu';

    return (
        <div className="flex flex-col gap-4 font-inter text-sm">
            <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                    <div>
                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Acheteur</span>
                        <span className="text-white font-semibold">
                            {buyerName}
                        </span>
                    </div>
                    <div>
                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Vendeur</span>
                        <span className="text-white font-semibold">
                            {conversationSellerName}
                        </span>
                    </div>
                </div>

                {targetConversation.product ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Tag size={16} className="text-gray-light shrink-0" />
                            <div className="flex flex-col min-w-0">
                                <span className="text-white font-medium text-sm truncate">{targetConversation.product.title}</span>
                                <span className="text-white/50 text-xs mt-0.5 flex flex-wrap items-center gap-1.5">
                                    {targetConversation.product.price} € • Taille {targetConversation.product.size || 'N/A'} • 
                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                                        targetConversation.product.status === 'AVAILABLE' ? 'text-emerald-400' : 'text-[#555555]'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            targetConversation.product.status === 'AVAILABLE' ? 'bg-emerald-400' : 'bg-white/20'
                                        }`} />
                                        {targetConversation.product.status === 'AVAILABLE' ? 'Disponible' : 'Archivé'}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            {/* Archiver / Restaurer */}
                            {onToggleArchive && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleArchive(targetConversation.product.id);
                                    }}
                                    className={`h-8 px-3.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors duration-200 shrink-0 cursor-pointer ${
                                        targetConversation.product.status === 'AVAILABLE'
                                            ? 'border border-red/20 text-red hover:bg-red/5'
                                            : 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    }`}
                                >
                                    {targetConversation.product.status === 'AVAILABLE' ? 'Archiver' : 'Restaurer'}
                                </button>
                            )}

                            <button
                                onClick={onInspect}
                                className="h-8 px-3.5 bg-white text-black hover:bg-[#e5e5e5] text-[11px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors duration-200 shrink-0 cursor-pointer"
                            >
                                Inspecter l'article
                            </button>
                            <Link
                                to={`/product/${targetConversation.product.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-8 px-3.5 bg-transparent border border-white/10 text-white/80 hover:text-white hover:border-white text-[11px] font-semibold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors duration-200 shrink-0 cursor-pointer"
                            >
                                Fiche article <ExternalLink size={11} />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <span className="text-white/40 text-xs">Produit concerné introuvable</span>
                )}
            </div>
        </div>
    );
}
