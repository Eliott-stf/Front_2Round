import { ORDER_STATUS_MAP } from '@constants/appConstant';
import React from 'react';

export default function OrderSummary({ order }) {
    const date = order?.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    }) : 'Date inconnue';

    const statusObj = ORDER_STATUS_MAP[order?.status] || { label: order?.status || 'Inconnu', color: 'text-[#737373] border-[#737373]' };

    return (
        <div className="w-full bg-[#111111] border border-[#2f2f2f] rounded-xl p-6 flex flex-wrap justify-between items-center gap-6">
            <div className="flex flex-wrap gap-12">
                <div className="flex flex-col">
                    <span className="font-inter text-[#737373] text-xs uppercase tracking-widest mb-1">Date de commande</span>
                    <span className="font-inter text-white text-sm">{date}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-inter text-[#737373] text-xs uppercase tracking-widest mb-1">Total</span>
                    <span className="font-inter text-white font-bold text-sm">{order?.totalAmount} €</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-inter text-[#737373] text-xs uppercase tracking-widest mb-1">N° de commande</span>
                    <span className="font-inter text-white text-sm">{order?.reference}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="font-inter text-white text-sm">Statut :</span>
                <span className={`px-4 py-1.5 text-xs font-inter font-semibold uppercase tracking-widest border rounded-full ${statusObj.color}`}>
                    {statusObj.label}
                </span>
            </div>
        </div>
    );
}