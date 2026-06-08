import React from 'react';
import { FEATURES } from '@constants/appConstant';

export default function InfoSection() {
    return (
        <section className="w-full bg-black py-24 border-b border-[#2f2f2f]">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    
                    {/* Séparateurs verticaux avec dégradé (Visibles uniquement sur Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-[33.33%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#2f2f2f] to-transparent -translate-y-1/2"></div>
                    <div className="hidden md:block absolute top-1/2 left-[66.66%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#2f2f2f] to-transparent -translate-y-1/2"></div>

                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div 
                                key={index} 
                                className="flex flex-col items-center text-center group transition-transform duration-300 hover:-translate-y-2 z-10"
                            >
                                {/* Conteneur d'icône avec effet de lueur au survol */}
                                <div className="w-20 h-20 rounded-full border border-[#2f2f2f] bg-black flex items-center justify-center mb-8 group-hover:border-red group-hover:shadow-[0_0_30px_rgba(204,0,0,0.15)] transition-all duration-300">
                                    <Icon className="w-8 h-8 text-white group-hover:text-red transition-colors duration-300" strokeWidth={1.5} />
                                </div>
                                
                                <h3 className="font-bebas text-white text-3xl tracking-widest uppercase mb-4">
                                    {feature.title}
                                </h3>
                                
                                <p className="font-inter text-[#737373] font-light text-lg leading-relaxed max-w-[280px]">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}