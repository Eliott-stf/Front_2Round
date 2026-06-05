// src/components/Admin/Report/UserCard.jsx
import React from 'react';
import { User } from 'lucide-react';

export default function UserCard({ user, label, type, onClick, onToggleBan }) {
    //Vérif si un utilisateur est fourni
    if (!user) {
        return (
            <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 flex flex-col justify-center items-center font-inter min-h-[140px] text-white/30 text-xs">
                <User size={24} className="mb-2 opacity-50" />
                <span>Aucun utilisateur associé</span>
            </div>
        );
    }

    //on déclare nos const de confort
    const userName = `${user.name || ''} ${user.lastname || ''}`.trim() || 'Inconnu';
    const userEmail = user.email || 'N/A';
    const userRole = user.role || 'N/A';
    const userId = user.id || 'N/A';

    // Définition des styles selon le type (déclarant ou mis en cause)
    const isReporter = type === 'reporter';
    const borderHoverClass = isReporter ? 'hover:border-white/20' : 'hover:border-red/30';
    const labelColorClass = isReporter ? 'text-white/40' : 'text-red/60';
    const avatarBgClass = isReporter ? 'bg-white/5 border-white/10 text-white/70' : 'bg-red/5 border-red/10 text-red/70';
    const roleBadgeClass = isReporter ? 'bg-white/5 text-white/60' : 'bg-red/10 text-red';

    return (
        <div 
            onClick={onClick}
            className={`bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 flex flex-col justify-between font-inter min-h-[140px] transition-all hover:bg-[#222]/30 cursor-pointer group ${borderHoverClass}`}
        >
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${avatarBgClass}`}>
                    <User size={18} />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className={`text-[9px] uppercase font-bold tracking-wider mb-0.5 ${labelColorClass}`}>{label}</span>
                    <span className="text-white font-semibold text-sm truncate group-hover:text-red transition-colors">
                        {userName} {!user.isActive && <span className="text-red text-[10px] ml-1 font-inter font-normal lowercase">(banni)</span>}
                    </span>
                    <span className="text-white/50 text-xs truncate mt-0.5">{userEmail}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-white/5 pt-3 mt-3">
                <div className="flex items-center justify-between">
                    <span className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded text-[8px] ${roleBadgeClass}`}>
                        {userRole}
                    </span>
                    {userRole !== 'ADMIN' && onToggleBan && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleBan(userId);
                            }}
                            className={`px-2 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider border cursor-pointer transition-colors ${
                                user.isActive 
                                    ? 'border-red/45 text-red hover:bg-red/5' 
                                    : 'border-emerald-500/45 text-emerald-400 hover:bg-emerald-500/5'
                            }`}
                        >
                            {user.isActive ? 'Bannir' : 'Débannir'}
                        </button>
                    )}
                </div>
                <span className="font-mono text-[9px] text-white/30 break-all select-all">ID: {userId}</span>
            </div>
        </div>
    );
}
