// src/components/Admin/Dashboard/RecentReportsTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { getRelativeTime } from '@/utils/formateDate';

export default function RecentReportsTab({ recentReports = [], handleOpenReportDetail }) {
    if (recentReports.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center py-20 text-[#555] font-inter text-sm">
                Aucun signalement en attente.
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
                            <th className="pb-3 font-semibold whitespace-nowrap px-2">Déclarant</th>
                            <th className="pb-3 font-semibold whitespace-nowrap px-2">Date</th>
                            <th className="pb-3 font-semibold whitespace-nowrap px-2">Description</th>
                            <th className="pb-3 text-right whitespace-nowrap px-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentReports.map((report) => (
                            <tr 
                                key={report.id} 
                                onClick={() => handleOpenReportDetail(report.id)}
                                className="border-b border-[#222]/50 hover:bg-white/5 cursor-pointer transition-colors group"
                            >
                                <td className="py-3 font-medium text-white group-hover:text-red transition-colors whitespace-nowrap px-2">
                                    {report.user ? `${report.user.name} ${report.user.lastname}` : 'Membre'}
                                </td>
                                <td className="py-3 text-[#888] whitespace-nowrap px-2">
                                    {getRelativeTime(report.createdAt)}
                                </td>
                                <td className="py-3 text-[#ccc] max-w-xs truncate px-2">
                                    {report.content || 'Aucune description'}
                                </td>
                                <td className="py-3 text-right whitespace-nowrap px-2">
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
