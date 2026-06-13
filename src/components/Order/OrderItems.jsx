import { API_ROOT } from '@constants/apiConstant';
import { PRODUCT_CONDITIONS } from '@constants/appConstant';
import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '@/utils/slugify';

export default function OrderItems({ items }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-[#111111] border border-[#2f2f2f] rounded-xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-[#2f2f2f]">
                <h3 className="font-bebas text-white text-2xl tracking-wider uppercase">
                    Articles de la commande
                </h3>
            </div>
            
            <div className="flex flex-col">
                {items.map((item, index) => {
                    const product = item.product;
                    const imagePath = product?.medias?.[0]?.path;
                    const imageUrl = imagePath 
                        ? (imagePath.startsWith('http') ? imagePath : `${API_ROOT}${imagePath}`) 
                        : '/images/placeholder.jpg';

                    return (
                        <div key={item.id} className={`flex gap-3 sm:gap-6 p-4 sm:p-6 ${index !== items.length - 1 ? 'border-b border-[#2f2f2f]' : ''}`}>
                            <Link to={`/product/${slugify(product?.title)}-${product?.id}`} className="shrink-0">
                                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-black rounded-lg overflow-hidden relative group">
                                    <img 
                                        src={imageUrl} 
                                        alt={product?.title} 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                    />
                                </div>
                            </Link>

                            <div className="flex flex-col flex-1 justify-center min-w-0">
                                <Link to={`/product/${slugify(product?.title)}-${product?.id}`}>
                                    <h4 className="font-bebas text-white text-lg sm:text-2xl uppercase tracking-wide truncate hover:text-red transition-colors">
                                        {product?.title}
                                    </h4>
                                </Link>
                                <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 mt-1 sm:mt-2">
                                    <span className="font-inter text-[#737373] text-[11px] sm:text-sm">
                                        Taille : <span className="text-white">{product?.attributes?.map(pa => pa.attribute?.value).filter(Boolean).join(', ') || product?.size || 'N/A'}</span>
                                    </span>
                                    <span className="font-inter text-[#737373] text-[11px] sm:text-sm">
                                        État : <span className="text-white">{PRODUCT_CONDITIONS.find(c => c.value === product?.condition)?.label || product?.condition || 'N/A'}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-end shrink-0 pl-2 sm:pl-4">
                                <span className="font-bebas text-white text-lg sm:text-2xl">
                                    {item.unitPriceAtPurchase} €
                                </span>
                                <span className="font-inter text-[#737373] text-[11px] sm:text-sm mt-0.5 sm:mt-1">
                                    Qté: {item.quantity}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}