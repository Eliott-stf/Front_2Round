import React from 'react';

export default function UserCardSkeleton() {
    return (
        <tr className="pointer-events-none select-none border-b border-[#222] last:border-b-0">
            {/* ID */}
            <td className="px-6 py-4">
                <div className="h-4 w-20 bg-[#222222] rounded-sm relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </td>
            {/* Nom + Avatar */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#222222] relative overflow-hidden shrink-0 border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                    <div className="h-4 w-32 bg-[#222222] rounded-sm relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                </div>
            </td>
            {/* Email */}
            <td className="px-6 py-4">
                <div className="h-4 w-40 sm:w-48 bg-[#222222] rounded-sm relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </td>
            {/* Rôle */}
            <td className="px-6 py-4">
                <div className="h-6 w-16 bg-[#222222] rounded-md relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </td>
            {/* Statut */}
            <td className="px-6 py-4">
                <div className="h-4 w-12 bg-[#222222] rounded-sm relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </td>
            {/* Actions */}
            <td className="px-6 py-4 text-right">
                <div className="h-4 w-14 bg-[#222222] rounded-sm relative overflow-hidden ml-auto border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </td>
        </tr>
    );
}
