import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_GUIDES } from '@constants/appConstant';

export default function GuidesSection() {
  return (
    <section className="relative w-full h-[745px] bg-[#111111] flex justify-center overflow-hidden border-b border-gray-dark">

      <div className="absolute inset-0 bg-pattern-overlay z-0" />

      <div className="relative z-10 w-full max-w-[1382px] h-full flex flex-col justify-center items-center">

        <div className="w-full flex flex-col max-w-[1240px]">

          <h2 className="font-bebas text-white text-[56px] uppercase mb-10 tracking-wider ml-3">
            UN COUP DE POING ?
          </h2>

          <div className="flex justify-center gap-12 xl:gap-[48px] w-full">
            {HOME_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="w-[385px] h-[381px] bg-gray-dark rounded-2xl flex flex-col items-center pt-[40px] hover:border-red/30 border border-transparent transition-all cursor-pointer group shadow-xl"
              >
                <img
                  src={guide.img}
                  alt={guide.title}
                  className="w-[185px] h-[148px] object-contain mb-[32px] group-hover:scale-105 transition-transform"
                />
                <h3 className="font-inter font-bold text-[29px] text-white leading-none uppercase mb-[12px]">
                  {guide.title}
                </h3>
                <p className="font-inter font-extralight text-[24px] leading-none text-gray text-center w-[242px]">
                  {guide.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end w-full mt-10 pr-3">
            <Link
              to="/guide"
              className="flex items-center gap-3 font-inter font-bold text-[24px] text-red hover:text-white transition-colors uppercase w-[245px] h-[50px]"
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
    </section>
  );
}