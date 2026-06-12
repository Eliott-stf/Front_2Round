import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { GUIDE_SIZES } from '@constants/appConstant';

export default function ModaleTaille({ isOpen, onClose }) {
    const [equipmentType, setEquipmentType] = useState('GANTS');
    const [gender, setGender] = useState('HOMME');

    const equipmentData = GUIDE_SIZES[equipmentType];

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

                    <div className="absolute inset-0 bg-pattern-overlay pointer-events-none z-0" />

                    <div className="relative z-10 flex-1 p-7 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="text-left space-y-5 mb-8">
                                <p className="text-red font-bold uppercase tracking-[0.3em] text-sm">Manuel tactique</p>
                                <h2 className="font-bebas text-7xl md:text-8xl leading-[0.88] text-white uppercase">GUIDE DES TAILLES</h2>
                                <p className="text-white/70 text-base leading-8 font-inter">
                                    Conseil du coin : vérifiez l’état, l’ajustement et la sensation avant chaque reprise. Un bon équipement doit protéger sans ralentir votre garde.
                                </p>
                            </div>

                        {/* Select Equipment */}
                        <div className="mb-6 relative z-20">
                            <select 
                                value={equipmentType}
                                onChange={(e) => setEquipmentType(e.target.value)}
                                className="w-full bg-black border border-white/20 text-white font-inter text-lg rounded-none py-4 px-5 outline-none focus:border-red transition-colors appearance-none cursor-pointer"
                            >
                                {Object.entries(GUIDE_SIZES).map(([key, item]) => (
                                    <option key={key} value={key} className="bg-black text-white">{item.label}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-white/50">
                                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>

                        {/* Gender Toggle (only if type is table and has HOMME/FEMME) */}
                        {equipmentData.type === 'table' && equipmentData.data && (
                            <div className="flex gap-4 mb-8 z-20 relative">
                                <button 
                                    onClick={() => setGender('HOMME')}
                                    className={`flex-1 py-3 font-bebas text-2xl uppercase transition-colors border ${gender === 'HOMME' ? 'bg-red text-white border-red' : 'bg-black text-white/50 border-white/20 hover:border-white hover:text-white'}`}
                                >
                                    HOMME
                                </button>
                                <button 
                                    onClick={() => setGender('FEMME')}
                                    className={`flex-1 py-3 font-bebas text-2xl uppercase transition-colors border ${gender === 'FEMME' ? 'bg-red text-white border-red' : 'bg-black text-white/50 border-white/20 hover:border-white hover:text-white'}`}
                                >
                                    FEMME
                                </button>
                            </div>
                        )}

                        {/* Table OR Text Content */}
                        <div className="flex-1 overflow-x-auto relative z-20 pb-12">
                            {equipmentData.type === 'table' ? (
                                <table className="w-full text-left font-inter border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/20">
                                            {equipmentData.columns.map((col, idx) => (
                                                <th key={idx} className="py-4 px-2 text-white/70 font-bold uppercase text-sm tracking-wider">{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {equipmentData.data[gender]?.map((row, idx) => (
                                            <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                                <td className="py-4 px-2 text-red font-bold">{row.col1}</td>
                                                <td className="py-4 px-2 text-white/80">{row.col2}</td>
                                                {row.col3 && <td className="py-4 px-2 text-white/80">{row.col3}</td>}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex flex-col gap-8 pt-4">
                                    {equipmentData.content.map((item, idx) => (
                                        <div key={idx} className="border border-white/10 p-6 bg-black/40">
                                            <h3 className="font-bebas text-red text-3xl tracking-wider mb-3 uppercase">{item.title}</h3>
                                            <p className="font-inter text-white/70 text-base leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
        </AnimatePresence>
    );
}
