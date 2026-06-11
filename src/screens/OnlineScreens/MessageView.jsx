import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchConversations } from '@store/conversation/conversationSlice';
import { useAuthContext } from '@contexts/AuthContext';
import HeaderView from '@components/UI/HeaderView';
import ConversationSidebar from '@components/Message/ConversationSidebar.jsx';
import ChatPanel from '@components/Message/ChatPanel';


export default function MessageView() {
    // On récupère les hooks
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = useAuthContext();

    // On déclare nos states locaux et store
    const [activeConversationId, setActiveConversationId] = useState(location.state?.activeConversationId || null);
    const [slideActive, setSlideActive] = useState(!!(location.state?.activeConversationId));
    const initialOfferModalState = location.state?.openOfferModal || false;

    // Synchronisation de slideActive quand activeConversationId change
    useEffect(() => {
        if (activeConversationId) {
            setSlideActive(true);
        } else {
            setSlideActive(false);
        }
    }, [activeConversationId]);

    // Retour progressif vers la liste avec animation de glissement avant de vider activeConversationId
    const handleBack = () => {
        setSlideActive(false);
        setTimeout(() => {
            setActiveConversationId(null);
        }, 300);
    };

    // Nettoyage du state de navigation pour éviter la réouverture automatique au rafraîchissement
    useEffect(() => {
        if (location.state?.openOfferModal) {
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Méthode appel API pour charger les conversations
    useEffect(() => {
        dispatch(fetchConversations());
    }, [dispatch]);

    return (
        <div className="flex flex-col w-full bg-[#000000] overflow-hidden h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)]">
            <HeaderView
                title="MESSAGERIE"
                heightClass="h-[80px] md:h-[120px] shrink-0"
            />

            <div className="flex-1 flex flex-col min-h-0 w-full max-w-[1440px] mx-auto border-t border-[#2f2f2f] overflow-hidden relative bg-[#000000]">
                {userId ? (
                    <div className={`message-track-container flex-1 min-h-0 ${slideActive ? 'slide-active' : ''}`}>
                        {/* Volet gauche : Liste des conversations */}
                        <div className="message-panel-left min-h-0">
                            <ConversationSidebar
                                activeId={activeConversationId}
                                setActiveId={setActiveConversationId}
                            />
                        </div>
                        
                        {/* Volet droit : Discussion en cours */}
                        <div className="message-panel-right min-w-0 min-h-0">
                            <ChatPanel
                                activeId={activeConversationId}
                                initialOfferModalState={initialOfferModalState}
                                onBack={handleBack}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 h-full">
                        <div className="relative w-full max-w-2xl bg-[#111111] rounded-2xl p-10 md:p-16 flex flex-col items-center text-center overflow-hidden">
                            
                            {/* Custom Dashed Border with longer dashes */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                                <rect width="100%" height="100%" fill="none" stroke="#444" strokeWidth="4" strokeDasharray="24 12" rx="16" />
                            </svg>

                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-pattern-overlay z-0" />
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <h2 className="font-bebas text-white text-3xl md:text-5xl uppercase tracking-wider mb-4 drop-shadow-md">
                                    Connecte-toi pour échanger
                                </h2>
                                <p className="font-inter text-gray-400 max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed">
                                    Tu dois posséder un compte pour envoyer des messages aux vendeurs et gérer tes offres. <br></br> Rejoins le ring et commence à négocier !
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="bg-red text-white font-bebas text-xl md:text-2xl tracking-widest px-8 py-4 hover:bg-red-600 transition-colors uppercase cursor-pointer w-full sm:w-auto shadow-xl"
                                    >
                                        SE CONNECTER
                                    </button>
                                    <button 
                                        onClick={() => navigate('/profil')}
                                        className="border border-white/20 bg-white/5 text-white font-bebas text-xl md:text-2xl tracking-widest px-8 py-4 hover:bg-white/10 transition-colors uppercase backdrop-blur-sm cursor-pointer w-full sm:w-auto"
                                    >
                                        S'INSCRIRE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}