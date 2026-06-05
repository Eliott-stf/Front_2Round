// src/components/Admin/UI/HeaderAdmin.jsx
import React from 'react';

export default function HeaderAdmin({ title, subtitle, icon: Icon, children }) {
    //on déclare nos const de confort
    const hasIcon = !!Icon;

    return (
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div>
                <h1 className="font-bebas text-4xl tracking-widest text-white flex items-center gap-3">
                    {hasIcon && <Icon size={32} className="text-red" />}
                    {title}
                </h1>
                <p className="font-inter text-[#888888] mt-2">{subtitle}</p>
            </div>
            
            {children && (
                <div className="flex flex-wrap items-center gap-4">
                    {children}
                </div>
            )}
        </header>
    );
}
