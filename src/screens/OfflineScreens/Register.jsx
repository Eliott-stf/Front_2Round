import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronRight, ChevronLeft, Shield } from 'lucide-react';
import { AuthLayout } from '@components/Layout/AuthLayout';
import { Logo } from '@components/UI/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '@contexts/AuthContext';
import { login, register } from '@store/auth/authSlice';

export const Register = () => {
  //On init le hook 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //On déclare les states locaux/store
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const { loading, error, user, token } = useSelector(state => state.auth);
  const { signIn } = useAuthContext();
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    weight: '',
    height: '',
    boxingType: '',
  });

  // Met à jour l'état local du formulaire dynamiquement pour le css
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Méthode pour soumettre le form
  const handleSubmit = async (e) => {
    //On empeche le comportement normal du formulaire
    e.preventDefault();
    //Validation rapide
    if (!form.name || !form.lastname || !form.email || !form.password) return;

    // Construction de l'objet de données avec typage pour les champs optionnels
    const payload = {
      name: form.name,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
      ...(form.weight && { weight: Number(form.weight) }),
      ...(form.height && { height: Number(form.height) }),
      ...(form.boxingType && { boxingType: form.boxingType }),
    };

    //Appel méthode du store
    const result = await dispatch(register(payload));

    //Si on s'est bien register, on se login automatiquement avec la méthode du store
    if (register.fulfilled.match(result)) {
      dispatch(login({ email: form.email, password: form.password }));
    }
  };

  useEffect(() => {
    // Si l'inscription/connexion a retourné un utilisateur et un JWT valides, on connecte l'user
    if (user && token) {
      signIn(user, token);
      navigate("/");
    }
  }, [user, token, signIn, navigate]);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 sm:w-40 mb-6 shrink-0">
          <Logo className="w-full h-auto" fill="white" />
        </div>

        <p className="text-sm font-inter text-gray-light text-center max-w-xs leading-relaxed">
          {step === 1
            ? "Créez votre profil pour accéder à votre vestiaire."
            : "Renseignez vos mensurations pour finaliser votre carte de combattant."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative overflow-hidden">

        {/* ÉTAPE 1 : IDENTITÉ DE BASE */}
        <div className={`flex flex-col gap-5 transition-transform duration-500 ${step === 1 ? 'translate-x-0' : 'translate-x-[-120%] absolute w-full opacity-0 pointer-events-none'}`}>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">
                Prénom
              </label>
              <input
                id="name" name="name" type="text" placeholder="Mike"
                value={form.name} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 placeholder:text-gray-dark"
                required={step === 1}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastname" className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">
                Nom
              </label>
              <input
                id="lastname" name="lastname" type="text" placeholder="Tyson"
                value={form.lastname} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 placeholder:text-gray-dark"
                required={step === 1}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">
              E-mail
            </label>
            <input
              id="email" name="email" type="email" placeholder="champion@2round.fr"
              value={form.email} onChange={handleChange}
              className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 placeholder:text-gray-dark"
              required={step === 1}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                value={form.password} onChange={handleChange}
                className="w-full pl-4 pr-12 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-200 placeholder:text-gray-dark"
                required={step === 1}
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-dark hover:text-white transition-colors duration-200 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-4 mt-2 bg-neutral-900 border border-gray-dark text-white font-inter font-semibold text-sm rounded-xl hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Shield size={18} className="text-gray-light" />
            Personnaliser ma licence (Optionnel)
            <ChevronRight size={18} />
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-2 bg-red text-white font-bebas text-xl tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-light hover:scale-[1.02] active:scale-95'}`}
          >
            {loading ? 'CRÉATION...' : 'MONTER SUR LE RING'}
          </button>
        </div>

        {/* ÉTAPE 2 : LICENCE (MENSURATIONS & STYLE) */}
        <div className={`flex flex-col gap-5 transition-transform duration-500 ${step === 2 ? 'translate-x-0' : 'translate-x-[120%] absolute w-full opacity-0 pointer-events-none'}`}>

          <div className="p-5 border border-gray-dark bg-black/30 rounded-xl mb-2 backdrop-blur-md">
            <h3 className="font-bebas text-white text-xl tracking-widest uppercase mb-4 border-b border-gray-dark pb-2">
              Carte de Combattant
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="height" className="text-xs font-inter text-gray-light uppercase">Allonge / Taille (cm)</label>
                <input
                  id="height" name="height" type="number" placeholder="180"
                  value={form.height} onChange={handleChange}
                  className="w-full px-3 py-2 bg-black/60 border border-gray-dark text-white font-inter rounded-lg focus:outline-none focus:border-white transition-all placeholder:text-gray-dark"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="weight" className="text-xs font-inter text-gray-light uppercase">Poids (kg)</label>
                <input
                  id="weight" name="weight" type="number" step="0.1" placeholder="75.5"
                  value={form.weight} onChange={handleChange}
                  className="w-full px-3 py-2 bg-black/60 border border-gray-dark text-white font-inter rounded-lg focus:outline-none focus:border-white transition-all placeholder:text-gray-dark"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="boxingType" className="text-xs font-inter text-gray-light uppercase">Style de boxe</label>
              <select
                id="boxingType" name="boxingType"
                value={form.boxingType} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-black/60 border border-gray-dark text-white font-inter rounded-lg focus:outline-none focus:border-white transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Sélectionner une catégorie</option>
                <option value="Anglaise">Boxe Anglaise</option>
                <option value="Française">Savate Boxe Française</option>
                <option value="Thaïlandaise">Muay-Thaï</option>
                <option value="Kickboxing">Kickboxing</option>
                <option value="MMA">MMA</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-4 bg-neutral-900 border border-gray-dark text-white rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-4 bg-red text-white font-bebas text-xl tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-light hover:scale-[1.02] active:scale-95'}`}
            >
              {loading ? 'CRÉATION...' : 'VALIDER MA LICENCE'}
            </button>
          </div>
        </div>

      </form>

      {error && (
        <div className="mt-4 text-red font-inter text-sm text-center bg-red/10 border border-red/20 py-3 px-4 md:px-6 rounded-lg break-words">
          {error}
        </div>
      )}

      <div className="mt-8 text-center border-t border-gray-dark pt-6">
        <p className="text-sm font-inter text-gray">
          Déjà dans le circuit ?{' '}
          <Link to="/login" className="text-white font-semibold hover:text-gray-light hover:underline underline-offset-4 transition-all duration-200">
            Se connecter
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;