import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeaderView({ title, subtitle, heightClass = "h-[250px]" }) {
  const navigate = useNavigate();

  return (
    <div className={`relative w-full flex items-center bg-[#111111] overflow-hidden py-6 md:py-0 ${heightClass}`}>
      {/* Couche d'arrière-plan texturée */}
      <div className="absolute inset-0 bg-pattern-overlay z-0" />

      {/* Conteneur du contenu aligné */}
      <div className="relative z-10 flex items-center px-4 md:px-12 lg:px-24 w-full max-w-[1440px] mx-auto gap-4 md:gap-6">
        
        {/* Bouton de retour isolé */}
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => navigate(-1)}
          className="text-white hover:text-red transition-colors flex-shrink-0 cursor-pointer"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Données textuelles */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col mt-1"
        >
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bebas uppercase tracking-wide leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-400 text-xs md:text-sm lg:text-base font-inter mt-1 max-w-[90%] md:max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
        
      </div>
    </div>
  );
}