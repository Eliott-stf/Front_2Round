import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createProduct } from '@store/product/productSlice';
import { sendMessage } from '@store/message/messageSlice';
import { fetchConversationById } from '@store/conversation/conversationSlice';

import { createPortal } from 'react-dom';

export default function ModaleCreatePack({ isOpen, onClose, conversationId, products = [], initialPrice = null }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('Lot personnalisé');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('Lot personnalisé comprenant les articles sélectionnés.');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialiser les valeurs par défaut lorsque les produits changent
    useEffect(() => {
        if (products.length > 0) {
            const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
            setPrice(initialPrice ? initialPrice.toString() : totalPrice.toString());
            
            const titlesList = products.map(p => p.title).join(', ');
            setDescription(`Lot personnalisé comprenant : ${titlesList}.`);
        }
    }, [products, initialPrice]);

    if (!isOpen || products.length === 0) return null;

    const originalTotalPrice = products.reduce((sum, p) => sum + p.price, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const finalPrice = parseFloat(price);
        if (isNaN(finalPrice) || finalPrice <= 0) {
            setError("Veuillez saisir un prix valide.");
            return;
        }

        if (!title.trim()) {
            setError("Veuillez saisir un titre pour le lot.");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Préparer la description avec la balise [PACK:id1,id2,...]
            const productIds = products.map(p => p.id);
            const descriptionWithTag = `${description.trim()} [PACK:${productIds.join(',')}]`;

            // Utiliser la catégorie et l'état du premier produit comme valeurs par défaut obligatoires
            const baseProduct = products[0];

            // 2. Créer le pack virtuel comme un produit classique
            const resultAction = await dispatch(createProduct({
                title: title.trim(),
                description: descriptionWithTag,
                price: finalPrice,
                condition: baseProduct.condition || 'VERY_GOOD',
                categoryId: baseProduct.categoryId,
            })).unwrap();

            const newProduct = resultAction?.data || resultAction;
            
            if (!newProduct || !newProduct.id) {
                throw new Error("Erreur de création de l'article virtuel");
            }

            // 3. Envoyer le message de confirmation avec la balise technique [PACK_CREATED:productId]
            const automatedContent = `J'ai créé votre lot personnalisé. [PACK_CREATED:${newProduct.id}]`;
            await dispatch(sendMessage({
                conversationId,
                content: automatedContent
            })).unwrap();

            // 4. Rafraîchir la conversation pour afficher le nouveau message immédiatement
            await dispatch(fetchConversationById(conversationId));

            onClose();
        } catch (err) {
            console.error("Erreur lors de la création du pack :", err);
            setError(err?.message || err || "Une erreur est survenue lors du traitement.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-black border border-[#222] rounded-2xl w-full max-w-md m-auto mx-4 overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#222]">
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-red" />
                                <h2 className="font-bebas text-xl text-white tracking-wider uppercase">
                                    Créer le lot personnalisé
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray hover:text-white transition-colors"
                                disabled={isSubmitting}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Formulaire défilant */}
                        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 overflow-y-auto">
                            
                            {/* Liste abrégée des articles */}
                            <div className="bg-[#111] border border-[#222] rounded-xl p-3 flex flex-col gap-2">
                                <span className="text-xs text-gray uppercase tracking-widest font-semibold mb-1">
                                    Articles inclus ({products.length})
                                </span>
                                <div className="flex flex-col gap-2 max-h-36 overflow-y-auto custom-scrollbar">
                                    {products.map(p => (
                                        <div key={p.id} className="flex justify-between items-center text-xs font-inter py-1 border-b border-[#222]/50 last:border-0">
                                            <span className="text-white truncate max-w-[70%] font-medium">{p.title}</span>
                                            <span className="text-gray-light">{p.price} €</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center text-xs border-t border-[#333] pt-2 mt-1 font-inter">
                                    <span className="text-gray-light">Valeur totale</span>
                                    <span className="text-white font-bold">{originalTotalPrice} €</span>
                                </div>
                            </div>

                            {/* Titre */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray uppercase tracking-wider font-semibold">Titre de l'annonce</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ex: Lot de gants et bandes"
                                    maxLength={40}
                                    disabled={isSubmitting}
                                    className="w-full bg-[#111] text-white font-inter text-sm px-3 py-2.5 rounded-lg border border-[#222] focus:outline-none focus:border-red/50 transition-colors"
                                />
                            </div>

                            {/* Prix négocié */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray uppercase tracking-wider font-semibold">Prix du lot personnalisé</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1"
                                        step="0.5"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Prix convenu..."
                                        disabled={isSubmitting}
                                        className="w-full bg-[#111] text-white font-bebas text-2xl pl-3 pr-8 py-2.5 rounded-lg border border-[#222] focus:outline-none focus:border-red/50 transition-colors tracking-wider"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bebas text-xl text-gray">
                                        €
                                    </span>
                                </div>
                                <span className="text-[10px] text-gray-light font-inter">
                                    Prix initial combiné : {originalTotalPrice} €
                                </span>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray uppercase tracking-wider font-semibold">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    disabled={isSubmitting}
                                    className="w-full bg-[#111] text-white font-inter text-sm px-3 py-2.5 rounded-lg border border-[#222] focus:outline-none focus:border-red/50 transition-colors resize-none"
                                />
                            </div>

                            {error && (
                                <p className="text-red font-body text-xs text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-2 py-3.5 bg-red hover:bg-[#cc0000] text-white font-bebas text-lg tracking-widest rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all uppercase cursor-pointer"
                            >
                                {isSubmitting ? "Création..." : "Créer le lot & envoyer"}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
