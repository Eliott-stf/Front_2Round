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
        <section className="relative w-full h-237.5 bg-black overflow-hidden flex flex-col border-b border-gray-dark">
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

            <div className="relative z-10 w-full max-w-432 mx-auto h-full">
                <div className="absolute top-42.5 left-[945px]">
                    <Logo className="w-87.5 md:w-122 h-auto drop-shadow-2xl" fill="white" />
                </div>

                <div className="absolute top-122.5 left-235 w-87.5 md:w-122">
                    <button
                        onClick={handleProfileClick}
                        className="w-full h-15 md:h-[81px] border-2 border-white bg-black/10 backdrop-blur-sm text-white font-bebas text-xl md:text-3xl tracking-widest hover:bg-white hover:text-black transition-all uppercase"
                    >
                        CRÉER MON PROFIL
                    </button>
                </div>

                <div className="absolute top-147.5 left-236 w-87.5 md:w-122">
                    <Link
                        to="/resell"
                        className="flex items-center justify-center w-full h-15 md:h-[81px] border-2 border-white bg-black/10 backdrop-blur-sm text-white font-bebas text-xl md:text-3xl tracking-widest hover:bg-white hover:text-black transition-all uppercase"
                    >
                        COMMENCER À VENDRE
                    </Link>
                </div>

                <div className="absolute bottom-7.5 flex justify-center gap-16 md:gap-30 w-full left-0">
                    <Link
                        to="/guide"
                        className="flex items-center justify-center w-[145px] h-12 font-inter font-extralight text-2xl leading-none tracking-normal text-[#a3a3a3] hover:text-white uppercase whitespace-nowrap transition-colors"
                    >
                        GUIDE
                    </Link>
                    <Link
                        to="/catalogue"
                        className="flex items-center justify-center w-[145px] h-12 font-inter font-extralight text-2xl leading-none tracking-normal text-[#a3a3a3] hover:text-white uppercase whitespace-nowrap transition-colors"
                    >
                        CATALOGUE
                    </Link>
                    <Link
                        to="/resell"
                        className="flex items-center justify-center w-[145px] h-12 font-inter font-extralight text-2xl leading-none tracking-normal text-[#a3a3a3] hover:text-white uppercase whitespace-nowrap transition-colors"
                    >
                        REVENTE
                    </Link>
                </div>
            </div>
        </section>
    );
}