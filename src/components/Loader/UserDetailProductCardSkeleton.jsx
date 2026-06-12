import React from 'react';

export default function UserDetailProductCardSkeleton() {
    return (
        <div className="group flex flex-col w-[160px] bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shrink-0 pointer-events-none select-none">
            {/* Image Placeholder */}
            <div className="w-full h-28 bg-[#1a1a1a] relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
            </div>

            {/* Infos produit Placeholder */}
            <div className="p-3 flex flex-col gap-1 justify-between flex-1 bg-[#111111]">
                <div className="h-3 w-full bg-[#222222] rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                </div>
                <div className="flex items-center justify-between mt-1">
                    <div className="h-3 w-8 bg-[#222222] rounded-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                    <div className="h-3 w-12 bg-[#222222] rounded-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    </div>
                </div>
            </div>
        </div>
    );
}
