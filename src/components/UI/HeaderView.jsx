import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderView({ title, subtitle, heightClass = "h-[250px]" }) {
  const navigate = useNavigate();

  return (
    <div className={`relative w-full flex items-center bg-[#111111] overflow-hidden ${heightClass}`}>
      {/* Couche d'arrière-plan texturée */}
      <div className="absolute inset-0 bg-pattern-overlay z-0" />

      {/* Conteneur du contenu aligné */}
      <div className="relative z-10 flex items-center px-8 md:px-12 lg:px-24 w-full max-w-[1440px] mx-auto gap-6">
        
        {/* Bouton de retour isolé */}
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-red transition-colors flex-shrink-0"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Données textuelles */}
        <div className="flex flex-col mt-2">
          <h1 className="text-white text-5xl md:text-6xl font-bebas uppercase tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-400 text-sm md:text-base font-inter mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
      </div>
    </div>
  );
}