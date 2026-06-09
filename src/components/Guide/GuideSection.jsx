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
        <section className="w-full bg-black py-6 md:py-12">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[136px] flex flex-col">
                
                {GUIDE_DATA.map((guide, index) => (
                    <button 
                        key={index}
                        onClick={() => setActiveModal(guide.modalId)}
                        className="group flex items-center justify-between py-6 md:py-12 border-b border-[#2f2f2f] hover:border-[#4a4a4a] transition-colors duration-300 w-full text-left cursor-pointer"
                    >
                        {/* Titre */}
                        <h2 className="font-bebas text-white text-3xl md:text-5xl lg:text-6xl leading-none uppercase group-hover:text-red transition-colors duration-300 pr-2">
                            {guide.title}
                        </h2>

                        {/* Flèche Rouge */}
                        <div className="flex-shrink-0 ml-4 md:ml-8 text-red group-hover:translate-x-3 transition-transform duration-300">
                            <ArrowRight className="w-8 h-8 md:w-[50px] md:h-[50px]" strokeWidth={2} />
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