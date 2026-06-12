import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { closeCTAModal } from '@store/auth/authSlice';

export default function ModaleCTA() {
    // on récupère nos hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // on récupère le state pour savoir si la modale doit s'afficher
    const { showCTAModal } = useSelector((state) => state.auth);

    // Vérif
    if (!showCTAModal) return null;

    // Méthode pour fermer
    const handleClose = () => {
        dispatch(closeCTAModal());
    };

    // Naviguer et fermer
    const handleNavigate = (path) => {
        dispatch(closeCTAModal());
        navigate(path);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div 
                className="relative w-full max-w-lg bg-[#111111] rounded-2xl p-10 flex flex-col items-center text-center overflow-hidden animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Bouton Fermer */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    aria-label="Fermer la modale"
                >
                    <X size={24} />
                </button>

                {/* Custom Dashed Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <rect width="100%" height="100%" fill="none" stroke="#444" strokeWidth="4" strokeDasharray="24 12" rx="16" />
                </svg>

                {/* Content */}
                <div className="relative z-20 flex flex-col items-center w-full">
                    <h2 className="font-bebas text-white text-3xl md:text-5xl uppercase tracking-wider mb-4 drop-shadow-md">
                        Montez sur le ring
                    </h2>
                    
                    <p className="font-inter text-gray-400 max-w-sm mx-auto mb-10 text-sm md:text-base leading-relaxed">
                        Vous devez être connecté pour effectuer cette action. Rejoignez-nous pour continuer !
                    </p>

                    <div className="flex flex-col w-full gap-4 max-w-sm">
                        <button
                            onClick={() => handleNavigate('/login')}
                            className="w-full py-4 bg-red text-white font-bebas text-xl tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-gray-light hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] uppercase"
                        >
                            Se connecter
                        </button>
                        
                        <div className="mt-4 text-center">
                            <p className="text-sm font-inter text-gray-400">
                                Premier combat ?{' '}
                                <button 
                                    onClick={() => handleNavigate('/register')} 
                                    className="text-white font-semibold hover:text-gray-light hover:underline underline-offset-4 transition-all duration-200"
                                >
                                    S'inscrire
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Backdrop clic pour fermer */}
            <div className="absolute inset-0 z-0" onClick={handleClose} />
        </div>
    );
}
