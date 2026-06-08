import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { GUIDE_EQUIPMENTS_CONTENT } from '@constants/appConstant';

export default function ModaleEquipment({ isOpen, onClose }) {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-[#111] border border-[#2f2f2f] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
                {/* Content Section */}
                <div className="w-full p-8 md:p-12 relative flex flex-col max-h-[90vh] overflow-y-auto">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <h2 className="font-bebas text-white text-5xl md:text-6xl mb-2 uppercase leading-none mt-4 md:mt-0">
                        LES ÉQUIPEMENTS
                    </h2>
                    <p className="font-inter text-gray-400 text-lg mb-8">
                        Découvrez le matériel essentiel pour la pratique de la boxe en toute sécurité.
                    </p>

                    <div className="flex flex-col gap-6">
                        {GUIDE_EQUIPMENTS_CONTENT.map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <CheckCircle2 className="text-red shrink-0 mt-1" size={24} />
                                <div>
                                    <h3 className="font-bebas text-white text-2xl tracking-wider mb-1 uppercase">{item.title}</h3>
                                    <p className="font-inter text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
