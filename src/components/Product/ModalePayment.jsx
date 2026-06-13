import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyWallet } from "../../store/wallet/walletSlice";
import { createOrder } from "../../store/order/orderSlice";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, CheckCircle, AlertCircle, ChevronLeft } from "lucide-react";
import { API_ROOT } from "@constants/apiConstant";
import { slideVariants } from "@constants/appConstant";
import TopupWrapper from "@components/Checkout/TopupWrapper";
import AddressManager from "@components/Checkout/Address/AddressManager";
import SuccessView from "@components/Checkout/SuccesView";
import ErrorView from "@components/Checkout/ErrorView";
import { createPortal } from "react-dom";

export default function ModalePayment({ isOpen, onClose, product }) {
    // On récupère les hooks
    const dispatch = useDispatch();

    // On récupère l'état global (correction de l'état vers addresses)
    const { current: wallet, loading: isWalletLoading } = useSelector((state) => state.wallets);
    const { selectedShippingId, selectedBillingId } = useSelector((state) => state.addresses);

    // On déclare nos states locaux
    const [processing, setProcessing] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    // Initialisation de la vue sur "summary" pour afficher le panier en premier
    const [view, setView] = useState("summary");
    const [direction, setDirection] = useState(1);
    const [errorMsg, setErrorMsg] = useState(null);
    // State pour mémoriser la méthode choisie avant l'étape de saisie d'adresse
    const [chosenMethod, setChosenMethod] = useState(null);

    // Cycle de vie : Initialisation au montage ou à l'ouverture
    useEffect(() => {
        if (isOpen) {
            dispatch(fetchMyWallet());
            setView("summary");
            setDirection(1);
            setErrorMsg(null);
            setChosenMethod(null);
        }
    }, [isOpen, dispatch]);

    // Sécurité : Blocage du rendu si propriétés manquantes
    if (!isOpen || !product) return null;

    // On déclare nos constantes dérivées
    const walletBalance = wallet?.balance || 0;
    const cartTotal = product.price;
    const missingAmount = cartTotal - walletBalance;
    const canPayWithBalance = missingAmount <= 0;
    const amountToPay = !canPayWithBalance ? missingAmount : cartTotal;

    // Payload de commande dynamique avec les adresses du store
    const orderDto = {
        items: [{ productId: product.id, quantity: 1 }],
        shippingAddressId: selectedShippingId,
        billingAddressId: selectedBillingId,
    };

    const productImageUrl = product?.medias?.[0]?.path
        ? (product.medias[0].path.startsWith('http') ? product.medias[0].path : `${API_ROOT}${product.medias[0].path}`)
        : '/images/placeholder.jpg';

    // Méthode de validation du paiement intégral par portefeuille
    const handlePayWithBalance = async () => {
        try {
            setProcessing(true);
            await dispatch(createOrder(orderDto)).unwrap();
            setProcessing(false);
            setPaymentDone(true);
        } catch (error) {
            console.error('Échec de la transaction interne', error);
            setProcessing(false);
            setErrorMsg("La transaction interne a échoué.");
            setView("error");
        }
    };

    // Sélection de l'option de paiement par solde : bascule vers la gestion d'adresse
    const handleWalletSelect = () => {
        if (!canPayWithBalance) return;
        setChosenMethod("wallet");
        setDirection(1);
        setView("address");
    };

    // Sélection de l'option de paiement par carte : bascule vers la gestion d'adresse
    const handleStripeSelect = () => {
        setChosenMethod("stripe");
        setDirection(1);
        setView("address");
    };

    // Validation de l'adresse et routage final vers le mode de paiement choisi
    const handleAddressNext = () => {
        if (chosenMethod === "wallet") {
            handlePayWithBalance();
        } else {
            setDirection(1);
            setView("stripe");
        }
    };

    // Méthode de retour à la vue résumé
    const handleBackSummary = () => {
        setDirection(-1);
        setView("summary");
    };

    // Méthode de retour à la vue adresse
    const handleBackToAddress = () => {
        setDirection(-1);
        setView("address");
    };

    // Méthode de fermeture et rafraîchissement
    const handleClose = () => {
        if (paymentDone) {
            window.location.reload(); 
        } else {
            setPaymentDone(false);
            setProcessing(false);
            setView("summary");
            setErrorMsg(null);
            onClose();
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleClose}
                    />

                    <motion.div
                        className="relative w-full max-w-md bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden z-10 h-[90vh] sm:h-[550px] max-h-[550px] flex flex-col m-auto"
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.button
                            onClick={handleClose}
                            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-4 h-4 text-white" />
                        </motion.button>

                        <div className="relative w-full flex-1 overflow-hidden">
                            <AnimatePresence custom={direction} mode="wait">
                                {isWalletLoading || processing ? (
                                    <motion.div
                                        key="loading"
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <span className="font-inter text-sm text-gray-500">Traitement sécurisé...</span>
                                    </motion.div>
                                ) : paymentDone ? (
                                    <motion.div
                                        key="success"
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <SuccessView onClose={handleClose} />
                                    </motion.div>
                                ) : view === "error" ? (
                                    <motion.div
                                        key="error"
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <ErrorView onClose={handleClose} errorMessage={errorMsg} />
                                    </motion.div>
                                ) : view === "summary" ? ( // PREMIÈRE ÉTAPE : Résumé du panier
                                    <motion.div
                                        key="summary"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0 h-full overflow-y-auto"
                                    >
                                        <div className="p-4 md:p-6 pb-0 pt-8 md:pt-10">
                                            <h2 className="font-bebas text-3xl text-white tracking-wide mb-4 md:mb-5">
                                                Confirmer l'achat
                                            </h2>

                                            <div className="flex items-center gap-3 md:gap-4 bg-black rounded-xl p-3 md:p-4 border border-[#222222]">
                                                <img
                                                    src={productImageUrl}
                                                    alt={product.title}
                                                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover bg-[#111111]"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-inter text-xs md:text-sm text-white font-medium truncate">
                                                        {product.title}
                                                    </p>
                                                     <p className="font-inter text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">
                                                         {product.condition || "État non spécifié"} · {product.attributes?.map(pa => pa.attribute?.value).filter(Boolean).join(', ') || product.size || "Taille non spécifiée"}
                                                     </p>
                                                </div>
                                                <p className="font-bebas text-2xl md:text-3xl text-white">{cartTotal.toFixed(2)}€</p>
                                            </div>
                                        </div>

                                        <div className="px-4 md:px-6 pt-4 md:pt-5">
                                            <div className="flex items-center justify-between bg-black rounded-xl p-3 md:p-4 border border-[#222222]">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-emerald-500/10">
                                                        <Wallet className="w-4 h-4 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-inter text-[10px] md:text-xs text-gray-500">Mon solde</p>
                                                        <p className="font-bebas text-xl md:text-2xl text-white">{walletBalance.toFixed(2)}€</p>
                                                    </div>
                                                </div>
                                                {canPayWithBalance ? (
                                                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] md:text-xs font-inter font-medium">
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                        Suffisant
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-red text-[10px] md:text-xs font-inter font-medium">
                                                        <AlertCircle className="w-3.5 h-3.5" />
                                                        Insuffisant
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                                            <motion.button
                                                onClick={handleWalletSelect}
                                                disabled={!canPayWithBalance}
                                                className={`w-full flex items-center justify-center gap-3 py-3 md:py-4 rounded-xl font-bebas text-xl tracking-wider transition-all duration-200 ${canPayWithBalance
                                                    ? "border border-[#333333] text-white hover:border-white"
                                                    : "bg-white/5 text-gray-500 cursor-not-allowed border border-[#222222]"
                                                    }`}
                                                whileHover={canPayWithBalance ? { scale: 1.02 } : {}}
                                                whileTap={canPayWithBalance ? { scale: 0.98 } : {}}
                                            >
                                                <Wallet className="w-5 h-5" />
                                                Payer avec mon solde
                                            </motion.button>

                                            <div className="flex items-center gap-3 py-1.5 md:py-2">
                                                <div className="flex-1 h-px bg-[#222222]" />
                                                <span className="font-inter text-[10px] md:text-[11px] text-gray-500 uppercase tracking-widest">ou</span>
                                                <div className="flex-1 h-px bg-[#222222]" />
                                            </div>

                                            <motion.button
                                                onClick={handleStripeSelect}
                                                className="w-full h-12 md:h-14 flex items-center justify-center gap-3 rounded-xl font-inter font-semibold text-xs md:text-[13px] uppercase tracking-[0.15em] transition-all duration-200 bg-white text-black hover:bg-[#e5e5e5]"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <img src="/images/stripe-4.svg" alt="Stripe" className="h-4 md:h-[18px] opacity-90" />
                                                <span>
                                                    {!canPayWithBalance
                                                        ? `Compléter par carte (${missingAmount.toFixed(2)} €)`
                                                        : "Payer la totalité par carte"}
                                                </span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ) : view === "address" ? ( // DEUXIÈME ÉTAPE : Gestion et sélection des adresses
                                    <motion.div
                                        key="address"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0 h-full overflow-hidden"
                                    >
                                        <AddressManager 
                                            onNext={handleAddressNext} 
                                            onBack={handleBackSummary} 
                                        />
                                    </motion.div>
                                ) : ( // TROISIÈME ÉTAPE : Chargement du formulaire bancaire Stripe (si choisi)
                                    <motion.div
                                        key="stripe"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0 h-full overflow-hidden"
                                    >
                                        <TopupWrapper
                                            missingAmount={amountToPay}
                                            orderDto={orderDto}
                                            onBack={handleBackToAddress}
                                            onSuccess={() => setPaymentDone(true)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}