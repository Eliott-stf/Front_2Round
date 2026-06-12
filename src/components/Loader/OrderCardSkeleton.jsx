import React from 'react';

export default function OrderCardSkeleton() {
    //on déclare nos const de confort
    // Pas de variables locales requises pour le layout statique

    return (
        <article className="flex w-full bg-[#111111] border border-[#2f2f2f] rounded-lg overflow-hidden pointer-events-none select-none">
            <div className="flex flex-col md:flex-row w-full items-stretch">
                {/* Conteneur Image Placeholder */}
                <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-[#1a1a1a] overflow-hidden isolate border-r border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>

                {/* Conteneur Informations */}
                <div className="flex flex-col md:flex-row flex-1 p-6 justify-between gap-6">
                    {/* Informations principales */}
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                        {/* Date et Référence */}
                        <div className="h-3 w-40 bg-[#222222] mb-2 rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        {/* Titre */}
                        <div className="h-6 w-3/4 max-w-[300px] bg-[#222222] mb-3 rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        {/* Badge de statut */}
                        <div className="h-6 w-24 mt-auto bg-[#222222] rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>

                    {/* Informations de tarification */}
                    <div className="flex flex-col justify-center md:items-end shrink-0">
                        <div className="h-8 w-20 bg-[#222222] rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
