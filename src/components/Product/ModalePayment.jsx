import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyWallet } from "../../store/wallet/walletSlice";
import { createOrder } from "../../store/order/orderSlice";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, CheckCircle, AlertCircle, CreditCard } from "lucide-react";
import { API_ROOT } from "@constants/apiConstant";
import PaymentInfo from "./PaymentInfo";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ModalePayment({ isOpen, onClose, product }) {
  const dispatch = useDispatch();
  const { current: wallet, loading: isWalletLoading } = useSelector((state) => state.wallets);
  
  const [processing, setProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [view, setView] = useState("summary");
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchMyWallet());
      setView("summary");
      setDirection(1);
    }
  }, [isOpen, dispatch]);

  if (!isOpen || !product) return null;

  const walletBalance = wallet?.balance || 0;
  const cartTotal = product.price;
  const missingAmount = cartTotal - walletBalance;
  const canPayWithBalance = missingAmount <= 0;

  const orderDto = {
    items: [{ productId: product.id, quantity: 1 }],
    addressId: "address-mike-1",
  };

  const productImageUrl = product?.media?.[0]?.url
    ? `${API_ROOT}${product.media[0].url}`
    : '/images/placeholder.jpg';

  const handlePayWithBalance = async () => {
    if (!canPayWithBalance) return;
    try {
      setProcessing(true);
      await dispatch(createOrder(orderDto)).unwrap();
      setProcessing(false);
      setPaymentDone(true);
    } catch (error) {
      console.error('Échec de la transaction interne', error);
      setProcessing(false);
    }
  };

  const handleStripeClick = () => {
    setDirection(1);
    setView("stripe");
  };

  const handleBackClick = () => {
    setDirection(-1);
    setView("summary");
  };

  const handleClose = () => {
    if (paymentDone) {
      window.location.href = '/profil/wallet?success=true';
    } else {
      setPaymentDone(false);
      setProcessing(false);
      setView("summary");
      onClose();
    }
  };

  const amountToPay = !canPayWithBalance ? missingAmount : cartTotal;

  return (
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
            className="relative w-full max-w-md bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden z-10"
            style={{ height: "550px" }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 text-white" />
            </motion.button>

            <div className="relative w-full h-full overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                {isWalletLoading ? (
                  <motion.div
                    key="loading"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="font-inter text-sm text-gray-500">Chargement du portefeuille sécurisé...</span>
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
                ) : view === "summary" ? (
                  <motion.div
                    key="summary"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 h-full overflow-y-auto"
                  >
                    <div className="p-6 pb-0 pt-10">
                      <h2 className="font-bebas text-3xl text-white tracking-wide mb-5">
                        Confirmer l'achat
                      </h2>

                      <div className="flex items-center gap-4 bg-black rounded-xl p-4 border border-[#222222]">
                        <img
                          src={productImageUrl}
                          alt={product.title}
                          className="w-16 h-16 rounded-lg object-cover bg-[#111111]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-inter text-sm text-white font-medium truncate">
                            {product.title}
                          </p>
                          <p className="font-inter text-xs text-gray-500 mt-1">
                            {product.condition || "État non spécifié"} · {product.size || "Taille non spécifiée"}
                          </p>
                        </div>
                        <p className="font-bebas text-3xl text-white">{cartTotal.toFixed(2)}€</p>
                      </div>
                    </div>

                    <div className="px-6 pt-5">
                      <div className="flex items-center justify-between bg-black rounded-xl p-4 border border-[#222222]">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10">
                            <Wallet className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <p className="font-inter text-xs text-gray-500">Mon solde</p>
                            <p className="font-bebas text-2xl text-white">{walletBalance.toFixed(2)}€</p>
                          </div>
                        </div>
                        {canPayWithBalance ? (
                          <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-inter font-medium">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Suffisant
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-red text-xs font-inter font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Insuffisant
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <motion.button
                        onClick={handlePayWithBalance}
                        disabled={!canPayWithBalance || processing}
                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bebas text-xl tracking-wider transition-all duration-200 ${
                          canPayWithBalance
                            ? "border border-[#333333] text-white hover:border-white"
                            : "bg-white/5 text-gray-500 cursor-not-allowed border border-[#222222]"
                        }`}
                        whileHover={canPayWithBalance ? { scale: 1.02 } : {}}
                        whileTap={canPayWithBalance ? { scale: 0.98 } : {}}
                      >
                        <Wallet className="w-5 h-5" />
                        {processing ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Traitement...
                          </span>
                        ) : (
                          "Payer avec mon solde"
                        )}
                      </motion.button>

                      <div className="flex items-center gap-3 py-2">
                        <div className="flex-1 h-px bg-[#222222]" />
                        <span className="font-inter text-[11px] text-gray-500 uppercase tracking-widest">ou</span>
                        <div className="flex-1 h-px bg-[#222222]" />
                      </div>
                      
                      <motion.button
                        onClick={handleStripeClick}
                        disabled={processing}
                        className={`w-full h-14 flex items-center justify-center gap-3 rounded-xl font-inter font-semibold text-[13px] uppercase tracking-[0.15em] transition-all duration-200 bg-white text-black hover:bg-[#e5e5e5] disabled:opacity-50`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img src="/images/stripe-4.svg" alt="Stripe" className="h-[18px] opacity-90" />
                        <span>
                          {!canPayWithBalance 
                            ? `Compléter par carte (${missingAmount.toFixed(2)} €)` 
                            : "Payer la totalité par carte"}
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="stripe"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 h-full overflow-y-auto"
                  >
                    <PaymentInfo onBack={handleBackClick} amount={amountToPay} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SuccessView({ onClose }) {
  return (
    <div className="p-10 flex flex-col items-center justify-center h-full text-center">
      <motion.div
        className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
      >
        <CheckCircle className="w-10 h-10 text-emerald-400" />
      </motion.div>
      <h3 className="font-bebas text-4xl text-white mb-2">Paiement réussi !</h3>
      <p className="font-inter text-sm text-gray-500 mb-8">
        Votre commande a été confirmée avec succès.
      </p>
      <motion.button
        onClick={onClose}
        className="px-8 py-3 bg-white text-black font-bebas text-xl tracking-wider rounded-xl transition-colors hover:bg-[#e5e5e5]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Fermer
      </motion.button>
    </div>
  );
}