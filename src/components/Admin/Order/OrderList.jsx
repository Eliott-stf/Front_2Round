// src/components/Admin/Order/OrderList.jsx
import React from 'react';
import OrderRow from './OrderRow';

export default function OrderList({ orders, loading, handleOpenDetail }) {
    return (
        <div className="bg-[#111111] border border-[#222222] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#222222] bg-[#0a0a0a]">
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Référence</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Acheteur</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Date & Heure</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Montant</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222]">
                        {orders.map((order) => (
                            <OrderRow 
                                key={order.id} 
                                order={order} 
                                handleOpenDetail={handleOpenDetail} 
                            />
                        ))}
                        {orders.length === 0 && !loading && (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-[#555555] font-inter">
                                    Aucune commande trouvée.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
