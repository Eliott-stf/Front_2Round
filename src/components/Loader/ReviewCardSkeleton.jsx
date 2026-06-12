import React from 'react';

// Composant représentant le squelette de chargement d'un avis (ReviewCard)
export default function ReviewCardSkeleton() {
    //on déclare nos const de confort
    // Pas de variables locales requises pour le layout statique

    return (
        <article className="flex gap-4 sm:gap-8 py-6 sm:py-8 border-b border-[#222222] last:border-b-0 w-full max-w-[1000px] pointer-events-none select-none">
            {/* Avatar Placeholder */}
            <div className="shrink-0">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#111111] relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </div>

            {/* Contenu principal de l'avis */}
            <div className="flex flex-col flex-1 justify-center pt-1 min-w-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-0">
                    <div className="flex flex-col min-w-0 w-full">
                        {/* Pseudo */}
                        <div className="h-5 sm:h-7 w-1/3 max-w-[150px] bg-[#111111] rounded-sm relative overflow-hidden border border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        {/* Produit acheté */}
                        <div className="h-3 sm:h-3.5 w-1/4 max-w-[100px] mt-2 sm:mt-1.5 bg-[#111111] rounded-sm relative overflow-hidden border border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>
                    {/* Date */}
                    <div className="h-3 sm:h-4 w-16 sm:w-20 bg-[#111111] rounded-sm shrink-0 relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                </div>

                {/* Commentaire de l'avis (bloc multi-lignes simulé) */}
                <div className="flex flex-col gap-2 mt-4 sm:mt-5">
                    <div className="h-4 sm:h-5 w-full bg-[#111111] rounded-sm relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                    <div className="h-4 sm:h-5 w-5/6 bg-[#111111] rounded-sm relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                </div>

                {/* Étoiles (rating) */}
                <div className="w-24 sm:w-32 h-4 sm:h-5 mt-4 sm:mt-5 bg-[#111111] rounded-sm relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </div>
        </article>
    );
}
