import wretch from 'wretch';
import { API_ROOT } from '../constants/apiConstant';

// Instanciation de Wretch
// Toutes les futures requêtes partiront de cette const
const api = wretch(API_ROOT)

    // On indique au backend que le corps de la requête est en JSON
    .headers({ 'Content-Type': 'application/json' })
    .middlewares([
        next => (url, opts) => {
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
            return next(url, opts);
        },
    ]);
//On exporte l'instance pour la réutiliser pour toutes nos requetes 
export default api;