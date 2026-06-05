// src/components/Admin/UI/SearchBar.jsx
import React from 'react';

export default function SearchBar({ placeholder = "Rechercher...", value, onChange }) {
    //on déclare nos const de confort
    const inputPlaceholder = placeholder;

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={inputPlaceholder}
                value={value}
                onChange={onChange}
                className="bg-[#111] border border-[#222] text-white font-inter text-sm rounded-full pl-5 pr-10 py-2 outline-none w-64 focus:border-[#444] transition-colors font-light"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
            </div>
        </div>
    );
}
