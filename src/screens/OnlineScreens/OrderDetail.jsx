import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '@contexts/AuthContext';
import { fetchOrderById } from '@store/order/orderSlice';
import { fetchReviewByOrder } from '@store/review/reviewSlice';
import { downloadFacture } from '@store/facture/factureSlice';

import HeaderView from '@components/UI/HeaderView';
import OrderSummary from '@components/Order/OrderSummary';
import OrderAddresses from '@components/Order/OrderAddresses';
import OrderItems from '@components/Order/OrderItems';
import ModaleReview from '@components/Review/ModaleReview';
import ReviewCard from '@components/Review/ReviewCard';

export default function OrderDetail() {

    // On récupère les hooks
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userId } = useAuthContext();

    // On déclare nos states
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    // On récupère nos datas Redux
    const { current: order, loading: orderLoading } = useSelector((state) => state.orders);
    const { currentOrderReview, loading: reviewsLoading } = useSelector((state) => state.reviews);
    const { downloading: isDownloadingInvoice } = useSelector((state) => state.facture);

    // On gère le cycle de vie
    useEffect(() => {
        if (id) {
            dispatch(fetchOrderById(id));
            dispatch(fetchReviewByOrder(id));
        }
    }, [id, dispatch]);

    // Méthode pour télécharger la facture PDF via Redux
    const handleDownloadInvoice = () => {
        if (order) {
            dispatch(downloadFacture({ orderId: order.id, reference: order.reference }));
        }
    };

    // Affichage conditionnel (Loading / Error)
    if (orderLoading || reviewsLoading || !order) {
        return (
            <main className="w-full min-h-screen bg-black flex flex-col items-center justify-center">
                <span className="text-[#737373] font-inter tracking-widest uppercase text-sm">Chargement...</span>
            </main>
        );
    }

    // On déclare nos constantes pour le confort
    const canReview = ['PAID', 'SHIPPED', 'DELIVERED'].includes(order.status) && order.buyerId === userId;
    const mainProductTitle = order?.items?.[0]?.product?.title || 'Article de la commande';
    const enrichedReview = currentOrderReview ? {
        ...currentOrderReview,
        order: currentOrderReview.order || order
    } : null;

    return (
        <main className="w-full min-h-screen bg-black flex flex-col pb-20">
            <HeaderView
                title="DÉTAILS DE LA COMMANDE"
                subtitle={`Commande n° ${order.reference}`}
                heightClass="h-[120px] md:h-[200px]"
            />

            <section className="w-full max-w-[1200px] mx-auto px-6 py-10 flex flex-col gap-8">

                <OrderSummary order={order} />

                {['PAID', 'SHIPPED', 'DELIVERED'].includes(order.status) && (
                    <div className="flex justify-center md:justify-end -mt-4 w-full">
                        <button
                            onClick={handleDownloadInvoice}
                            disabled={isDownloadingInvoice}
                            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-[#1a1a1a] border border-[#2f2f2f] text-white hover:text-red rounded-xl font-inter text-sm font-medium tracking-wide transition-all duration-200 ${isDownloadingInvoice ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            {isDownloadingInvoice ? 'Téléchargement...' : 'Télécharger la facture (PDF)'}
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <OrderItems items={order.items} />
                    </div>

                    <div className="lg:col-span-1">
                        <OrderAddresses
                            shippingAddress={order.shippingAddress}
                            billingAddress={order.billingAddress}
                        />
                    </div>
                </div>

                {canReview && (
                    <div className="mt-8 pt-8 border-t border-[#2f2f2f] flex flex-col gap-6">
                        <h3 className="font-bebas text-white text-3xl tracking-wider uppercase">
                            Votre avis sur cette commande
                        </h3>

                        {enrichedReview ? (
                            <div className="flex flex-col gap-4">
                                {/* On passe la review enrichie au composant */}
                                <ReviewCard review={enrichedReview} />
                                <button
                                    onClick={() => setIsReviewModalOpen(true)}
                                    className="w-fit mt-2 text-sm font-inter font-medium text-red hover:text-white transition-colors uppercase tracking-widest border border-red hover:border-white px-6 py-2 rounded-full"
                                >
                                    Supprimer mon avis
                                </button>
                            </div>
                        ) : (
                            <div className="bg-[#111111] border border-[#2f2f2f] rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4">
                                <span className="font-inter text-[#737373] text-sm max-w-md">
                                    Partagez votre expérience avec le vendeur et aidez la communauté à faire les bons choix.
                                </span>
                                <button
                                    onClick={() => setIsReviewModalOpen(true)}
                                    className="px-8 py-3 bg-red text-white font-bebas text-xl tracking-widest rounded hover:bg-red/90 transition-colors uppercase mt-2"
                                >
                                    Écrire un avis
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <ModaleReview
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                orderId={order.id}
                productTitle={mainProductTitle}
                existingReview={enrichedReview}
            />
        </main>
    );
}