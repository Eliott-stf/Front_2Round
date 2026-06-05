import React from 'react';
import ReportRow from './ReportRow';

export default function ReportList({ reports = [], loading, handleOpenDetail }) {
    return (
        <div className="bg-[#111111] border border-[#222222] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#222222] bg-[#0a0a0a]">
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Cible</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Motif</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Déclarant</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222]">
                        {reports.map((report) => (
                            <ReportRow 
                                key={report.id} 
                                report={report} 
                                handleOpenDetail={handleOpenDetail} 
                            />
                        ))}
                        {reports.length === 0 && !loading && (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-[#555555] font-inter">
                                    Aucun signalement trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
