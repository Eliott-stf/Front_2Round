import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '@components/Layout/AuthLayout';
import { Logo } from '@components/UI/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '@contexts/AuthContext';
import { login } from '@store/auth/authSlice';


export const Login = () => {
  //on récupère le hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //On déclare nos State locaux et store
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const { loading, error, user, token } = useSelector(state => state.auth);

  //On déclare nos méthodes du AuthContext
  const { signIn } = useAuthContext();

  // Met à jour l'état local du formulaire dynamiquement pour le css
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //On empeche le comportement normal du formulaire
    e.preventDefault();
    //Petite validation rapide 
    if (!form.email || !form.password) return;

    // Déclenchement de l'action Redux
    dispatch(login(form));
  };

  // Écoute des modifications du store pour finaliser la session
  useEffect(() => {
    if (user && token) {
      signIn(user, token);
      navigate('/');
    }
  }, [user, token, signIn]);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 sm:w-40 mb-6 shrink-0">
          <Logo className="w-full h-auto" fill="white" />
        </div>

        <p className="text-sm font-inter text-gray-light text-center max-w-xs leading-relaxed">
          Prêt pour votre prochain round ? <br />
          Connectez-vous à votre vestiaire.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="champion@2round.fr"
            className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-gray transition-all duration-200 placeholder:text-gray-dark"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ml-1 mr-1">
            <label htmlFor="password" className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider">
              Mot de passe
            </label>
            <Link to="/reset-password" className="text-xs font-inter text-gray hover:text-white transition-colors duration-200">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-4 pr-12 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-gray transition-all duration-200 placeholder:text-gray-dark"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-dark hover:text-white transition-colors duration-200 focus:outline-none"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red font-inter text-sm text-center bg-red/10 border border-red/20 py-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 mt-2 bg-red text-white font-bebas text-xl tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${loading
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-light hover:text-white hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]'
            }`}
        >
          {loading ? 'Connexion...' : 'Lancer le round'}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-gray-dark pt-6">
        <p className="text-sm font-inter text-gray">
          Premier combat ?{' '}
          <Link to="/register" className="text-white font-semibold hover:text-gray-light hover:underline underline-offset-4 transition-all duration-200">
            S'inscrire
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;