import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GUIDE_SIZES } from '@constants/appConstant';

export default function ModaleTaille({ isOpen, onClose }) {
    const [equipmentType, setEquipmentType] = useState('GANTS');
    const [gender, setGender] = useState('HOMME');

    const equipmentData = GUIDE_SIZES[equipmentType];

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
                className="relative w-full max-w-3xl bg-[#111] border border-[#2f2f2f] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
                {/* Content Section */}
                <div className="w-full p-8 md:p-12 relative flex flex-col max-h-[90vh] overflow-y-auto">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <h2 className="font-bebas text-white text-5xl md:text-6xl mb-4 uppercase leading-none mt-4 md:mt-0">
                        GUIDE DES TAILLES
                    </h2>
                    
                    {/* Select Equipment */}
                    <div className="mb-6 relative">
                        <select 
                            value={equipmentType}
                            onChange={(e) => setEquipmentType(e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-[#2f2f2f] text-white font-inter text-lg rounded-lg py-3 px-4 outline-none focus:border-red transition-colors appearance-none cursor-pointer"
                        >
                            {Object.entries(GUIDE_SIZES).map(([key, item]) => (
                                <option key={key} value={key}>{item.label}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>

                    {/* Gender Toggle (only if type is table and has HOMME/FEMME) */}
                    {equipmentData.type === 'table' && equipmentData.data && (
                        <div className="flex gap-4 mb-6">
                            <button 
                                onClick={() => setGender('HOMME')}
                                className={`flex-1 py-3 font-bebas text-2xl uppercase rounded-lg transition-colors border ${gender === 'HOMME' ? 'bg-red text-white border-red' : 'bg-black text-gray-400 border-[#2f2f2f] hover:border-white hover:text-white'}`}
                            >
                                HOMME
                            </button>
                            <button 
                                onClick={() => setGender('FEMME')}
                                className={`flex-1 py-3 font-bebas text-2xl uppercase rounded-lg transition-colors border ${gender === 'FEMME' ? 'bg-red text-white border-red' : 'bg-black text-gray-400 border-[#2f2f2f] hover:border-white hover:text-white'}`}
                            >
                                FEMME
                            </button>
                        </div>
                    )}

                    {/* Table OR Text Content */}
                    <div className="overflow-x-auto flex-1">
                        {equipmentData.type === 'table' ? (
                            <table className="w-full text-left font-inter">
                                <thead>
                                    <tr className="border-b border-[#2f2f2f]">
                                        {equipmentData.columns.map((col, idx) => (
                                            <th key={idx} className="py-4 px-2 text-white font-bold uppercase text-sm">{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipmentData.data[gender]?.map((row, idx) => (
                                        <tr key={idx} className="border-b border-[#1f1f1f] hover:bg-[#1a1a1a] transition-colors">
                                            <td className="py-4 px-2 text-red font-bold">{row.col1}</td>
                                            <td className="py-4 px-2 text-gray-300">{row.col2}</td>
                                            {row.col3 && <td className="py-4 px-2 text-gray-300">{row.col3}</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex flex-col gap-6 pt-4">
                                {equipmentData.content.map((item, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bebas text-red text-2xl tracking-wider mb-1 uppercase">{item.title}</h3>
                                        <p className="font-inter text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
