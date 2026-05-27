// src/components/ProfilHeader.jsx
import PageLoader from '@components/Loader/PageLoader';
import { fetchMe } from '@store/user/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './ProfilModal';


const StarIcon = ({ filled }) => (
  <svg className={`w-8 h-8 ${filled ? 'text-red' : 'text-gray-light'}`} viewBox="0 0 58 55" fill="currentColor">
    <path d="M28.5312 0L35.2667 20.7295H57.0629L39.4294 33.541L46.1648 54.2705L28.5312 41.459L10.8977 54.2705L17.6331 33.541L-0.00044632 20.7295H21.7958L28.5312 0Z" />
  </svg>
);

export default function ProfilHeader({ activeTab, setActiveTab }) {
  const dispatch = useDispatch();
  const { me, loading } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMe());
    
  }, [dispatch]);

  if (loading && !me) return <PageLoader/>;
  if (!me) return null;

  return (
    <>
      <section className="relative w-full bg-[#111111] text-white pt-20">
        <div className="absolute inset-0 z-0 bg-pattern-overlay"></div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8">
          <div className="flex items-center gap-4 mb-10 cursor-pointer group w-fit">
            <svg className="w-12 h-12 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <h1 className="font-bebas text-6xl uppercase tracking-wide mt-2">Mon vestiaire</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
            <div className="flex flex-col items-start w-[260px] shrink-0">
              <img 
                src={me.avatarUrl ? `http://localhost:3000${me.avatarUrl}` : "/images/jerome.png"} 
                alt={`${me.name} ${me.lastname}`} 
                className="w-[260px] h-[320px] object-cover grayscale border border-white/10 bg-[#1a1a1a]" 
              />
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="mt-3 font-inter text-gray-light text-sm hover:text-white transition-colors"
              >
                Mettre à jour mon profil
              </button>
            </div>

            <div className="flex flex-col pt-2 w-full max-w-lg">
              <h2 className="font-bebas text-7xl uppercase tracking-wide mb-4">
                {`${me.name} ${me.lastname}`}
              </h2>
              <div className="flex gap-2 mb-6">
                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < 4} />)}
              </div>
              <div className="font-inter font-extralight text-2xl leading-[1.8] text-gray">
                <p><span className="font-bold text-white">Type de Boxe : </span>{me.boxingType || 'Non renseigné'}</p>
                <p><span className="font-bold text-white">Poids : </span>{me.weight ? `${me.weight} Kg` : 'Non renseigné'}</p>
                <p><span className="font-bold text-white">Taille : </span>{me.height ? `${me.height} cm` : 'Non renseigné'}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-10 mt-16 border-b border-[#222222]">
            <button
              onClick={() => setActiveTab('articles')}
              className={`font-inter text-base uppercase pb-3 border-b-2 tracking-widest transition-all ${
                activeTab === 'articles' ? 'border-red text-white' : 'border-transparent text-gray'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`font-inter text-base uppercase pb-3 border-b-2 tracking-widest transition-all ${
                activeTab === 'reviews' ? 'border-red text-white' : 'border-transparent text-gray'
              }`}
            >
              Évaluations
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <ProfileModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}