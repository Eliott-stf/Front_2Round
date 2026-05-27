import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMe, uploadAvatar } from '@store/user/userSlice';
import { BOXING_TYPES } from '@constants/appConstant';

export default function ProfileModal({ onClose }) {
  const dispatch = useDispatch();
  const { me, loading } = useSelector(state => state.user);

  const [form, setForm] = useState({
    name: me?.name ?? '',
    lastname: me?.lastname ?? '',
    weight: me?.weight ?? '',
    height: me?.height ?? '',
    boxingType: me?.boxingType ?? '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    dispatch(uploadAvatar(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      lastname: form.lastname,
      ...(form.weight && { weight: Number(form.weight) }),
      ...(form.height && { height: Number(form.height) }),
      ...(form.boxingType && { boxingType: form.boxingType }),
    };

    try {
      await dispatch(updateMe(payload)).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#111111] border border-gray-dark w-full max-w-xl rounded-2xl flex flex-col relative shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-dark bg-[#111111] sticky top-0 z-10">
          <h2 className="font-bebas text-3xl uppercase text-white tracking-wide mt-1">
            Modifier le vestiaire
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-light hover:text-white transition-colors duration-200 focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto space-y-8">
          
          {/* Section Avatar */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">Photo de profil</span>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-black/40 border border-gray-dark rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                {me?.avatarUrl ? (
                  <img 
                    src={`http://localhost:3000${me.avatarUrl}`} 
                    alt="Avatar" 
                    className="w-full h-full object-cover grayscale" 
                  />
                ) : (
                  <span className="font-bebas text-5xl text-gray-light mt-2">
                    {me?.name?.[0]?.toUpperCase()}
                  </span>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="px-5 py-2.5 bg-black/40 border border-gray-dark text-white font-inter text-sm rounded-xl hover:border-gray transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Uploader
                  <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
                </label>
                {loading && <span className="font-inter text-xs text-red ml-1">Envoi en cours...</span>}
              </div>
            </div>
          </div>

          <form id="profile-update-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Prénom & Nom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">Prénom</label>
                <input 
                  type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John"
                  className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-gray transition-all duration-200 placeholder:text-gray-dark" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">Nom</label>
                <input 
                  type="text" name="lastname" value={form.lastname} onChange={handleChange} required placeholder="Doe"
                  className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-gray transition-all duration-200 placeholder:text-gray-dark" 
                />
              </div>
            </div>

            {/* Type de boxe */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">Spécialité</label>
              <select 
                name="boxingType" value={form.boxingType} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-gray transition-all duration-200 appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em 1.2em' }}
              >
                <option value="" className="bg-[#111111] text-gray-dark">Sélectionner un type</option>
                {BOXING_TYPES.map(t => (
                  <option key={t} value={t} className="bg-[#111111] text-white">{t}</option>
                ))}
              </select>
            </div>

            {/* Poids & Taille */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">Poids (Kg)</label>
                <input 
                  type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="75"
                  className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-gray transition-all duration-200 placeholder:text-gray-dark" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-inter font-semibold text-gray-light uppercase tracking-wider ml-1">Taille (cm)</label>
                <input 
                  type="number" name="height" value={form.height} onChange={handleChange} placeholder="180"
                  className="w-full px-4 py-3.5 bg-black/40 border border-gray-dark text-white font-inter rounded-xl focus:outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-gray transition-all duration-200 placeholder:text-gray-dark" 
                />
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center gap-4 px-8 py-6 border-t border-gray-dark bg-[#111111] sticky bottom-0 z-10">
          <button 
            type="button" 
            onClick={onClose}
            className="w-full sm:w-1/3 py-4 text-gray hover:text-white font-inter text-sm font-semibold transition-colors duration-200"
          >
            Annuler
          </button>
          <button 
            type="submit"
            form="profile-update-form"
            disabled={loading}
            className={`w-full sm:w-2/3 py-4 bg-red text-white font-bebas text-xl tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${loading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-light hover:text-white hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]'
              }`}
          >
            {loading ? 'Mise à jour...' : 'Enregistrer'}
          </button>
        </div>

      </div>
    </div>
  );
}