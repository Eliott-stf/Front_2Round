import { loadStripe } from '@stripe/stripe-js';

//on instancie
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);