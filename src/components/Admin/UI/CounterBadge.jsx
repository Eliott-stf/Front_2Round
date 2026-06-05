// src/components/Admin/UI/CounterBadge.jsx
import React from 'react';

export default function CounterBadge({ count, label }) {
    //on déclare nos const de confort
    const displayCount = count;
    const displayLabel = label;

    return (
        <div className="bg-[#111111] px-4 py-2 border border-[#222222] rounded-full shrink-0">
            <span className="font-inter text-sm text-white">
                {displayCount} {displayLabel}
            </span>
        </div>
    );
}
