import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HOME_GUIDES } from '@constants/appConstant';
import { AnimatePresence } from 'framer-motion';

import ModaleTaille from '../Guide/ModaleTaille';
import ModaleEquipment from '../Guide/ModaleEquipment';
import ModaleBoxe from '../Guide/ModaleBoxe';

export default function GuidesSection() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <section className="relative w-full min-h-[745px] lg:h-[745px] py-16 lg:py-0 bg-[#111111] flex justify-center items-center overflow-hidden border-b border-gray-dark">

      <div className="absolute inset-0 bg-pattern-overlay z-0" />

      <div className="relative z-10 w-full max-w-[1382px] h-full flex flex-col justify-center items-center px-6">

        <div className="w-full flex flex-col max-w-[1240px]">

          <h2 className="font-bebas text-white text-[40px] md:text-[56px] uppercase mb-8 md:mb-10 tracking-wider ml-3 mt-4 lg:mt-15">
            UN COUP DE POING ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {HOME_GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => {
                if (guide.id === 1) setActiveModal('taille');
                else if (guide.id === 2) setActiveModal('equipement');
                else if (guide.id === 3) setActiveModal('boxe');
              }}
              className="relative group w-full flex flex-row md:flex-col items-center justify-start h-auto md:h-[380px] lg:h-[450px] py-5 px-5 md:pt-10 lg:pt-16 md:px-6 lg:px-8 rounded-[24px] md:rounded-[32px] bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-[#222222] hover:border-red/40 overflow-hidden gap-5 md:gap-0 transition-all duration-500 hover:shadow-[0_0_40px_rgba(204,0,0,0.1)] cursor-pointer"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-red/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <img
                src={guide.img}
                alt={guide.title}
                className="relative z-10 w-20 h-20 md:w-[130px] md:h-[130px] lg:w-[180px] lg:h-[180px] object-contain shrink-0 md:mb-6 lg:mb-10 group-hover:-translate-x-2 md:group-hover:translate-x-0 md:group-hover:-translate-y-4 group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)] md:drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]"
              />
              
              <div className="relative z-10 flex flex-col items-start text-left md:items-center md:text-center">
                <h3 className="font-bebas text-[24px] md:text-[30px] lg:text-[36px] text-white leading-none uppercase mb-1 md:mb-3 lg:mb-4 tracking-wide group-hover:text-red transition-colors duration-300">
                  {guide.title}
                </h3>
                
                <p className="font-inter font-light text-[14px] md:text-[15px] lg:text-[18px] leading-relaxed text-[#737373] max-w-[280px]">
                  {guide.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
          <div className="flex justify-center md:justify-end w-full mt-8 md:mt-10 pr-3">
            <Link
              to="/guide"
              className="flex items-center justify-center md:justify-start gap-3 font-inter font-bold text-[20px] md:text-[24px] text-red hover:text-white transition-colors uppercase w-[245px] h-[50px]"
            >
              Voir les guides
              <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

        </div>
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