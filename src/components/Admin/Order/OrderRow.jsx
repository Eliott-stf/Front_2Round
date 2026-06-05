// src/components/Admin/Order/OrderRow.jsx
import React from 'react';
import { ORDER_STATUS_MAP } from '@constants/appConstant';
import { formatDateTimeNumeric } from '@/utils/formateDate';

export default function OrderRow({ order, handleOpenDetail }) {
    //on déclare nos const de confort
    const dateFormatted = formatDateTimeNumeric(order.createdAt);

    const buyerName = order.buyer
        ? `${order.buyer.name} ${order.buyer.lastname}`
        : 'Inconnu';

    const statusStyle = ORDER_STATUS_MAP[order.status] || { label: order.status, color: 'border-white text-white' };

    return (
        <tr 
            onClick={() => handleOpenDetail(order)}
            className="hover:bg-[#1a1a1a] transition-colors cursor-pointer"
        >
            <td className="px-6 py-4 font-inter text-sm font-semibold text-white">
                {order.reference}
            </td>
            <td className="px-6 py-4 font-inter text-sm text-white">
                {buyerName}
            </td>
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {dateFormatted}
            </td>
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {order.totalAmount.toFixed(2)} €
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-inter uppercase tracking-wider border rounded-md ${statusStyle.color}`}>
                    {statusStyle.label}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <span className="font-inter text-xs text-[#555555] hover:text-white underline transition-colors">
                    Détails
                </span>
            </td>
        </tr>
    );
}
