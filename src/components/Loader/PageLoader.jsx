import React from 'react';
import Navbar from '@components/Layout/Navbar';
import HeaderView from '@components/UI/HeaderView';
import { BrowserRouter } from 'react-router-dom';

export default function PageLoader({ withLayout = false }) {
    // Génération d'un tableau de 8 éléments pour afficher la grille de chargement
    const skeletons = Array(8).fill(null);

    const content = (
        <div className={withLayout ? "flex-1 flex flex-col min-h-0 bg-[#000000]" : "w-full"}>
            <HeaderView 
                title="CHARGEMENT..." 
                subtitle="Merci de patienter pendant que nous préparons vos données." 
                heightClass="h-[120px] md:h-[200px]" 
            />
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] py-12 w-full">
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

    if (withLayout) {
        return (
            <BrowserRouter>
                <div className="flex flex-col min-h-screen bg-[#000000] w-full">
                    <Navbar />
                    {content}
                </div>
            </BrowserRouter>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#000000] w-full">
            {content}
        </div>
    );
}