// src/components/Checkout/TopupWrapper.tsx
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import api from '../../lib/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function TopupWrapper({ missingAmount, orderDto }) {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const fetchIntent = async () => {
            try {
                const response = await api.post('/payments/topup-and-order', {
                    missingAmount,
                    orderDto,
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Erreur d\'initialisation du paiement', error);
            }
        };

        if (missingAmount > 0) {
            fetchIntent();
        }
    }, [missingAmount, orderDto]);

    if (!clientSecret) return <div className="font-inter text-gray">Initialisation de la transaction...</div>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
            <CheckoutForm />
        </Elements>
    );
}