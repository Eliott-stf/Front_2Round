import React from 'react';

export default function DashboardCardSkeleton() {
    return (
        <div className="bg-[#111111] border border-[#222222] p-6 rounded-lg flex flex-col gap-4 relative overflow-hidden pointer-events-none select-none">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    {/* Titre stat */}
                    <div className="h-3 w-20 bg-[#222222] rounded-sm relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                    {/* Valeur stat */}
                    <div className="h-8 w-16 mt-1 bg-[#222222] rounded-sm relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                </div>
                {/* Icône */}
                <div className="w-[46px] h-[46px] border border-[#222222] rounded-md bg-[#1a1a1a] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </div>
            
            {/* Tendance / Evolution */}
            <div className="flex items-center gap-1.5 mt-2">
                <div className="h-3 w-32 bg-[#222222] rounded-sm relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </div>
        </div>
    );
}
