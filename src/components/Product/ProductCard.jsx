import React from 'react';
import { Link } from 'react-router-dom';

//TODO: Badge temporaire 
const VerifiedBadge = () => (
    <div className="absolute top-2 right-2 rounded-full border border-white p-1 backdrop-blur-md bg-black/30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </div>
);

export default function ProductCard({ product }) {

    // On déclare nos constante pour le confort 
    const title = product?.title || 'Article';
    const price = product?.price || 0;
    const subtitle = product?.condition || product?.description || 'Bon état';
    const imagePath = product?.medias?.[0]?.path|| product?.imageUrl || null;
    const imageUrl = imagePath
        ? (imagePath.startsWith('http') ? imagePath : `http://localhost:3000${imagePath}`)
        : '/images/placeholder.jpg';

    return (
        <article className="flex flex-col group cursor-pointer w-fit">
            <Link to={`/product/${product?.id}`} className="flex flex-col">
                <div className="relative w-55 h-55 bg-[#1a1a1a] mb-4 overflow-hidden rounded-sm">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <VerifiedBadge />
                </div>
                <div className="flex flex-col font-inter">
                    <h3 className="text-white font-bold text-lg leading-tight uppercase truncate max-w-55">
                        {title}
                    </h3>
                    <p className="text-gray text-sm mt-1 mb-2 font-light truncate max-w-55">
                        {subtitle}
                    </p>
                    <span className="text-white font-bold text-lg">
                        {price}€
                    </span>
                </div>
            </Link>
        </article>
    );
}