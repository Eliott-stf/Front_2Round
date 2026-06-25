import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ExternalLink } from 'lucide-react';

const ServerWakeupToast = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleDelay = () => setIsVisible(true);
        const handleResolved = () => setIsVisible(false);

        window.addEventListener('server-wakeup-delay', handleDelay);
        window.addEventListener('server-wakeup-resolved', handleResolved);

        return () => {
            window.removeEventListener('server-wakeup-delay', handleDelay);
            window.removeEventListener('server-wakeup-resolved', handleResolved);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[420px] bg-[#111111] rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-gray-800"
                >
                    {/* Custom Dashed Border */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        <rect width="100%" height="100%" fill="none" stroke="#444" strokeWidth="4" strokeDasharray="24 12" rx="16" />
                    </svg>

                    <div className="relative z-20 flex flex-col items-center w-full mt-2">
                        <div className="flex items-center gap-3 mb-2">
                            <Loader2 className="animate-spin text-white" size={24} />
                            <h2 className="font-bebas text-white text-3xl uppercase tracking-wider drop-shadow-md">
                                Le serveur est KO...
                            </h2>
                        </div>

                        <p className="font-inter text-gray-400 text-sm leading-relaxed mb-6">
                            Le serveur mettra environ <span className="text-red font-bold">45 secondes</span> à se relever !
                            <br />Pour patienter, je vous laisse jeter un coup d'œil à mon <span className="text-[#47826e] font-bold">portfolio</span> :
                        </p>

                        <a
                            href="https://eliott-stf.github.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full relative flex items-center justify-between p-1.5 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(149,192,175,0.2)] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(149,192,175,0.4)] overflow-hidden group cursor-pointer"
                            style={{ background: 'radial-gradient(circle at 75% 50%, #95c0af 0%, #47826e 40%, #234239 80%)' }}
                        >
                            <div className="flex items-center gap-3 relative z-10 pl-2 py-1">
                                <img
                                    src="/images/moi/IMG_6668.png"
                                    alt="Eliott"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg"
                                />
                                <span className="font-bebas text-white text-xl tracking-wide uppercase mt-1">
                                    Mon Portfolio
                                </span>
                            </div>
                            <div className="pr-4 text-white/80 group-hover:text-white transition-colors">
                                <ExternalLink size={20} />
                            </div>
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ServerWakeupToast;
