// src/components/Admin/Dashboard/DashboardCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ADMIN_DASHBOARD_CARD_VARIANTS } from '@/constants/appConstant';

export default function DashboardCard({ 
    title, 
    value, 
    icon: Icon, 
    iconBgClass, 
    trendPrefix = '', 
    trendValue, 
    trendSuffix = '', 
    trendColorClass = 'text-white',
    actionRequiredText,
    actionRequiredColorClass = 'text-[#888]',
    isWarningValue = false
}) {
    //on déclare nos const de confort
    const hasTrend = trendValue !== undefined && trendValue !== null;

    return (
        <motion.div 
            variants={ADMIN_DASHBOARD_CARD_VARIANTS}
            whileHover={{ scale: 1.02, borderColor: '#333' }}
            className="bg-[#111] border border-[#222] p-6 rounded-lg flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <span className="font-inter text-[#888888] text-xs uppercase tracking-wider">{title}</span>
                    <span className={`font-bebas text-4xl tracking-wider ${isWarningValue ? 'text-[#ff4444]' : 'text-white'}`}>
                        {value}
                    </span>
                </div>
                <div className={`p-3 border rounded-md ${iconBgClass}`}>
                    <Icon size={20} />
                </div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-2 font-inter text-xs">
                {actionRequiredText ? (
                    <span className={`${actionRequiredColorClass} font-semibold ${actionRequiredText === 'Action requise' ? 'animate-pulse' : ''}`}>
                        {actionRequiredText}
                    </span>
                ) : hasTrend ? (
                    <>
                        <span className={`${trendColorClass} font-semibold`}>
                            {trendPrefix}{trendValue}
                        </span>
                        <span className="text-[#666]">
                            {trendSuffix}
                        </span>
                    </>
                ) : (
                    <span className="text-[#666]">Aucune donnée récente</span>
                )}
            </div>
        </motion.div>
    );
}
