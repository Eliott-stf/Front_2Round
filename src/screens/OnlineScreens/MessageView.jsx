import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchConversations } from '@store/conversation/conversationSlice';
import HeaderView from '@components/UI/HeaderView';
import ConversationSidebar from '@components/Message/ConversationSidebar.jsx';
import ChatPanel from '@components/Message/ChatPanel';


export default function MessageView() {
    // On récupère les hooks
    const dispatch = useDispatch();
    const location = useLocation();

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
        }, 300); // Même durée que la transition CSS (duration-300)
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
            </div>
        </div>
    );
}