// src/components/Admin/UI/FilterSelect.jsx
import React from 'react';

export default function FilterSelect({ value, onChange, options = [], defaultLabel }) {
    //on déclare nos const de confort
    const selectOptions = options;

    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className="appearance-none bg-[#111] border border-[#222] text-white font-inter text-sm rounded-full pl-5 pr-10 py-2 outline-none cursor-pointer hover:border-[#444] transition-colors"
            >
                {defaultLabel && <option value="">{defaultLabel}</option>}
                {selectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}
