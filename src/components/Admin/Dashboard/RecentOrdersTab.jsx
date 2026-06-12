// src/components/Admin/Dashboard/RecentOrdersTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { formatDateLocaleFR } from '@/utils/formateDate';
import { API_ROOT } from '@constants/apiConstant';

export default function RecentOrdersTab({ recentOrders = [], handleOpenOrderDetail }) {
    if (recentOrders.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center py-20 text-[#555] font-inter text-sm">
                Aucune commande enregistrée.
            </div>
        );
    }

    const getImageUrl = (order) => {
        const item = order.items?.[0];
        const packPath = item?.packMedias?.[0]?.path;
        const productPath = item?.product?.medias?.[0]?.path;
        const path = packPath || productPath;
        
        if (!path) return '/images/placeholder.jpg';
        return path.startsWith('http') ? path : `${API_ROOT}${path}`;
    };

    const getProductTitle = (order) => {
        const product = order.items?.[0]?.product;
        const extra = (order.items?.length || 1) - 1;
        const baseTitle = product?.title || order.reference.substring(0, 8);
        return extra > 0 ? `${baseTitle} (+${extra})` : baseTitle;
    };

    const getSellerName = (order) => {
        const seller = order.items?.[0]?.product?.seller;
        if (!seller) return 'Inconnu';
        return `${seller.name} ${seller.lastname}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
        >
            {/* Mobile View: Cards */}
            <div className="block md:hidden space-y-3">
                {recentOrders.map((order) => (
                    <div 
                        key={order.id}
                        onClick={() => handleOpenOrderDetail(order)}
                        className="bg-[#111] p-4 rounded-lg border border-[#222] cursor-pointer hover:bg-[#1a1a1a] transition-colors flex gap-4 items-center group"
                    >
                        <img 
                            src={getImageUrl(order)} 
                            alt="Produit" 
                            className="w-12 h-12 rounded object-cover bg-black shrink-0"
                        />
                        <div className="flex-1 flex flex-col gap-1 min-w-0">
                            <div className="flex justify-between items-center gap-2">
                                <span className="font-medium text-white uppercase text-sm group-hover:text-amber-500 transition-colors truncate">
                                    {getProductTitle(order)}
                                </span>
                                <span className="text-white font-semibold text-sm shrink-0">
                                    {order.totalAmount}€
                                </span>
                            </div>
                            <div className="flex flex-col text-xs text-[#888] mt-1">
                                <span>A: {order.buyer ? `${order.buyer.name} ${order.buyer.lastname}` : 'Client'}</span>
                                <div className="flex justify-between items-center mt-0.5">
                                    <span className="truncate max-w-[60%]">V: {getSellerName(order)}</span>
                                    <span className="shrink-0">{formatDateLocaleFR(order.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left font-inter text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-[#222] text-[#888] text-xs uppercase tracking-wider font-inter">
                            <th className="pb-3 font-semibold w-12"></th>
                            <th className="pb-3 font-semibold pl-4">Article</th>
                            <th className="pb-3 font-semibold">Acheteur</th>
                            <th className="pb-3 font-semibold">Vendeur</th>
                            <th className="pb-3 font-semibold">Montant</th>
                            <th className="pb-3 font-semibold">Date</th>
                            <th className="pb-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr 
                                key={order.id} 
                                onClick={() => handleOpenOrderDetail(order)}
                                className="border-b border-[#222]/50 hover:bg-white/5 cursor-pointer transition-colors group"
                            >
                                <td className="py-3">
                                    <img 
                                        src={getImageUrl(order)} 
                                        alt="Produit" 
                                        className="w-10 h-10 rounded object-cover bg-black"
                                    />
                                </td>
                                <td className="py-3 pl-4 font-medium text-white group-hover:text-amber-500 transition-colors uppercase truncate max-w-[200px]">
                                    {getProductTitle(order)}
                                </td>
                                <td className="py-3 text-[#ccc] truncate max-w-[150px]">
                                    {order.buyer ? `${order.buyer.name} ${order.buyer.lastname}` : 'Client'}
                                </td>
                                <td className="py-3 text-[#ccc] truncate max-w-[150px]">
                                    {getSellerName(order)}
                                </td>
                                <td className="py-3 text-white font-semibold">
                                    {order.totalAmount}€
                                </td>
                                <td className="py-3 text-[#888]">
                                    {formatDateLocaleFR(order.createdAt)}
                                </td>
                                <td className="py-3 text-right">
                                    <button className="text-[#888] group-hover:text-white transition-colors">
                                        <ChevronRight size={16} className="ml-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
