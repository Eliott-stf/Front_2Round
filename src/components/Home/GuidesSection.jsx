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
    <section className="relative w-full py-8 lg:py-12 bg-[#111111] flex justify-center items-center overflow-hidden border-b border-[#2f2f2f]">

      {/* Background global de la section */}
      <div className="absolute inset-0 bg-pattern-overlay z-0" />

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col justify-center items-center px-4 md:px-6">

        <div className="w-full flex flex-col">

          {/* Titre de la section */}
          <h2 className="font-bebas text-white text-[32px] md:text-[40px] lg:text-[56px] uppercase mb-6 md:mb-8 tracking-wider">
            UN COUP DE POING ?
          </h2>

          {/* Nouvelle structure de grille pour les cartes (Style "ResourcesSection") */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#2f2f2f] w-full">
            {HOME_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => {
                  if (guide.id === 1) setActiveModal('taille');
                  else if (guide.id === 2) setActiveModal('equipement');
                  else if (guide.id === 3) setActiveModal('boxe');
                }}
                className="group relative h-[150px] md:h-auto md:min-h-[350px] overflow-hidden text-left border-b md:border-b-0 md:border-r border-[#2f2f2f] last:border-b-0 md:last:border-r-0 p-5 md:p-6 flex items-end cursor-pointer"
              >
                {/* Image d'arrière-plan de la carte */}
                <img 
                  src={guide.img} 
                  alt={guide.title} 
                  className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale group-hover:scale-105 group-hover:opacity-55 transition-all duration-500" 
                />
                
                {/* Overlays pour assurer le contraste et l'effet visuel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:via-black/50" />
                
                {/* Contenu textuel */}
                <div className="relative z-10 w-full">
                  <span className="text-red font-inter font-bold uppercase tracking-[0.2em] md:tracking-[0.26em] text-[10px] md:text-xs block mb-1 md:mb-0">
                    Ouvrir le guide
                  </span>
                  <h3 className="font-bebas text-white text-[28px] md:text-[40px] lg:text-[50px] leading-[1] md:leading-[0.9] mt-1 md:mt-3 uppercase">
                    {guide.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        
          {/* Bouton de redirection */}
          <div className="flex justify-center md:justify-end w-full mt-8 md:mt-10">
            <Link
              to="/guide"
              className="flex items-center justify-center md:justify-start gap-3 font-inter font-bold text-[20px] md:text-[24px] text-red hover:text-white transition-colors uppercase h-[50px]"
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