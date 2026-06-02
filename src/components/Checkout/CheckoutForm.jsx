// src/components/Checkout/CheckoutForm.jsx
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/profil/wallet?success=true`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Échec de l\'authentification du paiement.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement id="payment-element" />
      
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="rounded-2xl w-full h-13 bg-white text-black font-inter font-semibold text-[15px] uppercase tracking-[0.15em] hover:bg-[#e5e5e5] transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Traitement...' : 'Confirmer le paiement'}
      </button>
      
      {errorMessage && <div className="text-red font-inter text-sm mt-2">{errorMessage}</div>}
    </form>
  );
}