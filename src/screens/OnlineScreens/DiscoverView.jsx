import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, toggleFavorite } from '@store/product/productSlice';
import { fetchMyFavorites } from '@store/user/userSlice';
import { createConversation } from '@store/conversation/conversationSlice';
import { useAuthContext } from '@contexts/AuthContext';
import { openCTAModal } from '@store/auth/authSlice';
import PageLoader from '@components/Loader/PageLoader';
import SwipeCard from '@components/Discover/SwipeCard';
import { Heart, X, Banknote } from 'lucide-react';

export default function DiscoverView() {
    // On récupère le hook
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useAuthContext();

    // On déclare nos States et Store
    const { items, loading } = useSelector(state => state.products);
    const { myFavorites } = useSelector(state => state.user);
    const [stack, setStack] = useState([]);

    useEffect(() => {
        // Fetch des dataaaaa
        dispatch(fetchProducts());
        if (userId) {
            dispatch(fetchMyFavorites());
        }
    }, [dispatch, userId]);

    useEffect(() => {
        // Filtrage des articles pour ne pas montrer ceux déjà en favoris
        if (items && items.length > 0) {
            if (userId && myFavorites) {
                const favoriteIds = new Set(myFavorites.map(fav => fav.id));
                const unswipedProducts = items.filter(p => !favoriteIds.has(p.id));

                // Inversion du tab
                setStack([...unswipedProducts].reverse());
            } else {
                // Si non connecté, on affiche tout
                setStack([...items].reverse());
            }
        }
    }, [items, myFavorites, userId]);

    // Méthode de gestion du balayage (swipe)
    const handleSwipe = async (direction, product) => {
        if (direction === 'right') {
            if (!userId) {
                dispatch(openCTAModal());
                return;
            }
            dispatch(toggleFavorite(product.id));
            setStack(prev => prev.filter(p => p.id !== product.id));
        } else if (direction === 'up') {
            if (!userId) {
                dispatch(openCTAModal());
                return;
            }
            
            // Redirection vers la messagerie avec la modale d'offre ouverte en mode brouillon
            navigate('/messages', {
                state: {
                    pendingProduct: product,
                    openOfferModal: true
                }
            });
            
            // On le retire quand même de la pile pour ne plus le revoir
            setStack(prev => prev.filter(p => p.id !== product.id));
        } else {
            // On retire la carte qui vient d'être balayée à gauche
            setStack(prev => prev.filter(p => p.id !== product.id));
        }
    };

    if (loading && stack.length === 0) return <PageLoader />;

    return (
        <div className="relative w-full h-full min-h-[calc(100vh-80px)] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden pt-6 pb-24">

            <div className="relative w-full max-w-[350px] sm:max-w-md h-[520px] sm:h-[550px] md:h-[600px] flex justify-center items-center">
                {stack.length > 0 ? (
                    stack.map((product, index) => (
                        <SwipeCard
                            key={product.id}
                            product={product}
                            isTop={index === stack.length - 1}
                            onSwipe={(dir) => handleSwipe(dir, product)}
                        />
                    ))
                ) : (
                    <div className="text-white text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                            <span className="text-3xl">🔥</span>
                        </div>
                        <h2 className="font-bebas text-3xl md:text-4xl tracking-widest text-[#ccc]">Plus d'articles</h2>
                        <p className="font-inter text-[#888] text-sm px-8 max-w-sm">Tu as vu tous les articles disponibles pour le moment. Reviens plus tard pour de nouvelles découvertes !</p>
                    </div>
                )}
            </div>

            {/* Boutons d'action rapides */}
            <div className={`flex gap-8 mt-10 z-10 transition-opacity duration-300 ${stack.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button
                    onClick={() => stack.length > 0 && handleSwipe('left', stack[stack.length - 1])}
                    className="w-16 h-16 bg-[#1a1a1a] border border-[#222] rounded-full flex items-center justify-center text-red hover:bg-red/10 hover:border-red transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                    <X size={32} strokeWidth={2.5} />
                </button>
                <button
                    onClick={() => stack.length > 0 && handleSwipe('up', stack[stack.length - 1])}
                    className="w-16 h-16 bg-[#1a1a1a] border border-[#222] rounded-full flex items-center justify-center text-amber-500 hover:bg-amber-500/10 hover:border-amber-500 transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                    <Banknote size={28} strokeWidth={2.5} />
                </button>
                <button
                    onClick={() => stack.length > 0 && handleSwipe('right', stack[stack.length - 1])}
                    className="w-16 h-16 bg-[#1a1a1a] border border-[#222] rounded-full flex items-center justify-center text-green-500 hover:bg-green-500/10 hover:border-green-500 transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                    <Heart size={28} fill="currentColor" strokeWidth={0} />
                </button>
            </div>
        </div>
    );
}
