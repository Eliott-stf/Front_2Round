import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@contexts/AuthContext';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminCredentialsToast = () => {
    const { userId } = useAuthContext();
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const [hasShownOnce, setHasShownOnce] = useState(false);

    // 1. Gérer l'apparition (initiale puis cyclique)
    useEffect(() => {
        if (userId) {
            setIsVisible(false);
            return;
        }

        if (!hasShownOnce) {
            // Première apparition après 3 secondes
            const initialTimeout = setTimeout(() => {
                setIsVisible(true);
                setHasShownOnce(true);
            }, 3000);
            return () => clearTimeout(initialTimeout);
        } else if (!isVisible) {
            // S'il est caché (fermé par la croix ou temps écoulé), on le remontre après 30s
            const showTimeout = setTimeout(() => {
                setIsVisible(true);
            }, 30000);
            return () => clearTimeout(showTimeout);
        }
    }, [userId, isVisible, hasShownOnce]);

    // 2. Gérer la disparition automatique à la fin de la barre de progression (30s)
    useEffect(() => {
        if (isVisible) {
            const hideTimeout = setTimeout(() => {
                setIsVisible(false);
            }, 30000);
            return () => clearTimeout(hideTimeout);
        }
    }, [isVisible]);

    const handleNavigate = () => {
        setIsVisible(false);
        navigate('/login', { state: { prefillRecruiter: true } });
    };

    // Ne rien rendre si l'utilisateur est connecté
    if (userId) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 w-[90%] sm:w-80 bg-[#111111] rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-gray-800"
                >
                    {/* Bouton Fermer */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer z-30"
                        aria-label="Fermer"
                    >
                        <X size={20} />
                    </button>

                    {/* Custom Dashed Border */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        <rect width="100%" height="100%" fill="none" stroke="#444" strokeWidth="4" strokeDasharray="24 12" rx="16" />
                    </svg>

                    <div className="relative z-20 flex flex-col items-center w-full mt-2">
                        <h2 className="font-bebas text-white text-3xl uppercase tracking-wider mb-2 drop-shadow-md">
                            Recruteur ?
                        </h2>
                        
                        <p className="font-inter text-gray-400 text-sm leading-relaxed mb-6">
                            Rentrez sur le ring et testez l'application de l'intérieur !
                        </p>

                        <button
                            onClick={handleNavigate}
                            className="w-full py-3 bg-red text-white font-bebas text-xl tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-gray-light hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] uppercase cursor-pointer z-30"
                        >
                            Se connecter
                        </button>
                    </div>

                    {/* Barre de temps */}
                    <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 30, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-red z-30"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AdminCredentialsToast;
