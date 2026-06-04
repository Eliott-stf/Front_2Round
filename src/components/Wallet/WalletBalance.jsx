import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export default function WalletBalance({ balance }) {
    
    // On déclare nos constantes pour le confort
    const formattedBalance = balance?.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0,00';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#111111] border border-[#2f2f2f] rounded-xl p-8 flex flex-col relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Wallet className="w-48 h-48 text-white" />
            </div>

            <span className="font-inter text-[#737373] text-sm uppercase tracking-widest mb-2 relative z-10">
                Solde actuel
            </span>
            <span className="font-bebas text-white text-6xl tracking-wider relative z-10">
                {formattedBalance} €
            </span>

        </motion.div>
    );
}