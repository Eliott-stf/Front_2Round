import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { X, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createOffer } from "@store/offer/offerSlice";
import { fetchConversationById } from "@store/conversation/conversationSlice";

export default function ModaleOffer({ isOpen, onClose, conversation }) {
    // On récupère les hooks
    const dispatch = useDispatch();

    // On déclare nos states locaux
    const [price, setPrice] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !conversation) return null;

    // On déclare nos constantes
    const originalPrice = conversation.product?.price;
    const productTitle = conversation.product?.title;

    // Méthode de soumission de l'offre
    const handleSubmit = async () => {
        setError(null);
        const proposedPrice = parseFloat(price);

        //vérif rapide
        if (!proposedPrice || proposedPrice <= 0) {
            setError("Veuillez saisir un prix valide.");
            return;
        }

        if (proposedPrice >= originalPrice) {
            setError(`L'offre doit être inférieure au prix initial (${originalPrice} €).`);
            return;
        }

        setIsSubmitting(true);

        try {
            //on appelle notre méthode en back pour créer l'offre avec ses params
            await dispatch(createOffer({
                productId: conversation.productId,
                conversationId: conversation.id,
                proposedPrice: proposedPrice,
            })).unwrap();

            //refresh de la conversation
            await dispatch(fetchConversationById(conversation.id));

            setPrice("");
            onClose();
        } catch (err) {
            setError(err || "Erreur lors de l'envoi de l'offre.");
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
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-dark border border-gray-mid rounded-2xl w-full max-w-sm overflow-y-auto max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-mid">
                            <div className="flex items-center gap-2">
                                <Tag className="w-5 h-5 text-red" />
                                <h2 className="font-bebas text-xl text-white tracking-wider uppercase">
                                    Faire une offre
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

                        {/* Content */}
                        <div className="p-5">
                            {productTitle && (
                                <p className="text-sm text-gray font-body mb-1">
                                    {productTitle}
                                </p>
                            )}
                            {originalPrice && (
                                <p className="text-xs text-gray-light font-body mb-5">
                                    Prix demandé : <span className="text-white font-bebas text-base">{originalPrice} €</span>
                                </p>
                            )}

                            {/* Amount input */}
                            <div className="relative mb-5">
                                <input
                                    type="number"
                                    min="1"
                                    step="0.5"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Votre prix..."
                                    disabled={isSubmitting}
                                    className="w-full bg-black text-white text-center font-bebas text-3xl py-4 rounded-xl border border-gray-mid placeholder:text-gray-mid focus:outline-none focus:border-red/50 transition-colors tracking-wider [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bebas text-2xl text-gray">
                                    €
                                </span>
                            </div>

                            {error && (
                                <p className="text-red font-body text-xs text-center mb-4">{error}</p>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !price || parseFloat(price) <= 0}
                                className="w-full py-3.5 bg-red text-white font-bebas text-lg tracking-widest rounded-xl hover:bg-red/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all uppercase"
                            >
                                {isSubmitting ? "Envoi..." : "Envoyer l'offre"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}