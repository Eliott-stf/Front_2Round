import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight } from 'lucide-react';

export default function ResellHeaderSection() {
    const navigate = useNavigate();

    return (
        <section className="relative w-full h-auto lg:h-[450px] bg-[#111111] overflow-hidden border-b border-[#2f2f2f]">
            <div className="absolute inset-0 bg-pattern-overlay z-0" />

            <div className="max-w-[1728px] mx-auto px-6 md:px-12 lg:px-24 xl:px-[150px] relative z-10 flex flex-col justify-center h-full py-6 md:py-12 lg:py-0 lg:pt-[100px] lg:pb-[50px]">

                <div className="flex flex-col w-full gap-4 md:gap-8">

                    <div className="flex items-center gap-4 md:gap-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white hover:text-red transition-colors shrink-0 cursor-pointer"
                        >
                            <ChevronLeft className="w-10 h-10 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px]" strokeWidth={2.5} />
                        </button>

                        <div className="max-w-[1000px]">
                            <h1 className="font-bebas text-white text-[32px] sm:text-[48px] md:text-[68px] lg:text-[80px] leading-[100%] uppercase">
                                TON MATÉRIEL PEUT <br className="hidden sm:inline" />
                                <span className="text-red">ENCORE</span> FAIRE DES ROUNDS
                            </h1>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-start md:pl-[88px] lg:pl-[96px] w-full shrink-0">
                        <a
                            href="#lecon-technique"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('lecon-technique')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center justify-center gap-2 bg-red hover:bg-[#cc0000] text-white font-inter font-bold text-[12px] sm:text-[15px] md:text-[20px] lg:text-[22px] rounded-full w-[190px] sm:w-[240px] md:w-[320px] lg:w-[350px] h-[44px] sm:h-[50px] md:h-[58px] lg:h-[64px] transition-colors shrink-0"
                        >
                            COMMENCER À VENDRE <ArrowRight className="w-3.5 h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6 stroke-[2.5px]" />
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}