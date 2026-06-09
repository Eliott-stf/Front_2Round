import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TAGS } from '@constants/appConstant';

export default function ResellSection() {

    return (
        <section className="w-full bg-black py-16 md:py-24 px-6 md:px-12 border-t border-[#1a1a1a]">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-12">
                
                <h2 className="font-bebas text-white text-[44px] md:text-[64px] lg:text-[77px] leading-[100%] uppercase tracking-wide">
                    TON MATÉRIEL PEUT <br />
                    <span className="text-red">ENCORE</span> FAIRE DES <br />
                    ROUNDS
                </h2>

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-8 lg:gap-10">
                    <div className="flex flex-wrap gap-3 md:gap-x-6 md:gap-y-4 max-w-[800px]">
                        {TAGS.map((tag, index) => (
                            <div 
                                key={index}
                                className="border border-[#555555] rounded-[50px] px-4 py-2 md:px-6 md:py-2.5 text-white font-inter font-light text-[14px] md:text-[18px] lg:text-[20px] uppercase tracking-wide flex items-center justify-center whitespace-nowrap"
                            >
                                {tag}
                            </div>
                        ))}
                    </div>

                    <Link 
                        to="/resell"
                        className="flex items-center justify-center gap-3 bg-red hover:bg-[#cc0000] text-white font-inter font-bold text-[18px] md:text-[22px] rounded-full w-[240px] md:w-[280px] h-[54px] md:h-[64px] transition-colors shrink-0 mt-4 lg:mt-0"
                    >
                        REVENDRE <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5px]" />
                    </Link>
                </div>

            </div>
        </section>
    );
}