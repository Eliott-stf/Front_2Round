// src/components/Admin/Dashboard/CategoryDistribution.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ADMIN_DASHBOARD_CARD_VARIANTS } from '@/constants/appConstant';

export default function CategoryDistribution({ categoryDistribution = [], totalProductsCount = 0 }) {
    return (
        <motion.div 
            variants={ADMIN_DASHBOARD_CARD_VARIANTS}
            className="bg-[#111] border border-[#222] rounded-lg p-6 flex flex-col"
        >
            <h2 className="font-bebas text-2xl tracking-wider text-white border-b border-[#222] pb-4 mb-6">
                Produits par catégorie
            </h2>
            
            {categoryDistribution.length === 0 ? (
                <div className="flex-1 flex items-center justify-center py-20 text-[#555] font-inter text-sm">
                    Aucune donnée de catégorie disponible.
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    {categoryDistribution.map((cat) => {
                        const percent = totalProductsCount > 0 
                            ? Math.round((cat.count / totalProductsCount) * 100) 
                            : 0;

                        return (
                            <div key={cat.id} className="flex flex-col gap-2 group">
                                <div className="flex justify-between items-center text-sm font-inter">
                                    <span className="text-[#ccc] group-hover:text-white transition-colors font-medium">
                                        {cat.label}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-semibold">{cat.count}</span>
                                        <span className="text-[#555] text-xs">({percent}%)</span>
                                    </div>
                                </div>
                                
                                {/* Premium Progress Bar */}
                                <div className="w-full bg-black h-2 border border-[#222] rounded-full overflow-hidden">
                                    <div 
                                        className="h-full rounded-full transition-all duration-1000 ease-out" 
                                        style={{ 
                                            width: `${percent}%`,
                                            background: 'linear-gradient(90deg, #ff0055 0%, #ff5500 100%)'
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <div className="border-t border-[#222] pt-4 mt-2 flex items-center justify-between font-inter text-xs text-[#666]">
                        <span>Total des produits catalogués</span>
                        <span className="text-white font-semibold">{totalProductsCount} articles</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
