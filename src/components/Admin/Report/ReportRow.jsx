import React from 'react';
import { formatDateTimeNumeric } from '@/utils/formateDate';

export default function ReportRow({ report, handleOpenDetail }) {
    //on déclare nos const de confort
    const reportIdShort = report.id.substring(0, 8) + '...';
    
    const reporterName = report.user
        ? `${report.user.name} ${report.user.lastname}`
        : 'Inconnu';

    const targetType = report.productId ? 'Produit' : 'Conversation';

    const dateFormatted = formatDateTimeNumeric(report.createdAt);

    const isResolved = report.status === 'RESOLVED';

    return (
        <tr 
            onClick={() => handleOpenDetail(report)}
            className="hover:bg-[#1a1a1a] transition-colors cursor-pointer"
        >
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {reportIdShort}
            </td>
            <td className="px-6 py-4 font-inter text-sm">
                <span className={`px-2 py-0.5 text-xs font-inter uppercase tracking-wide rounded ${
                    report.productId ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                }`}>
                    {targetType}
                </span>
            </td>
            <td className="px-6 py-4 font-inter text-sm text-white truncate max-w-[150px]">
                {report.typeReport?.label || 'Sans motif'}
            </td>
            <td className="px-6 py-4 font-inter text-sm text-[#888888] truncate max-w-[150px]">
                {reporterName}
            </td>
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {dateFormatted}
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-inter uppercase tracking-wider border rounded-md ${
                    isResolved ? 'border-[#333333] text-[#555555] bg-transparent' : 'border-red/40 text-red bg-red/5'
                }`}>
                    {isResolved ? 'Résolu' : 'En attente'}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <span className="font-inter text-xs text-[#555555] hover:text-white underline transition-colors">
                    Inspecter
                </span>
            </td>
        </tr>
    );
}
