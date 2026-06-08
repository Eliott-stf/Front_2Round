import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RESELL_TUTO } from '@constants/appConstant';


export default function TutoSection() {
    const { TITLE, STEPS, CONCLUSION, BUTTON } = RESELL_TUTO;

    return (
        <section id="lecon-technique" className="w-full bg-black py-24 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:pl-[60px] lg:pr-[132px] flex flex-col relative">

                <h2 className="font-bebas text-white text-[64px] leading-none uppercase z-10">
                    {TITLE}
                </h2>

                <div className="relative w-full min-h-[1700px] z-10">

                    {/* Étape 1 */}
                    <div className="absolute top-0 left-0 flex items-start gap-2">
                        <img
                            src="/images/TutoSection/garde.png"
                            alt={STEPS.STEP_1.TITLE}
                            className="w-[350px] h-[528px] object-contain drop-shadow-[0px_10px_10px_rgba(0,0,0,0.5)]"
                        />
                        <div className="flex flex-col max-w-[392px] mt-[350px] ml-[-80px] z-20">
                            <h3 className="font-bebas text-white hover:text-red transition-colors duration-300 text-[46px] md:text-[55px] leading-none uppercase mb-2">
                                {STEPS.STEP_1.TITLE}
                            </h3>
                            <p className="font-inter font-bold text-white text-[30px] leading-none mb-4">
                                {STEPS.STEP_1.SUBTITLE}
                            </p>
                            <p className="font-inter font-extralight text-[#a3a3a3] text-[25px] leading-none">
                                {STEPS.STEP_1.DESC}
                            </p>
                        </div>
                    </div>

                    {/* Étape 2 */}
                    <div className="absolute top-[350px] -right-[260px] flex items-center gap-4">
                        <img
                            src="/images/TutoSection/gauche.png"
                            alt={STEPS.STEP_2.TITLE}
                            className="w-[600px] h-[528px] object-contain drop-shadow-[0px_10px_10px_rgba(0,0,0,0.5)] z-10 relative"
                        />
                        <div className="flex flex-col max-w-[392px] mt-[200px] ml-[-80px] -translate-x-[300px] z-20">
                            <h3 className="font-bebas text-white hover:text-red transition-colors duration-300 text-[46px] md:text-[55px] leading-none uppercase mb-2">
                                {STEPS.STEP_2.TITLE}
                            </h3>
                            <p className="font-inter font-bold text-white text-[30px] leading-none mb-4">
                                {STEPS.STEP_2.SUBTITLE}
                            </p>
                            <p className="font-inter font-extralight text-[#a3a3a3] text-[25px] leading-none">
                                {STEPS.STEP_2.DESC}
                            </p>
                        </div>
                    </div>

                    {/* Étape 3 */}
                    <div className="absolute top-[650px] left-[-130px] flex items-center">
                        <div className="flex flex-col max-w-[392px] mt-[240px] mr-[-100px] -translate-x-[-200px] text-right z-20">
                            <h3 className="font-bebas text-white hover:text-red transition-colors duration-300 text-[46px] md:text-[55px] leading-none uppercase mb-2">
                                {STEPS.STEP_3.TITLE}
                            </h3>
                            <p className="font-inter font-bold text-white text-[30px] leading-none mb-4">
                                {STEPS.STEP_3.SUBTITLE}
                            </p>
                            <p className="font-inter font-extralight text-[#a3a3a3] text-[25px] leading-none">
                                {STEPS.STEP_3.DESC}
                            </p>
                        </div>
                        <img
                            src="/images/TutoSection/droite.png"
                            alt={STEPS.STEP_3.TITLE}
                            className="w-[750px] h-[528px] object-contain drop-shadow-[0px_10px_10px_rgba(0,0,0,0.5)] z-10 relative"
                        />
                    </div>

                    {/* Étape 4 */}
                    <div className="absolute top-[950px] -right-[100px] flex items-center">
                        <div className="flex flex-col max-w-[550px] mt-[300px] mr-[-100px] text-right z-20">
                            <h3 className="font-bebas text-white hover:text-red transition-colors duration-300 text-[46px] md:text-[55px] leading-none uppercase mb-2">
                                {STEPS.STEP_4.TITLE}
                            </h3>
                            <p className="font-inter font-bold text-white text-[30px] leading-none mb-4">
                                {STEPS.STEP_4.SUBTITLE}
                            </p>
                            <p className="font-inter font-extralight text-[#a3a3a3] text-[25px] leading-none">
                                {STEPS.STEP_4.DESC}
                            </p>
                        </div>
                        <img
                            src="/images/TutoSection/upercut.png"
                            alt={STEPS.STEP_4.TITLE}
                            className="w-[550px] h-[540px] object-contain drop-shadow-[0px_10px_10px_rgba(0,0,0,0.5)] z-10 relative -scale-x-100"
                        />
                    </div>

                </div>

                {/* Conclusion et Bouton Final */}
                <div className="flex flex-col items-end w-full relative z-10 mt-[-50px] gap-8">
                    <h2 className="font-bebas text-white text-[64px] mb-[30px] leading-none uppercase text-right max-w-[920px]">
                        {CONCLUSION}
                    </h2>

                    <Link
                        to="/vendre/new"
                        className="flex items-center justify-center gap-3 bg-red hover:bg-[#cc0000] text-white font-inter font-bold text-[22px] rounded-full w-[350px] h-[64px] transition-colors shrink-0"
                    >
                        {BUTTON} <ArrowRight className="w-6 h-6 stroke-[2.5px]" />
                    </Link>
                </div>

            </div>
        </section>
    );
}