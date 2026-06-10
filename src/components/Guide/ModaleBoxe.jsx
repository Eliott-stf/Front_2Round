import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Trophy } from 'lucide-react';
import { GUIDE_BOXE_CONTENT } from '@constants/appConstant';

export default function ModaleBoxe({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div 
                className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full sm:max-w-[50vw] min-w-full sm:min-w-[520px] h-full bg-black border-l border-white/20 text-white p-0 flex flex-col shadow-2xl"
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="relative flex-1 p-7 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
                        <div className="absolute inset-0 bg-pattern-overlay pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="text-left space-y-5 mb-8">
                                <p className="text-red font-bold uppercase tracking-[0.3em] text-sm">Manuel tactique</p>
                                <h2 className="font-bebas text-7xl md:text-8xl leading-[0.88] text-white uppercase">DÉMARRER LA BOXE</h2>
                                <p className="text-white/70 text-base leading-8 font-inter">
                                    Nos meilleurs conseils pour monter sur le ring sereinement.
                                    Conseil du coin : L'apprentissage passe par la rigueur. Le plus dur, ce n'est pas d'entrer sur le ring, c'est d'y retourner après la première claque.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 relative z-20 pb-12 mt-6">
                                {GUIDE_BOXE_CONTENT.map((item, idx) => (
                                    <div key={idx} className="flex gap-6 border border-white/10 p-6 bg-black/40 backdrop-blur-sm transition-colors hover:bg-white/5">
                                        <Trophy className="text-red shrink-0 mt-1" size={28} />
                                        <div>
                                            <h3 className="font-bebas text-white text-3xl tracking-wider mb-2 uppercase">{item.title}</h3>
                                            <p className="font-inter text-white/70 text-base leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
