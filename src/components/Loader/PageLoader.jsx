import React from 'react';

export default function PageLoader() {
    // Génération d'un tableau de 8 éléments pour afficher la grille de chargement
    const skeletons = Array(8).fill(null);

    return (
        <div className="w-full min-h-screen bg-[#050505] py-24">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {skeletons.map((_, index) => (
                        <div 
                            key={index} 
                            className="w-full flex flex-col bg-[#111111] rounded-[24px] border border-[#1a1a1a] p-5 animate-pulse"
                        >
                            {/* Simulation de l'image de l'annonce */}
                            <div className="w-full h-[220px] bg-[#1f1f1f] rounded-[16px] mb-6"></div>
                            
                            {/* Simulation du titre */}
                            <div className="w-3/4 h-7 bg-[#1f1f1f] rounded-full mb-4"></div>
                            
                            {/* Simulation de la description */}
                            <div className="w-full h-4 bg-[#1f1f1f] rounded-full mb-2"></div>
                            <div className="w-5/6 h-4 bg-[#1f1f1f] rounded-full mb-8"></div>
                            
                            {/* Simulation du prix et du bouton d'action */}
                            <div className="flex justify-between items-center mt-auto">
                                <div className="w-1/3 h-8 bg-[#1f1f1f] rounded-md"></div>
                                <div className="w-12 h-12 bg-[#1f1f1f] rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}