import React from 'react';

// Composant représentant le squelette de chargement d'une carte produit (Skeleton Loader)
export default function ProductCardSkeleton() {
    //on déclare nos const de confort
    // Pas de constantes locales requises pour ce squelette de présentation

    return (
        <article className="flex flex-col w-full max-w-[130px] md:max-w-[220px] flex-shrink-0 mx-auto pointer-events-none select-none">
            {/* Zone d'image du produit */}
            <div className="relative w-full aspect-square bg-[#111111] mb-2 md:mb-4 overflow-hidden rounded-sm border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
            </div>
            
            {/* Détails du produit */}
            <div className="flex flex-col w-full">
                {/* Titre */}
                <div className="relative h-4 md:h-6 w-3/4 bg-[#111111] mb-1.5 rounded-sm overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
                {/* Sous-titre (Taille, Condition) */}
                <div className="relative h-3 md:h-4 w-1/2 bg-[#111111] mb-2 rounded-sm overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
                {/* Prix */}
                <div className="relative h-4 md:h-6 w-1/3 bg-[#111111] rounded-sm overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </div>
        </article>
    );
}
