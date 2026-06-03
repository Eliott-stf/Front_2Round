import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tag, Check, X } from 'lucide-react';
import { acceptOffer, rejectOffer } from '@store/offer/offerSlice';
import { fetchConversationById } from '@store/conversation/conversationSlice';

export default function OfferNode({ offer, isSelf, originalPrice, onPaymentRequest }) {

    //on récup le hook
    const dispatch = useDispatch();

    //On déclare nos states
    const [isUpdating, setIsUpdating] = useState(false);

    //On décalre nos flag pour verifier le status
    const isPending = offer.status === 'PENDING';
    const isAccepted = offer.status === 'ACCEPTED';
    const isDeclined = offer.status === 'DECLINED';

    //méthode pour accepter l'offre
    const handleAccept = async () => {
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            //On appelle l'action pour accepter l'offre en base de données
            await dispatch(acceptOffer(offer.id)).unwrap();
            //On refresh la conversation pour mettre à jour l'affichage
            await dispatch(fetchConversationById(offer.conversationId));
        } catch (error) {
            console.error("Erreur lors de l'acceptation :", error);
        } finally {
            setIsUpdating(false);
        }
    };

    //méthode pour refuser l'offre
    const handleReject = async () => {
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            //On appelle l'action pour refuser l'offre en base de données
            await dispatch(rejectOffer(offer.id)).unwrap();
            //On refresh la conversation pour mettre à jour l'affichage
            await dispatch(fetchConversationById(offer.conversationId));
        } catch (error) {
            console.error("Erreur lors du refus :", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={`flex w-full ${isSelf ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className="max-w-[320px] w-full bg-gray-dark border border-gray-mid rounded-xl p-4">

                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-red/20 flex items-center justify-center">
                        <Tag className="w-4 h-4 text-red" />
                    </div>
                    <span className="font-bebas text-base text-white tracking-wide">
                        {isSelf ? "VOTRE OFFRE" : "OFFRE REÇUE"}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center py-3 mb-3 bg-black/40 rounded-lg">
                    <span className="text-gray font-bebas text-lg tracking-wider line-through decoration-red mb-1">
                        {originalPrice} €
                    </span>
                    <div className="flex items-baseline">
                        <span className="font-bebas text-4xl text-white tracking-wider">
                            {offer.proposedPrice}
                        </span>
                        <span className="font-bebas text-2xl text-gray ml-1">€</span>
                    </div>
                </div>

                {isPending && isSelf && (
                    <p className="text-xs text-gray text-center font-body">
                        En attente.....
                    </p>
                )}

                {isPending && !isSelf && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleAccept}
                            disabled={isUpdating}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red text-white rounded-lg font-bebas text-sm tracking-wider hover:bg-red/90 transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                            <Check className="w-4 h-4" />
                            ACCEPTER
                        </button>
                        <button
                            onClick={handleReject}
                            disabled={isUpdating}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-mid text-white rounded-lg font-bebas text-sm tracking-wider hover:bg-gray-mid/30 transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                            <X className="w-4 h-4" />
                            REFUSER
                        </button>
                    </div>
                )}

                {isAccepted && (
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center justify-center gap-2 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-emerald-400 font-body font-medium">Offre acceptée</span>
                        </div>
                        {isSelf && (
                            <button
                                onClick={onPaymentRequest}
                                className="w-full flex items-center justify-center py-2.5 bg-red text-white rounded-lg font-bebas text-lg tracking-wider hover:bg-red/90 transition-colors mt-1"
                            >
                                PAYER {offer.proposedPrice} €
                            </button>
                        )}
                    </div>
                )}

                {isDeclined && (
                    <div className="flex items-center justify-center gap-2 py-2 bg-red/10 border border-red/20 rounded-lg mt-2">
                        <X className="w-4 h-4 text-red" />
                        <span className="text-sm text-red font-body font-medium">Offre refusée</span>
                    </div>
                )}

            </div>
        </div>
    );
}