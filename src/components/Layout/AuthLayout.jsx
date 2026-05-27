import React from 'react';

export const AuthLayout = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 1. Couche de base : Image statique */}
      <img
        src="/images/bg_guy.png"
        alt="Boxing Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Couche dynamique : Vidéo de fumée (fond noir requis) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 pointer-events-none"
      >
        <source src="/videos/smoke2.mp4" type="video/mp4" />
      </video>

      {/* 3. Couche d'assombrissement : Optimisation du contraste pour l'interface */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* 4. Couche interactive : Conteneur des formulaires */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 bg-black/60 border border-neutral-800 rounded-2xl backdrop-blur-sm shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};