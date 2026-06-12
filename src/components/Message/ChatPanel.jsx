import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationById } from '@store/conversation/conversationSlice';
import { markMessagesAsRead } from '@store/message/messageSlice';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ModaleOffer from './ModaleOffer';
import ModaleReport from '@components/Report/ModaleReport';

import { useAuthContext } from '@contexts/AuthContext';
import ModalePayment from '@components/Product/ModalePayment';
import ModaleCreatePack from '@components/Profil/ModaleCreatePack';

export default function ChatPanel({ activeId, pendingProduct, initialOfferModalState, onBack, onConversationCreated }) {
    // On récupère les hooks
    const dispatch = useDispatch();
    const { userId } = useAuthContext();

    // On déclare nos states locaux et store
    const { items: conversations, currentConversation, loading } = useSelector((state) => state.conversations);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentProduct, setPaymentProduct] = useState(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    // States pour la création de lot virtuel
    const [isCreatePackOpen, setIsCreatePackOpen] = useState(false);
    const [createPackProducts, setCreatePackProducts] = useState([]);
    const [suggestedLotPrice, setSuggestedLotPrice] = useState(null);

    const hasOpenedInitialModal = React.useRef(false);

    // Ouverture conditionnelle de la modale d'offre transmise par le routeur
    useEffect(() => {
        if (initialOfferModalState && !hasOpenedInitialModal.current) {
            if (activeId && currentConversation && currentConversation.id === activeId) {
                setIsOfferModalOpen(true);
                hasOpenedInitialModal.current = true;
            } else if (!activeId && pendingProduct) {
                setIsOfferModalOpen(true);
                hasOpenedInitialModal.current = true;
            }
        }
    }, [initialOfferModalState, currentConversation, activeId, pendingProduct]);

    // Méthode pour charger la conversation et marquer comme lu
    useEffect(() => {
        if (activeId) {
            dispatch(fetchConversationById(activeId));
            dispatch(markMessagesAsRead(activeId));
        }
    }, [activeId, dispatch]);

    // Recherche d'une conversation existante si on arrive avec un pendingProduct
    useEffect(() => {
        if (!activeId && pendingProduct && conversations.length > 0) {
            const existingConv = conversations.find(c => c.productId === pendingProduct.id && (c.buyerId === userId || c.product?.sellerId === userId));
            if (existingConv && onConversationCreated) {
                onConversationCreated(existingConv.id);
            }
        }
    }, [activeId, pendingProduct, conversations, userId, onConversationCreated]);

    if (!activeId && !pendingProduct) {
        return (
            <div className="flex-1 bg-[#000000] flex items-center justify-center">
                <span className="text-gray font-inter">Sélectionnez une conversation</span>
            </div>
        );
    }

    if (activeId && (loading || !currentConversation || currentConversation.id !== activeId)) {
        return (
            <div className="flex-1 bg-[#000000] flex items-center justify-center">
                <span className="text-gray font-inter">Chargement de la discussion...</span>
            </div>
        );
    }

    const conversationToUse = activeId ? currentConversation : {
        id: 'pending',
        productId: pendingProduct?.id,
        product: pendingProduct,
        buyerId: userId,
        buyer: { id: userId },
        messages: [],
        offers: []
    };

    // On déclare nos constantes
    const isBuyer = conversationToUse.buyerId === userId;
    const interlocutor = isBuyer ? conversationToUse.product?.seller : conversationToUse.buyer;

    // Méthode pour ouvrir le paiement avec le prix négocié et une structure compatible avec ModalePayment
    const handleOpenPayment = (offerPrice, customProduct = null) => {
        const rawProduct = customProduct || conversationToUse.product;

        const productToPay = {
            ...rawProduct,
            price: offerPrice,
            media: rawProduct?.medias?.length > 0 ? [{ url: rawProduct.medias[0].path }] : []
        };

        setPaymentProduct(productToPay);
        setIsPaymentModalOpen(true);
    };

    // Callback pour ouvrir la modale de création de pack virtuel
    const handleOpenCreatePack = (productsList, suggestedPrice = null) => {
        setCreatePackProducts(productsList);
        setSuggestedLotPrice(suggestedPrice);
        setIsCreatePackOpen(true);
    };

    return (
        <section className="flex-1 flex flex-col bg-[#000000] relative min-w-0 min-h-0">
            <ChatHeader
                conversation={conversationToUse}
                interlocutor={interlocutor}
                isBuyer={isBuyer}
                onOpenOfferModal={() => setIsOfferModalOpen(true)}
                onOpenReportModal={() => setIsReportModalOpen(true)}
                onBack={onBack}
            />
            <MessageList
                activeId={activeId || 'pending'}
                conversation={conversationToUse}
                initialMessages={conversationToUse.messages || []}
                initialOffers={conversationToUse.offers || []}
                onPaymentRequest={handleOpenPayment}
                onCreatePackRequest={handleOpenCreatePack}
            />
            <ChatInput 
                activeId={activeId} 
                pendingProduct={pendingProduct} 
                onConversationCreated={onConversationCreated} 
            />

            <ModaleOffer
                isOpen={isOfferModalOpen}
                onClose={() => setIsOfferModalOpen(false)}
                conversation={conversationToUse}
                pendingProduct={pendingProduct}
                onConversationCreated={onConversationCreated}
            />

            <ModalePayment
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                product={paymentProduct}
            />

            <ModaleReport
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                conversationId={activeId}
            />

            <ModaleCreatePack
                isOpen={isCreatePackOpen}
                onClose={() => setIsCreatePackOpen(false)}
                conversationId={activeId}
                products={createPackProducts}
                initialPrice={suggestedLotPrice}
            />
        </section>
    );
}