import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RESELL_TUTO } from '@constants/appConstant';

export default function TutoSection() {
    const { TITLE, STEPS, CONCLUSION, BUTTON } = RESELL_TUTO;

    return (
        <section id="lecon-technique" className="w-full bg-black py-8 md:py-16 lg:py-24 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:pl-[60px] lg:pr-[132px] flex flex-col relative">

                <h2 className="font-bebas text-white text-[32px] md:text-[52px] lg:text-[64px] leading-none uppercase z-10">
                    {TITLE}
                </h2>

                {/* Conteneur principal qui s'adapte en hauteur */}
                <div className="relative w-full min-h-[750px] md:min-h-[1300px] lg:min-h-[1700px] z-10 mt-6 md:mt-12 lg:mt-0">

                    {/* Étape 1 */}
                    <div className="absolute top-0 left-0 flex items-start gap-1 md:gap-2">
                        <div className="relative shrink-0">
                            <img
                                src="/images/TutoSection/garde.png"
                                alt={STEPS.STEP_1.TITLE}
                                className="w-[130px] md:w-[260px] lg:w-[350px] h-[195px] md:h-[400px] lg:h-[528px] object-contain"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-10 md:h-16 lg:h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-15" />
                        </div>
                        <div className="flex flex-col max-w-[180px] md:max-w-[300px] lg:max-w-[392px] mt-[100px] md:mt-[240px] lg:mt-[350px] ml-[-20px] md:ml-[-50px] lg:ml-[-80px] z-20">
                            <h3 className="font-bebas text-white hover:text-red transition-colors duration-300 text-[24px] md:text-[40px] lg:text-[55px] leading-none uppercase mb-1 md:mb-2">
                                {STEPS.STEP_1.TITLE}
                            </h3>
                            <p className="font-inter font-bold text-white text-[14px] md:text-[22px] lg:text-[30px] leading-none mb-1 md:mb-4">
                                {STEPS.STEP_1.SUBTITLE}
                            </p>
                            <p className="font-inter font-extralight text-[#a3a3a3] text-[11px] md:text-[18px] lg:text-[25px] leading-snug md:leading-none">
                                {STEPS.STEP_1.DESC}
                            </p>
                        </div>
                    </div>

                    {/* Étape 2 */}
                    <div className="absolute top-[160px] md:top-[300px] lg:top-[350px] -right-[80px] md:-right-[180px] lg:-right-[260px] flex items-center gap-2 md:gap-4">
                        <div className="relative z-10 shrink-0">
                            <img
                                src="/images/TutoSection/gauche.png"
                                alt={STEPS.STEP_2.TITLE}
                                className="w-[220px] md:w-[450px] lg:w-[600px] h-[190px] md:h-[400px] lg:h-[528px] object-contain"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-12 md:h-24 lg:h-30 bg-gradient-to-t from-black via-black to-transparent pointer-events-none z-15" />
                        </div>
                        <div className="flex flex-col max-w-[180px] md:max-w-[320px] lg:max-w-[392px] mt-[70px] md:mt-[150px] lg:mt-[200px] ml-[-30px] md:ml-[-60px] lg:ml-[-80px] -translate-x-[110px] md:-translate-x-[220px] lg:-translate-x-[300px] z-20">
                            <h3 className="font-bebas text-white hover:text-red transition-colors duration-300 text-[24px] md:text-[40px] lg:text-[55px] leading-none uppercase mb-1 md:mb-2">
                                {STEPS.STEP_2.TITLE}
                            </h3>
                            <p className="font-inter font-bold text-white text-[14px] md:text-[22px] lg:text-[30px] leading-none mb-1 md:mb-4">
                                {STEPS.STEP_2.SUBTITLE}
                            </p>
                            <p className="font-inter font-extralight text-[#a3a3a3] text-[11px] md:text-[18px] lg:text-[25px] leading-snug md:leading-none">
                                {STEPS.STEP_2.DESC}
                            </p>
                        </div>
                    </div>

                    {/* Étape 3 */}
                    <div className="absolute top-[320px] md:top-[600px] lg:top-[650px] left-[-40px] md:left-[-100px] lg:left-[-130px] flex items-center">
                        <div className="flex flex-col max-w-[180px] md:max-w-[300px] lg:max-w-[392px] mt-[80px] md:mt-[180px] lg:mt-[240px] mr-[-40px] md:mr-[-80px] lg:mr-[-100px] -translate-x-[-60px] md:-translate-x-[-150px] lg:-translate-x-[-200px] text-right z-20">
                            <h3 className="font-bebas text-white hover:text-red transition-colors duration-300 text-[24px] md:text-[40px] lg:text-[55px] leading-none uppercase mb-1 md:mb-2">
                                {STEPS.STEP_3.TITLE}
                            </h3>
                            <p className="font-inter font-bold text-white text-[14px] md:text-[22px] lg:text-[30px] leading-none mb-1 md:mb-4">
                                {STEPS.STEP_3.SUBTITLE}
                            </p>
                            <p className="font-inter font-extralight text-[#a3a3a3] text-[11px] md:text-[18px] lg:text-[25px] leading-snug md:leading-none">
                                {STEPS.STEP_3.DESC}
                            </p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <img
                                src="/images/TutoSection/droite.png"
                                alt={STEPS.STEP_3.TITLE}
                                className="w-[260px] md:w-[550px] lg:w-[750px] h-[190px] md:h-[400px] lg:h-[528px] object-contain"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-6 md:h-12 lg:h-15 bg-gradient-to-t from-black via-black to-transparent pointer-events-none z-15" />
                        </div>
                    </div>

                    {/* Étape 4 */}
                    <div className="absolute top-[500px] md:top-[900px] lg:top-[950px] -right-[20px] md:-right-[80px] lg:-right-[100px] flex items-center">
                        <div className="flex flex-col max-w-[180px] md:max-w-[420px] lg:max-w-[550px] mt-[100px] md:mt-[220px] lg:mt-[300px] mr-[-30px] md:mr-[-80px] lg:mr-[-100px] text-right z-20">
                            <h3 className="font-bebas text-white hover:text-red transition-colors duration-300 text-[24px] md:text-[40px] lg:text-[55px] leading-none uppercase mb-1 md:mb-2">
                                {STEPS.STEP_4.TITLE}
                            </h3>
                            <p className="font-inter font-bold text-white text-[14px] md:text-[22px] lg:text-[30px] leading-none mb-1 md:mb-4">
                                {STEPS.STEP_4.SUBTITLE}
                            </p>
                            <p className="font-inter font-extralight text-[#a3a3a3] text-[11px] md:text-[18px] lg:text-[25px] leading-snug md:leading-none">
                                {STEPS.STEP_4.DESC}
                            </p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <img
                                src="/images/TutoSection/upercut.png"
                                alt={STEPS.STEP_4.TITLE}
                                className="w-[200px] md:w-[420px] lg:w-[550px] h-[190px] md:h-[420px] lg:h-[540px] object-contain -scale-x-100"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-10 md:h-16 lg:h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-15" />
                        </div>
                    </div>

                </div>

                {/* Conclusion et Bouton Final */}
                <div className="flex flex-col items-end w-full relative z-10 mt-6 md:mt-0 lg:mt-[-50px] gap-4 md:gap-6 lg:gap-8 pr-4 lg:pr-0">
                    <h2 className="font-bebas text-white text-[24px] md:text-[48px] lg:text-[64px] mb-2 md:mb-6 lg:mb-[30px] leading-none uppercase text-right max-w-[920px]">
                        {CONCLUSION}
                    </h2>

                    <Link
                        to="/vendre/new"
                        className="flex items-center justify-center gap-2 md:gap-3 bg-red hover:bg-[#cc0000] text-white font-inter font-bold text-[14px] md:text-[20px] lg:text-[22px] rounded-full w-[240px] md:w-[300px] lg:w-[350px] h-[40px] md:h-[56px] lg:h-[64px] transition-colors shrink-0"
                    >
                        {BUTTON} <ArrowRight className="w-4 h-4 md:w-6 md:h-6 stroke-[2.5px]" />
                    </Link>
                </div>

            </div>
        </section>
    );
}