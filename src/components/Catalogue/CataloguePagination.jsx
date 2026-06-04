import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '@store/product/productSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CataloguePagination({ meta }) {
    
    // On récupère les hooks
    const dispatch = useDispatch();

    // On déclare nos constantes de confort
    const { page, totalPages } = meta;

    // On déclare nos méthodes
    const handlePrev = () => {
        if (page > 1) dispatch(setPage(page - 1));
    };

    const handleNext = () => {
        if (page < totalPages) dispatch(setPage(page + 1));
    };

    const handlePageClick = (pageNum) => {
        dispatch(setPage(pageNum));
    };

    // Génération simplifiée des pages pour l'UI
    const renderPages = () => {
        let pages = [];
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
            pages.push(i);
        }
        
        if (totalPages > 4) {
            pages.push('...');
            pages.push(totalPages);
        } else if (totalPages === 4) {
            pages.push(4);
        }

        return pages.map((p, index) => (
            <button
                key={index}
                onClick={() => typeof p === 'number' && handlePageClick(p)}
                className={`font-bebas text-xl px-2 outline-none transition-colors ${
                    p === page ? 'text-white' : 'text-[#555555] hover:text-white'
                } ${typeof p !== 'number' ? 'cursor-default pointer-events-none' : ''}`}
            >
                {p}
            </button>
        ));
    };

    if (!totalPages || totalPages <= 1) return null;

    return (
        <div className="w-full flex justify-center items-center gap-4 py-16 border-t border-[#1a1a1a]">
            <button 
                onClick={handlePrev} 
                disabled={page === 1}
                className="text-[#555555] hover:text-white disabled:opacity-30 disabled:pointer-events-none outline-none transition-colors"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
                {renderPages()}
            </div>

            <button 
                onClick={handleNext} 
                disabled={page === totalPages}
                className="text-[#555555] hover:text-white disabled:opacity-30 disabled:pointer-events-none outline-none transition-colors"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}