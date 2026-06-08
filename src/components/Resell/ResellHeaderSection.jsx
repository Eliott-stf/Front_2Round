import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight } from 'lucide-react';

export default function ResellHeaderSection() {
    const navigate = useNavigate();

    return (
        <section className="relative w-full h-[600px] bg-[#111111] overflow-hidden border-b border-[#2f2f2f]">
            <div className="absolute inset-0 bg-pattern-overlay z-0" />

            <div className="max-w-[1728px] mx-auto px-10 md:px-[150px] relative z-10 flex flex-col h-full pt-[200px] pb-[50px]">

                <div className="flex-1 flex flex-col justify-between">

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white hover:text-red transition-colors shrink-0"
                        >
                            <ChevronLeft size={72} strokeWidth={2.5} />
                        </button>

                        <div className="max-w-[1000px]">
                            <h1 className="font-bebas text-white text-[96px] leading-[100%] uppercase">
                                TON MATÉRIEL PEUT <br />
                                <span className="text-red">ENCORE</span> FAIRE DES ROUNDS
                            </h1>
                        </div>
                    </div>

                    <div className="flex justify-end w-full">
                        <a
                            href="#lecon-technique"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('lecon-technique')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center justify-center gap-3 bg-red hover:bg-[#cc0000] text-white font-inter font-bold text-[22px] rounded-full w-[350px] h-[64px] transition-colors shrink-0"
                        >
                            COMMENCER À VENDRE <ArrowRight className="w-6 h-6 stroke-[2.5px]" />
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}