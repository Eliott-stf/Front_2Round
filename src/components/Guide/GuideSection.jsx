import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GUIDE_DATA } from '@constants/appConstant';
import { AnimatePresence } from 'framer-motion';

import ModaleTaille from './ModaleTaille';
import ModaleEquipment from './ModaleEquipment';
import ModaleBoxe from './ModaleBoxe';

export default function GuideSection() {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    return (
        <section className="w-full bg-black py-12">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[136px] flex flex-col">
                
                {GUIDE_DATA.map((guide, index) => (
                    <button 
                        key={index}
                        onClick={() => setActiveModal(guide.modalId)}
                        className="group flex items-center justify-between py-12 border-b border-[#2f2f2f] hover:border-[#4a4a4a] transition-colors duration-300 w-full text-left"
                    >
                        {/* Titre (96px - 15% = ~81px) */}
                        <h2 className="font-bebas text-white text-5xl md:text-6xl leading-none uppercase group-hover:text-red transition-colors duration-300">
                            {guide.title}
                        </h2>

                        {/* Flèche Rouge */}
                        <div className="flex-shrink-0 ml-8 text-red group-hover:translate-x-4 transition-transform duration-300">
                            <ArrowRight size={50} strokeWidth={2} />
                        </div>
                    </button>
                ))}

            </div>

            {/* Modales */}
            <AnimatePresence>
                {activeModal === 'taille' && (
                    <ModaleTaille isOpen={true} onClose={closeModal} />
                )}
                {activeModal === 'equipement' && (
                    <ModaleEquipment isOpen={true} onClose={closeModal} />
                )}
                {activeModal === 'boxe' && (
                    <ModaleBoxe isOpen={true} onClose={closeModal} />
                )}
            </AnimatePresence>
        </section>
    );
}