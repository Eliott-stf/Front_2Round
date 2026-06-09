import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import MessageNode from './MessageNode';
import OfferNode from './OfferNode';
import { useAuthContext } from '@contexts/AuthContext';
import api from '@lib/api';
import { API_ROOT } from '@constants/apiConstant';
import { Package, ShoppingBag, Check } from 'lucide-react';

export default function MessageList({ activeId, conversation, initialMessages = [], initialOffers = [], onPaymentRequest, onCreatePackRequest }) {
    // On récupère l'id du AuthContext
    const { userId } = useAuthContext();

    // Cache local pour les informations des produits du lot
    const [loadedProducts, setLoadedProducts] = useState({});

    // On déclare nos states locaux et store
    const { items: storeMessagesMap } = useSelector((state) => state.messages);
    const storeMessages = storeMessagesMap[activeId] || [];

    const timeline = useMemo(() => {
        // Fusion des messages initiaux et de ceux stockés dans Redux
        const combinedMessages = [...initialMessages, ...storeMessages];

        // Suppression des doublons basés sur l'ID
        const uniqueMessages = Array.from(new Map(combinedMessages.map(msg => [msg.id, msg])).values())
            .map(msg => ({ ...msg, type: 'message' }));

        // Formatage des offres pour la timeline
        const formattedOffers = initialOffers.map(offer => ({ ...offer, type: 'offer' }));

        // Tri chronologique de l'ensemble
        return [...uniqueMessages, ...formattedOffers].sort((a, b) =>
            new Date(a.createdAt) - new Date(b.createdAt)
        );
    }, [initialMessages, storeMessages, initialOffers]);

    // Référence pour le scroll automatique
    const bottomRef = useRef(null);

    // UseEffect pour scroller vers le bas lors de chaque mise à jour de la timeline
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [timeline]);

    // Charger les détails des produits mentionnés dans les tags techniques
    useEffect(() => {
        const idsToFetch = [];
        timeline.forEach(item => {
            if (item.type === 'message') {
                const reqMatch = item.content?.match(/\[REQUEST_LOT:([^\|\]]+)(?:\|price:(\d+(?:\.\d+)?))?\]/);
                if (reqMatch && reqMatch[1]) {
                    const ids = reqMatch[1].split(',').map(id => id.trim()).filter(Boolean);
                    ids.forEach(id => {
                        if (!loadedProducts[id] && !idsToFetch.includes(id)) {
                            idsToFetch.push(id);
                        }
                    });
                }
                const createdMatch = item.content?.match(/\[PACK_CREATED:([^\]]+)\]/);
                if (createdMatch && createdMatch[1]) {
                    const id = createdMatch[1].trim();
                    if (!loadedProducts[id] && !idsToFetch.includes(id)) {
                        idsToFetch.push(id);
                    }
                }
            }
        });

        if (idsToFetch.length > 0) {
            idsToFetch.forEach(async (id) => {
                try {
                    const res = await api.url(`/products/${id}`).get().json();
                    const product = res?.data || res;
                    setLoadedProducts(prev => ({
                        ...prev,
                        [id]: product
                    }));
                } catch (err) {
                    console.error(`Erreur lors du chargement du produit ${id} :`, err);
                }
            });
        }
    }, [timeline, loadedProducts]);

    const isBuyer = conversation.buyerId === userId;

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
            {timeline.map((item) => {
                if (item.type === 'message') {
                    // 1. Détection de la demande de lot
                    const isRequestLot = item.content?.includes('[REQUEST_LOT:');
                    // 2. Détection de la création de lot
                    const isPackCreated = item.content?.includes('[PACK_CREATED:');

                    if (isRequestLot) {
                        const match = item.content.match(/\[REQUEST_LOT:([^\|\]]+)(?:\|price:(\d+(?:\.\d+)?))?\]/);
                        const ids = match ? match[1].split(',').map(id => id.trim()).filter(Boolean) : [];
                        const suggestedPrice = match ? match[2] : null;
                        const cleanText = item.content.replace(/\[REQUEST_LOT:[^\]]+\]/, '').trim();
                        
                        const resolvedProducts = ids.map(id => loadedProducts[id]).filter(Boolean);
                        const totalPrice = resolvedProducts.reduce((sum, p) => sum + p.price, 0);

                        return (
                            <div key={`lot-req-${item.id}`} className="flex flex-col gap-2 my-2">
                                {cleanText && (
                                    <MessageNode
                                        isSelf={item.senderId === userId}
                                        data={{ text: cleanText, createdAt: item.createdAt }}
                                    />
                                )}
                                <div className="max-w-[85%] sm:max-w-[60%] mx-auto bg-[#111] border border-red/30 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
                                    <div className="flex items-center gap-2 border-b border-[#222] pb-3">
                                        <Package className="w-5 h-5 text-red" />
                                        <span className="font-bebas text-lg tracking-wider text-white uppercase animate-fade-in">
                                            Demande de lot personnalisé
                                        </span>
                                    </div>

                                    {/* Liste des articles */}
                                    <div className="flex flex-col gap-3">
                                        {ids.map(id => {
                                            const prod = loadedProducts[id];
                                            if (!prod) {
                                                return (
                                                    <div key={id} className="h-12 bg-[#222]/50 animate-pulse rounded-lg flex items-center px-3">
                                                        <span className="text-[10px] text-gray-light font-inter">Chargement de l'article...</span>
                                                    </div>
                                                );
                                            }
                                            const imagePath = prod.medias?.[0]?.path;
                                            const imageUrl = imagePath
                                                ? (imagePath.startsWith('http') ? imagePath : `${API_ROOT}${imagePath}`)
                                                : '/images/placeholder.jpg';

                                            return (
                                                <div key={id} className="flex items-center gap-3 bg-black/40 p-2 border border-[#222] rounded-lg transition-all hover:scale-[1.01]">
                                                    <img src={imageUrl} alt={prod.title} className="w-10 h-10 object-cover rounded bg-[#111]" />
                                                    <div className="flex-1 min-w-0 flex flex-col">
                                                        <span className="text-white text-xs font-bold truncate uppercase">{prod.title}</span>
                                                        <span className="text-[10px] text-gray-light uppercase font-inter">{prod.size} - {prod.condition}</span>
                                                    </div>
                                                    <span className="text-white text-xs font-semibold">{prod.price}€</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Prix total de base et offre suggérée */}
                                    <div className="flex flex-col gap-1.5 border-t border-[#222] pt-3 font-inter">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray">Valeur combinée :</span>
                                            <span className="text-white font-bold text-sm">{totalPrice}€</span>
                                        </div>
                                        {suggestedPrice && (
                                            <div className="flex justify-between items-center text-xs mt-1">
                                                <span className="text-gray">Prix suggéré par l'acheteur :</span>
                                                <span className="text-red font-bold text-sm bg-red/10 border border-red/20 px-2 py-0.5 rounded-lg">
                                                    {suggestedPrice}€
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    {!isBuyer ? (
                                        <button
                                            onClick={() => onCreatePackRequest(resolvedProducts, suggestedPrice)}
                                            disabled={resolvedProducts.length < ids.length}
                                            className="w-full py-2.5 bg-red hover:bg-[#cc0000] text-white font-bebas text-md tracking-widest rounded-xl transition-all uppercase cursor-pointer text-center disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            Créer le lot personnalisé
                                        </button>
                                    ) : (
                                        <div className="bg-[#1a0f0f] border border-red/20 rounded-xl px-3 py-2 text-center">
                                            <span className="text-[11px] text-red font-inter">
                                                En attente de proposition de prix par le vendeur.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    if (isPackCreated) {
                        const match = item.content.match(/\[PACK_CREATED:([^\]]+)\]/);
                        const packId = match ? match[1].trim() : null;
                        const cleanText = item.content.replace(/\[PACK_CREATED:[^\]]+\]/, '').trim();
                        
                        const packProduct = loadedProducts[packId];

                        return (
                            <div key={`lot-created-${item.id}`} className="flex flex-col gap-2 my-2">
                                {cleanText && (
                                    <MessageNode
                                        isSelf={item.senderId === userId}
                                        data={{ text: cleanText, createdAt: item.createdAt }}
                                    />
                                )}
                                {packProduct ? (
                                    <div className="max-w-[80%] sm:max-w-[50%] mx-auto bg-black border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-xl animate-fade-in">
                                        <div className="flex items-center gap-2 border-b border-[#222] pb-3">
                                            <ShoppingBag className="w-5 h-5 text-red" />
                                            <div className="flex-1 flex flex-col">
                                                <span className="font-bebas text-lg tracking-wider text-white uppercase leading-none">
                                                    Lot personnalisé prêt
                                                </span>
                                                <span className="text-[10px] text-gray mt-0.5 font-inter truncate uppercase">
                                                    {packProduct.title}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray text-xs font-inter">Prix convenu :</span>
                                            <span className="text-white font-bebas text-2xl tracking-wide">{packProduct.price}€</span>
                                        </div>

                                        {packProduct.status === 'ARCHIVED' ? (
                                            <div className="bg-gray-dark/50 border border-[#222] rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-gray text-xs font-inter uppercase tracking-wider">
                                                <Check className="w-4 h-4 text-green-500" />
                                                Vendu
                                            </div>
                                        ) : isBuyer ? (
                                            <button
                                                onClick={() => onPaymentRequest(packProduct.price, packProduct)}
                                                className="w-full py-2.5 bg-white hover:bg-white/90 text-black font-bebas text-md tracking-widest rounded-xl transition-all uppercase cursor-pointer text-center font-bold"
                                            >
                                                Acheter le lot
                                            </button>
                                        ) : (
                                            <div className="bg-gray-dark border border-[#333] rounded-xl py-2 px-3 text-center">
                                                <span className="text-[11px] text-gray-light font-inter">
                                                    En attente de paiement par l'acheteur
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="max-w-[80%] sm:max-w-[50%] mx-auto bg-[#111] border border-[#222] rounded-2xl p-5 animate-pulse flex flex-col gap-3">
                                        <div className="h-5 bg-[#222] w-1/3 rounded"></div>
                                        <div className="h-8 bg-[#222] rounded mt-2"></div>
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <MessageNode
                            key={`msg-${item.id}`}
                            isSelf={item.senderId === userId}
                            data={{
                                text: item.content,
                                createdAt: item.createdAt
                            }}
                        />
                    );
                }

                if (item.type === 'offer') {
                    const isSelf = conversation.buyerId === userId;
                    return (
                        <OfferNode
                            key={`offer-${item.id}`}
                            offer={item}
                            isSelf={isSelf}
                            originalPrice={conversation.product?.price}
                            onPaymentRequest={() => onPaymentRequest(item.proposedPrice)}
                        />
                    );
                }

                return null;
            })}
            <div ref={bottomRef} />
        </div>
    );
}