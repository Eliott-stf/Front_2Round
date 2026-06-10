import { Logo } from '@components/UI/Logo';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';
import { motion } from 'framer-motion';

export default function HeroSection() {
    const navigate = useNavigate();
    const { userId } = useAuthContext();

    const handleProfileClick = () => {
        if (userId) {
            navigate('/profil');
        } else {
            navigate('/login');
        }
    };

    // Variantes d'animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 100 } }
    };

    return (
        <section className="relative w-full h-[100vh] min-h-[700px] max-h-[1000px] bg-black overflow-hidden flex flex-col justify-center border-none">
            
            {/* Background Image */}
            <img
                src="/images/bg_guy.png"
                alt="Boxing Background"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-50 scale-105"
            />

            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-60 pointer-events-none"
            >
                <source src="/videos/smoke.mp4" type="video/mp4" />
            </video>

            {/* Red Tint Filter for aggressive look */}
            <div className="absolute inset-0 bg-red-900/20 mix-blend-color pointer-events-none z-0" />
            
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

            {/* Gradient pour une transition douce vers la section suivante */}
            <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 lg:h-[400px] bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent pointer-events-none z-0" />

            {/* Main Content */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-[136px] flex flex-col lg:flex-row justify-between items-center h-full pb-20 pt-16 gap-12"
            >
                {/* Left Side: Slogan */}
                <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    {/* Slogan */}
                    <h1 className="font-bebas text-white text-[56px] md:text-[80px] lg:text-[110px] leading-[0.85] uppercase tracking-wide drop-shadow-2xl">
                        VOTRE PROCHAIN <span className="text-red">ROUND</span><br />
                        COMMENCE ICI
                    </h1>
                    <p className="font-inter text-gray-300 text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
                        L'équipement premium pour ceux qui ne reculent jamais. Découvre la sélection, vends ton ancien matériel, et retourne sur le ring.
                    </p>
                </motion.div>

                {/* Right Side: Logo & Buttons */}
                <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-8 md:gap-12">
                    {/* Logo */}
                    <div className="w-48 md:w-64 lg:w-[488px] flex justify-center lg:justify-end">
                        <Logo className="w-full h-auto drop-shadow-2xl" fill="white" />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-5 w-full max-w-[320px] lg:max-w-[488px]">
                        <button
                            onClick={handleProfileClick}
                            className="group relative w-full h-[60px] md:h-[70px] lg:h-[81px] flex items-center justify-center bg-red text-white font-bebas text-2xl lg:text-3xl tracking-widest uppercase transition-all duration-300 overflow-hidden hover:-translate-y-1 shadow-2xl"
                        >
                            {/* Hover fill effect */}
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            <span className="relative z-10">CRÉER MON PROFIL</span>
                        </button>
                        
                        <Link
                            to="/resell"
                            className="group w-full h-[60px] md:h-[70px] lg:h-[81px] flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/20 text-white font-bebas text-2xl lg:text-3xl tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1 shadow-2xl"
                        >
                            COMMENCER À VENDRE
                        </Link>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Navigation Links */}
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 80 }}
                className="absolute bottom-8 left-0 right-0 z-20 w-full"
            >
                <div className="flex justify-center gap-8 md:gap-16 lg:gap-24 w-full">
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
            </motion.div>
        </section>
    );
}