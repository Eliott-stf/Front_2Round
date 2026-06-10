import { Logo } from '@components/UI/Logo';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';

export default function HeroSection() {
    //On récupère les hook 
    const navigate = useNavigate();

    //On récup l'id de l'user du AuthContext
    const { userId } = useAuthContext();

    //méthode pour rediregier si login ou pas 
    const handleProfileClick = () => {
        if (userId) {
            navigate('/profil');
        } else {
            navigate('/login');
        }
    };

    return (
        <section className="relative w-full h-[600px] md:h-[800px] lg:h-[950px] bg-black overflow-hidden flex flex-col border-b border-gray-dark justify-between">
            <img
                src="/images/bg_guy.png"
                alt="Boxing Background"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.73]"
            />

            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-[0.73] pointer-events-none"
            >
                <source src="/videos/smoke2.mp4" type="video/mp4" />
            </video>

            <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 h-full flex flex-col justify-between pt-12 pb-6 md:pt-20 md:pb-8 lg:pt-24 lg:pb-10">
                {/* Spacer or empty div to push content down on desktop */}
                <div className="hidden lg:block lg:h-12" />

                {/* Logo and CTA buttons container */}
                <div className="flex flex-col items-center lg:items-end w-full gap-8 md:gap-12 lg:pr-12 mt-16 md:mt-24 lg:mt-0">
                    {/* Logo */}
                    <div className="w-64 md:w-80 lg:w-[488px] flex justify-center lg:justify-end">
                        <Logo className="w-full h-auto drop-shadow-2xl" fill="white" />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-5 w-64 md:w-80 lg:w-[488px]">
                        <button
                            onClick={handleProfileClick}
                            className="w-full h-14 md:h-[70px] lg:h-[81px] border-2 border-white bg-black/10 backdrop-blur-sm text-white font-bebas text-lg md:text-2xl lg:text-3xl tracking-widest hover:bg-white hover:text-black transition-all uppercase cursor-pointer"
                        >
                            CRÉER MON PROFIL
                        </button>
                        <Link
                            to="/resell"
                            className="flex items-center justify-center w-full h-14 md:h-[70px] lg:h-[81px] border-2 border-white bg-black/10 backdrop-blur-sm text-white font-bebas text-lg md:text-2xl lg:text-3xl tracking-widest hover:bg-white hover:text-black transition-all uppercase"
                        >
                            COMMENCER À VENDRE
                        </Link>
                    </div>
                </div>

                {/* Bottom Navigation Links */}
                <div className="flex justify-center gap-8 md:gap-16 lg:gap-30 w-full mt-auto">
                    <Link
                        to="/guide"
                        className="flex items-center justify-center font-inter font-extralight text-lg md:text-xl lg:text-2xl leading-none tracking-normal text-[#a3a3a3] hover:text-white uppercase whitespace-nowrap transition-colors"
                    >
                        GUIDE
                    </Link>
                    <Link
                        to="/catalogue"
                        className="flex items-center justify-center font-inter font-extralight text-lg md:text-xl lg:text-2xl leading-none tracking-normal text-[#a3a3a3] hover:text-white uppercase whitespace-nowrap transition-colors"
                    >
                        CATALOGUE
                    </Link>
                    <Link
                        to="/resell"
                        className="flex items-center justify-center font-inter font-extralight text-lg md:text-xl lg:text-2xl leading-none tracking-normal text-[#a3a3a3] hover:text-white uppercase whitespace-nowrap transition-colors"
                    >
                        REVENTE
                    </Link>
                </div>
            </div>
        </section>
    );
}