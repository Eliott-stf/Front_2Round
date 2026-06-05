// src/components/Admin/Dashboard/RecentUsersTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { formatDateLocaleFR } from '@/utils/formateDate';

export default function RecentUsersTab({ recentUsers = [], handleOpenUserDetail }) {
    if (recentUsers.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center py-20 text-[#555] font-inter text-sm">
                Aucun utilisateur enregistré.
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
                            <th className="pb-3 font-semibold">Membre</th>
                            <th className="pb-3 font-semibold">Email</th>
                            <th className="pb-3 font-semibold">Date d'inscription</th>
                            <th className="pb-3 font-semibold">Rôle</th>
                            <th className="pb-3 text-right">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentUsers.map((user) => (
                            <tr 
                                key={user.id} 
                                onClick={() => handleOpenUserDetail(user.id)}
                                className="border-b border-[#222]/50 hover:bg-white/5 cursor-pointer transition-colors group"
                            >
                                <td className="py-3 font-medium text-white group-hover:text-emerald-500 transition-colors">
                                    {user.name} {user.lastname}
                                </td>
                                <td className="py-3 text-[#ccc]">
                                    {user.email}
                                </td>
                                <td className="py-3 text-[#888]">
                                    {formatDateLocaleFR(user.createdAt)}
                                </td>
                                <td className="py-3">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold font-inter ${
                                        user.role === 'ADMIN' 
                                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                                            : 'bg-[#222] text-[#aaa] border border-[#333]'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-3 text-right">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                        user.isActive 
                                            ? 'bg-emerald-500/10 text-emerald-500' 
                                            : 'bg-red-500/10 text-[#ff4444]'
                                    }`}>
                                        {user.isActive ? 'Actif' : 'Banni'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
