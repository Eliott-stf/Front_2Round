import React from 'react';

export default function CitationSection() {
    return (
        <section className="relative w-full h-[613px] bg-black overflow-hidden border-t border-[#1a1a1a]">
            {/* Arrière-plan avec opacité gérée pour le contraste */}
            <img
                src="/images/Ali.png"
                alt="Muhammad Ali"
                className="absolute inset-0 w-full h-full object-cover opacity-80 z-0 object-top"
            />

            <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full px-6 lg:px-[110px]">

                {/* Bloc de citation aligné à gauche */}
                <div className="pt-[100px] max-w-[568px]">
                    <h2 className="font-inter font-bold text-[54px] leading-[71px] uppercase">
                        <span className="text-white">"J'AI DÉTESTÉ CHAQUE MINUTE D'ENTRAÎNEMENT, <br /></span>
                        <span className="text-red">MAIS JE N'AI JAMAIS ABANDONNÉ."</span>
                    </h2>
                </div>

                {/* Auteur aligné en bas à droite */}
                <div className="absolute bottom-[65px] right-6 lg:right-[110px]">
                    <p className="font-bebas text-white text-[54px] leading-none uppercase tracking-wider drop-shadow-lg">
                        MUHAMMAD ALI
                    </p>
                </div>

            </div>
        </section>
    );
}