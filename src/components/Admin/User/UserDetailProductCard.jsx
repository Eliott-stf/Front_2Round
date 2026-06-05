import React from 'react';
import { Link } from 'react-router-dom';
import { API_ROOT } from '@constants/apiConstant';
import { slugify } from '@/utils/slugify';

export default function UserDetailProductCard({ product }) {
    //on déclare nos const de confort
    const medias = product.medias || [];
    const imagePath = medias.length > 0
        ? (medias[0].path.startsWith('http') ? medias[0].path : `${API_ROOT}${medias[0].path}`)
        : '/images/placeholder.jpg';

    return (
        <Link 
            to={`/product/${slugify(product.title)}-${product.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col w-[160px] bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shrink-0 hover:border-[#444] transition-all"
        >
            {/* Image du produit */}
            <div className="w-full h-28 bg-[#1a1a1a] flex items-center justify-center overflow-hidden relative">
                <img 
                    src={imagePath} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.status && (
                    <span className={`absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-inter uppercase tracking-wider rounded border bg-black/60 ${
                        product.status === 'ARCHIVED' ? 'border-[#333333] text-[#555555]' : 'border-white text-white'
                    }`}>
                        {product.status}
                    </span>
                )}
            </div>

            {/* Infos produit */}
            <div className="p-3 flex flex-col gap-1 justify-between flex-1">
                <span className="font-inter text-xs text-white truncate font-medium group-hover:text-red transition-colors">
                    {product.title}
                </span>
                <div className="flex items-center justify-between mt-1">
                    <span className="font-inter text-xs text-[#888888]">
                        {product.price} €
                    </span>
                    <span className="font-bebas text-[10px] tracking-wider text-[#555555] uppercase">
                        {product.category?.name}
                    </span>
                </div>
            </div>
        </Link>
    );
}
