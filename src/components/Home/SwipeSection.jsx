import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SwipeSection() {
    const controls = useAnimation();
    const [stamp, setStamp] = useState(null); // 'LIKE', 'PASS', 'OFFER', or null

    useEffect(() => {
        let isMounted = true;

        const runAnimation = async () => {
            while (isMounted) {
                // PHASE 1: LIKE (Right)
                setStamp(null);
                await controls.start({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, transition: { duration: 0 } });
                await new Promise(resolve => setTimeout(resolve, 800));

                if (!isMounted) break;
                // Swing to 10 degrees
                setTimeout(() => { if (isMounted) setStamp('LIKE'); }, 600); // Show stamp mid-way
                await controls.start({ x: 60, rotate: 10, transition: { duration: 1.2, ease: "easeInOut" } });

                if (!isMounted) break;
                // Slight return to 7 degrees
                await controls.start({ x: 45, rotate: 7, transition: { duration: 0.6, ease: "easeInOut" } });

                if (!isMounted) break;
                // Return to 10 degrees
                await controls.start({ x: 60, rotate: 10, transition: { duration: 0.6, ease: "easeInOut" } });

                if (!isMounted) break;
                // Return to 0
                setStamp(null);
                await controls.start({ x: 0, rotate: 0, transition: { duration: 1.2, ease: "easeInOut" } });

                // PHASE 2: PASS (Left)
                await new Promise(resolve => setTimeout(resolve, 800));

                if (!isMounted) break;
                // Swing to -10 degrees
                setTimeout(() => { if (isMounted) setStamp('PASS'); }, 600); // Show stamp mid-way
                await controls.start({ x: -60, rotate: -10, transition: { duration: 1.2, ease: "easeInOut" } });

                if (!isMounted) break;
                // Slight return to -7 degrees
                await controls.start({ x: -45, rotate: -7, transition: { duration: 0.6, ease: "easeInOut" } });

                if (!isMounted) break;
                // Return to -10 degrees
                await controls.start({ x: -60, rotate: -10, transition: { duration: 0.6, ease: "easeInOut" } });

                if (!isMounted) break;
                // Return to 0
                setStamp(null);
                await controls.start({ x: 0, rotate: 0, transition: { duration: 1.2, ease: "easeInOut" } });

                // PHASE 3: OFFER (Up)
                await new Promise(resolve => setTimeout(resolve, 800));

                if (!isMounted) break;
                setTimeout(() => { if (isMounted) setStamp('OFFER'); }, 600);

                // Swipe UP smoothly, no wiggle
                await controls.start({
                    y: -120,
                    scale: 0.9,
                    opacity: 1,
                    rotateX: 10,
                    transition: { duration: 1.8, ease: "easeInOut" }
                });

                if (!isMounted) break;
                // Return to 0
                setStamp(null);
                await controls.start({
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    transition: { duration: 1.8, ease: "easeInOut" }
                });
            }
        };

        runAnimation();

        return () => { isMounted = false; };
    }, [controls]);

    return (
        <section className="w-full bg-black py-20 lg:py-32 px-6 border-b border-gray-dark overflow-hidden relative">
            <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

                {/* Animation Area */}
                <div className="flex-1 w-full flex justify-center relative min-h-[450px] items-center order-2 lg:order-1" style={{ perspective: 1000 }}>

                    {/* Background "Next" Card (Static) */}
                    <div className="absolute w-[260px] md:w-[320px] h-[380px] md:h-[460px] bg-[#111] border border-white/5 rounded-3xl flex items-center justify-center scale-95 opacity-40 z-0 shadow-xl">
                        <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center">
                            <span className="text-white/20 font-bebas text-3xl">?</span>
                        </div>
                    </div>

                    {/* Animated Swiping Card */}
                    <motion.div
                        animate={controls}
                        className="relative w-[260px] md:w-[320px] h-[380px] md:h-[460px] bg-black border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 flex flex-col overflow-hidden origin-bottom"
                    >
                        {/* Image Placeholder */}
                        <div className="w-full h-[65%] bg-zinc-900 relative">
                            {/* Stamps */}
                            {stamp === 'LIKE' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 2, rotate: -25 }}
                                    animate={{ opacity: 1, scale: 1, rotate: -25 }}
                                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[5px] border-[#00ff88] text-[#00ff88] px-5 py-2 rounded-xl font-bebas text-5xl tracking-widest uppercase z-20 shadow-[0_0_20px_rgba(0,255,136,0.2)] bg-black/40 backdrop-blur-sm pointer-events-none"
                                >
                                    LIKE
                                </motion.div>
                            )}
                            {stamp === 'PASS' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 2, rotate: 25 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 25 }}
                                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[5px] border-[#ff3333] text-[#ff3333] px-5 py-2 rounded-xl font-bebas text-5xl tracking-widest uppercase z-20 shadow-[0_0_20px_rgba(255,51,51,0.2)] bg-black/40 backdrop-blur-sm pointer-events-none"
                                >
                                    K.O
                                </motion.div>
                            )}
                            {stamp === 'OFFER' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 2, rotate: -10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: -10 }}
                                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[5px] border-[#f59e0b] text-[#f59e0b] px-5 py-2 rounded-xl font-bebas text-5xl tracking-widest uppercase z-20 shadow-[0_0_20px_rgba(245,158,11,0.2)] bg-black/40 backdrop-blur-sm pointer-events-none"
                                >
                                    OFFRE
                                </motion.div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/images/SwipeCard/1.png"
                                    alt="Product Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Card Info */}
                        <div className="flex-1 p-6 flex flex-col justify-between relative z-20">
                            <div>
                                <h3 className="font-bebas text-white text-3xl tracking-wide uppercase mb-1">Gants de boxe Pro</h3>
                                <p className="font-inter text-gray-400 text-sm">Très bon état • 14 oz</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="font-bebas text-white text-3xl">45 €</span>
                                <span className="font-bebas text-gray-500 text-xl line-through mb-1">80 €</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Wording */}
                <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6 order-1 lg:order-2">
                    <p className="text-red font-bold uppercase tracking-[0.3em] text-sm md:text-base">Nouveau mode</p>
                    <h2 className="font-bebas text-white text-6xl md:text-8xl uppercase leading-[0.9]">
                        DÉCOUVRE.<br />SWIPE.<br />MATCH.
                    </h2>
                    <p className="font-inter text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg mt-4 mb-4">
                        Marre de chercher ton équipement dans les cordes ? Laisse-toi guider par notre mode <span className="text-white font-bold">Discover</span>.
                    </p>
                    <p className="font-inter text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mb-8">
                        Crochet à <span className="text-[#00ff88] font-bold">droite</span> pour ajouter l'équipement à tes favoris, Esquive à <span className="text-[#ff3333] font-bold">gauche</span> pour passer, et Uppercut vers le <span className="text-[#f59e0b] font-bold">haut</span> pour proposer une offre. <br /> Ton prochain coup de cœur n'attend plus que toi.
                    </p>
                    <Link
                        to="/discover"
                        className="group flex items-center gap-4 px-8 py-4 bg-white text-black font-bebas text-2xl uppercase tracking-widest hover:bg-red hover:text-white transition-colors"
                    >
                        Lancer le DISCOVER
                        <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}
