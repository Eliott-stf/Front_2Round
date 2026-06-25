import wretch from 'wretch';
import { API_ROOT } from '../constants/apiConstant';

// Instanciation de Wretch
// Toutes les futures requêtes partiront de cette const
const api = wretch(API_ROOT)

    // On indique au backend que le corps de la requête est en JSON
    .headers({ 'Content-Type': 'application/json' })
    .middlewares([
        next => (url, opts) => {
            // Timer pour le toast du serveur lent
            const timeoutId = setTimeout(() => {
                window.dispatchEvent(new CustomEvent('server-wakeup-delay'));
            }, 4000);

            const clearDelayTimer = () => {
                clearTimeout(timeoutId);
                window.dispatchEvent(new CustomEvent('server-wakeup-resolved'));
            };

            // On extrait le JWT du localStorage
            const token = localStorage.getItem('token');

            //Si user authentifié, on envoi son token 
            if (token) {
                //copie l'en tete pour pas l'écraser
                opts.headers = {
                    //On injecte l'en tete de base + JWT
                    ...opts.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
            return next(url, opts)
                .then(res => {
                    clearDelayTimer();
                    return res;
                })
                .catch(err => {
                    clearDelayTimer();
                    throw err;
                });
        },
    ]);

// Instance dédiée aux uploads  sans Content-Type
export const apiUpload = wretch(API_ROOT)
    .middlewares([
        next => (url, opts) => {
            const timeoutId = setTimeout(() => {
                window.dispatchEvent(new CustomEvent('server-wakeup-delay'));
            }, 4000);

            const clearDelayTimer = () => {
                clearTimeout(timeoutId);
                window.dispatchEvent(new CustomEvent('server-wakeup-resolved'));
            };

            const token = localStorage.getItem('token');
            if (token) {
                opts.headers = {
                    ...opts.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
            return next(url, opts)
                .then(res => {
                    clearDelayTimer();
                    return res;
                })
                .catch(err => {
                    clearDelayTimer();
                    throw err;
                });
        },
    ]);
//On exporte l'instance pour la réutiliser pour toutes nos requetes 
export default api;