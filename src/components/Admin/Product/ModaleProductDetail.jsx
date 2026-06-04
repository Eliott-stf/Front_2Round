// src/components/Admin/Product/ModaleProductDetail.jsx
import React, { useState } from 'react';
import { API_ROOT } from '@constants/apiConstant';
import { PRODUCT_CONDITIONS } from '@constants/appConstant';

export default function ModaleProductDetail({ isOpen, onClose, product }) {
    //Vérif....
    if (!isOpen || !product) return null;

    //on déclare nos const de confort
    const medias = product.medias || [];
    const images = medias.length > 0
        ? medias.map(m => m.path.startsWith('http') ? m.path : `${API_ROOT}${m.path}`)
        : ['/images/placeholder.jpg'];

    const sellerName = product.seller
        ? `${product.seller.name} ${product.seller.lastname}`
        : 'Anonyme';
    const sellerEmail = product.seller?.email || 'N/A';

    const conditionLabel = PRODUCT_CONDITIONS.find(c => c.value === product.condition)?.label || product.condition;

    //on déclare nos state
    const [activeIndex, setActiveIndex] = useState(0);

    //on déclare nos const de confort
    const handlePrev = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto transition-all">
            {/* Conteneur principal de la modale */}
            <div className="relative w-full max-w-4xl bg-[#1c1c1e] border border-[#222222] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-8">
                
                {/* Bouton fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/80 hover:text-white transition-colors outline-none"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Section Gauche : Slider Photo */}
                <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px] bg-[#111111] flex items-center justify-center overflow-hidden select-none group">
                    <img
                        src={images[activeIndex]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-all duration-500"
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors outline-none"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors outline-none"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Indicateur de position */}
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/65 text-white text-[12px] font-medium font-inter">
                                {activeIndex + 1} / {images.length}
                            </div>

                            {/* Dots de navigation */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveIndex(index);
                                        }}
                                        className={`h-1.5 rounded-full transition-all duration-300 outline-none ${
                                            index === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Section Droite : Détails du Produit */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto max-h-[500px]">
                    <div className="flex flex-col gap-5">
                        
                        {/* En-tête : Catégorie & Statut */}
                        <div className="flex items-center justify-between">
                            <span className="font-bebas text-md tracking-wider text-[#888888] uppercase">
                                {product.category?.name || 'Catégorie inconnue'}
                            </span>
                            <span className={`px-2.5 py-0.5 text-xs font-inter uppercase tracking-wider border rounded-md ${
                                product.status === 'ARCHIVED' ? 'border-[#333333] text-[#555555]' : 'border-white text-white'
                            }`}>
                                {product.status}
                            </span>
                        </div>

                        {/* Titre & Prix */}
                        <div>
                            <h2 className="font-bebas text-3xl tracking-wide text-white leading-tight">
                                {product.title}
                            </h2>
                            <p className="font-inter text-2xl font-semibold text-white mt-1">
                                {product.price} €
                            </p>
                        </div>

                        <hr className="border-[#222222]" />

                        {/* Caractéristiques */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="font-inter text-xs text-[#555555] uppercase block">État</span>
                                <span className="font-inter text-sm text-white font-medium">{conditionLabel}</span>
                            </div>
                            <div>
                                <span className="font-inter text-xs text-[#555555] uppercase block">Taille</span>
                                <span className="font-inter text-sm text-white font-medium">{product.size || 'N/A'}</span>
                            </div>
                        </div>

                        <hr className="border-[#222222]" />

                        {/* Vendeur */}
                        <div>
                            <span className="font-inter text-xs text-[#555555] uppercase block mb-1">Vendeur</span>
                            <div className="bg-[#111] p-3 rounded-lg border border-[#222] flex flex-col gap-0.5">
                                <span className="font-inter text-sm text-white font-medium">{sellerName}</span>
                                <span className="font-inter text-xs text-[#888888]">{sellerEmail}</span>
                            </div>
                        </div>

                        <hr className="border-[#222222]" />

                        {/* Description */}
                        <div>
                            <span className="font-inter text-xs text-[#555555] uppercase block mb-1.5">Description</span>
                            <p className="font-inter text-sm text-[#888888] leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>

                    </div>

                    {/* Actions de pied de page */}
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-full border border-[#222] text-[#888] hover:text-white hover:border-white font-inter text-sm font-semibold transition-colors outline-none"
                        >
                            Fermer
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
