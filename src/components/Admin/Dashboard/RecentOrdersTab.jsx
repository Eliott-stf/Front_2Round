// src/components/Admin/Dashboard/RecentOrdersTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { formatDateLocaleFR } from '@/utils/formateDate';

export default function RecentOrdersTab({ recentOrders = [], handleOpenOrderDetail }) {
    if (recentOrders.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center py-20 text-[#555] font-inter text-sm">
                Aucune commande enregistrée.
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
        >
            <div className="overflow-x-auto">
                <table className="w-full text-left font-inter text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-[#222] text-[#888] text-xs uppercase tracking-wider font-inter">
                            <th className="pb-3 font-semibold">Référence</th>
                            <th className="pb-3 font-semibold">Acheteur</th>
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
                                <td className="py-3 font-medium text-white group-hover:text-amber-500 transition-colors uppercase">
                                    {order.reference.substring(0, 8)}...
                                </td>
                                <td className="py-3 text-[#ccc]">
                                    {order.buyer ? `${order.buyer.name} ${order.buyer.lastname}` : 'Client'}
                                </td>
                                <td className="py-3 text-white font-semibold">
                                    {order.totalAmount}€
                                </td>
                                <td className="py-3 text-[#888]">
                                    {formatDateLocaleFR(order.createdAt)}
                                </td>
                                <td className="py-3 text-right">
                                    <button className="text-[#888] group-hover:text-white transition-colors">
                                        <ChevronRight size={16} />
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
