import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../lib/stripe';
import { createPaymentIntent, clearStripeState } from '../../store/stripe/stripeSlice';
import { stripeAppearance } from '@constants/appConstant';
import PaymentForm from './PaymentForm';

export default function TopupWrapper({ missingAmount, orderDto, onBack, onSuccess }) {
  // On récupère les hooks
  const dispatch = useDispatch();

  // On récupère le state depuis le store
  const { clientSecret, loading, error } = useSelector((state) => state.stripe);

  // On assemble la configuration Stripe en fusionnant les constantes statiques et la clé dynamique
  const options = {
    clientSecret,
    appearance: stripeAppearance,
  };

  // Récupération de l'intention de paiement au montage via le slice
  useEffect(() => {
    dispatch(createPaymentIntent({ missingAmount, orderDto }));

    // Nettoyage de l'état Stripe au démontage
    return () => {
      dispatch(clearStripeState());
    };
  }, [missingAmount, orderDto, dispatch]);

  //erreur et loading
  if (error) {
    return <div className="p-6 text-red font-inter text-sm">{error}</div>;
  }

  if (loading || !clientSecret) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <span className="font-inter text-sm text-gray-500">Connexion sécurisée à Stripe...</span>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm amount={missingAmount} onBack={onBack} onSuccess={onSuccess} />
    </Elements>
  );
}