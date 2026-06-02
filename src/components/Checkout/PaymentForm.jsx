import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { ChevronLeft } from 'lucide-react';

export default function PaymentForm({ amount, onBack, onSuccess }) {
  // On récupère les hooks
  const stripe = useStripe();
  const elements = useElements();
  
  // On déclare nos states locaux
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Méthode de soumission et de validation du paiement Stripe
  const handleSubmit = async (e) => {
    //on empeche le fonctionnement basique du formulaire
    e.preventDefault();
    
    //on vérif que l'instance Stripe est bien chargée
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`, 
      },
      redirect: 'if_required', 
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full p-6">
      <div className="flex items-center mb-8">
        <button 
          type="button" 
          onClick={onBack} 
          className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bebas text-3xl text-white tracking-wide ml-2">
          Paiement sécurisé
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <PaymentElement />
        {errorMessage && (
          <div className="mt-4 p-3 bg-red/10 border border-red/20 rounded-lg">
            <span className="text-red font-inter text-[13px]">{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="mt-8 pb-2">
        <button 
          type="submit" 
          disabled={isProcessing || !stripe}
          className="w-full flex items-center justify-center py-4 rounded-xl font-bebas text-[22px] tracking-wider bg-white text-black transition-all duration-200 hover:bg-[#e5e5e5] disabled:opacity-50"
        >
          {isProcessing ? 'Traitement...' : `Payer ${amount.toFixed(2)} €`}
        </button>
      </div>
    </form>
  );
}