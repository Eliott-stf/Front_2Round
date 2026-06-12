import React from 'react';

export default function SwipeCardSkeleton() {
    // Pas de logique, uniquement de l'affichage statique

    return (
        <div className="absolute w-full h-full px-4">
            <div className="relative w-full h-full bg-[#111111] rounded-2xl border border-[#2f2f2f] overflow-hidden shadow-2xl flex flex-col pointer-events-none select-none">
                {/* Image Placeholder */}
                <div className="relative w-full h-[70%] bg-[#1a1a1a]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>

                {/* Informations de l'article Placeholder */}
                <div className="flex flex-col p-6 h-[30%] justify-between bg-[#111111]">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            {/* Titre */}
                            <div className="h-8 w-2/3 max-w-[200px] bg-[#222222] rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                            </div>
                            {/* Prix */}
                            <div className="h-8 w-1/4 max-w-[80px] bg-[#222222] rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                            </div>
                        </div>
                        {/* Description multi-lignes */}
                        <div className="h-4 w-full mt-4 bg-[#222222] rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        <div className="h-4 w-5/6 mt-2 bg-[#222222] rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>
                    
                    {/* Badges (Taille, Etat) */}
                    <div className="flex gap-2 mt-4">
                        <div className="h-6 w-20 bg-[#222222] rounded-full border border-[#333] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        <div className="h-6 w-24 bg-[#222222] rounded-full border border-[#333] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
