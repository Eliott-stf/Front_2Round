import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, deleteReview, clearReviewError } from '@store/review/reviewSlice';
import { X, Star, Trash2 } from 'lucide-react';

export default function ModaleReview({ isOpen, onClose, orderId, productTitle, existingReview }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.reviews || { loading: false, error: null });

    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (isOpen) {
            dispatch(clearReviewError());
        }
        return () => {
            dispatch(clearReviewError());
        };
    }, [isOpen, dispatch]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return;

        try {
            await dispatch(createReview({
                orderId,
                data: { rating, comment }
            })).unwrap();
            onClose();
            setRating(0);
            setComment('');
        } catch (err) {
            console.error('Erreur lors de la soumission de l\'avis', err);
        }
    };

    const handleDelete = async () => {
        if (!existingReview?.id) return;
        try {
            await dispatch(deleteReview(existingReview.id)).unwrap();
            onClose(); // Ferme la modale pour rafraîchir l'interface parente
        } catch (err) {
            console.error('Erreur lors de la suppression de l\'avis', err);
        }
    };

    // VUE : Avis déjà existant
    if (existingReview) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="w-full max-w-lg bg-[#111111] border border-[#2f2f2f] rounded-xl flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center p-6 border-b border-[#2f2f2f]">
                        <h3 className="font-bebas text-white text-2xl tracking-wider">Votre avis</h3>
                        <button onClick={onClose} className="text-[#737373] hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-2 text-center">
                            <span className="font-inter text-[#737373] text-sm">Article concerné :</span>
                            <span className="font-bebas text-white text-xl tracking-wide truncate">{productTitle}</span>
                        </div>

                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-10 h-10 ${
                                        star <= existingReview.rating
                                            ? 'fill-red text-red'
                                            : 'fill-transparent text-[#2f2f2f]'
                                    }`}
                                />
                            ))}
                        </div>

                        {existingReview.comment && (
                            <div className="w-full bg-black border border-[#2f2f2f] rounded-lg p-4 font-inter text-sm text-white">
                                {existingReview.comment}
                            </div>
                        )}

                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 border border-[#2f2f2f] text-white font-bebas text-xl tracking-widest rounded-lg hover:bg-white hover:text-black transition-colors uppercase"
                            >
                                Fermer
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="flex-1 py-4 bg-red/10 border border-red/30 text-red font-bebas text-xl tracking-widest rounded-lg hover:bg-red hover:text-white disabled:opacity-50 transition-colors uppercase flex justify-center items-center gap-2"
                            >
                                <Trash2 className="w-5 h-5" />
                                {loading ? 'Suppression...' : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // VUE : Création d'un nouvel avis
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#111111] border border-[#2f2f2f] rounded-xl flex flex-col overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-[#2f2f2f]">
                    <h3 className="font-bebas text-white text-2xl tracking-wider">Évaluer la commande</h3>
                    <button onClick={onClose} className="text-[#737373] hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <span className="font-inter text-[#737373] text-sm">Article concerné :</span>
                        <span className="font-bebas text-white text-xl tracking-wide truncate">{productTitle}</span>
                    </div>

                    {error && (
                        <div className="text-red font-inter text-sm text-center bg-red/10 border border-red/20 py-3 px-4 md:px-6 rounded-lg break-words">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(star)}
                                className="outline-none"
                            >
                                <Star
                                    className={`w-10 h-10 transition-colors ${
                                        star <= (hoveredRating || rating)
                                            ? 'fill-red text-red'
                                            : 'fill-transparent text-[#2f2f2f]'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <textarea
                            value={comment}
                            onChange={(e) => {
                                if (e.target.value.length <= 500) setComment(e.target.value);
                            }}
                            placeholder="Partagez votre expérience avec cet article et ce vendeur..."
                            className="w-full h-32 bg-black border border-[#2f2f2f] rounded-lg p-4 font-inter text-sm text-white placeholder:text-[#737373] focus:outline-none focus:border-red transition-colors resize-none pb-8"
                        />
                        <div className="absolute bottom-3 right-4 text-xs font-inter text-[#737373]">
                            {comment.length}/500
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={rating === 0 || loading}
                        className="w-full py-4 bg-red text-white font-bebas text-xl tracking-widest rounded-lg hover:bg-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors uppercase"
                    >
                        {loading ? 'Envoi en cours...' : 'Publier l\'avis'}
                    </button>
                </form>
            </div>
        </div>
    );
}