import React from 'react';

export default function TargetElementCardSkeleton({ isProductReport = true }) {
    if (isProductReport) {
        return (
            <div className="flex flex-col sm:flex-row gap-5 bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 items-center justify-between pointer-events-none select-none">
                <div className="flex items-center gap-5 w-full sm:w-auto min-w-0">
                    {/* Image */}
                    <div className="w-18 h-18 bg-[#222222] rounded-xl overflow-hidden shrink-0 border border-white/5 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                    {/* Infos produit */}
                    <div className="flex flex-col min-w-0 gap-2">
                        <div className="h-5 w-32 bg-[#222222] rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        <div className="h-5 w-20 bg-[#222222] rounded-sm relative overflow-hidden mt-1">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        <div className="h-3 w-24 bg-[#222222] rounded-sm relative overflow-hidden mt-1">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>
                </div>
                {/* Actions / Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-0 shrink-0">
                    <div className="h-8 w-24 bg-[#222222] rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                    <div className="h-8 w-24 bg-[#222222] rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                    <div className="h-8 w-32 bg-[#222222] rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 font-inter text-sm pointer-events-none select-none">
            <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                    <div>
                        <div className="h-3 w-16 bg-[#222222] mb-2 rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        <div className="h-4 w-32 bg-[#222222] rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>
                    <div>
                        <div className="h-3 w-16 bg-[#222222] mb-2 rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        <div className="h-4 w-32 bg-[#222222] rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#222222] rounded-full shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                            <div className="h-4 w-40 bg-[#222222] rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                            </div>
                            <div className="h-3 w-48 bg-[#222222] rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="h-8 w-24 bg-[#222222] rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                        <div className="h-8 w-32 bg-[#222222] rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
