import PageLoader from '@components/Loader/PageLoader';
import { fetchMe, fetchUserById } from '@store/user/userSlice';
import { fetchReviewsByUser } from '@store/review/reviewSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './ProfilModal';
import StarRating from '@components/UI/StarRating';

export default function ProfilHeader({ activeTab, setActiveTab, targetUserId, isOwnProfile }) {

  //On récupère le hook
  const dispatch = useDispatch();

  //On déclare nos States locaux et Store
  const { me, currentProfile, loading } = useSelector(state => state.user);
  const { items: reviews = [] } = useSelector(state => state.reviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //On vérifie que l'ID a bien été transmit 
    if (targetUserId) {
      //On vérifie si c'est son ID ou pas (dans Profil.jsx)
      if (isOwnProfile) {
        dispatch(fetchMe());
      } else {
        dispatch(fetchUserById(targetUserId));
      }
      //On récupère ses reviews
      dispatch(fetchReviewsByUser(targetUserId));
    }
  }, [targetUserId, isOwnProfile, dispatch]);

  //Confort 
  const displayUser = isOwnProfile ? me : currentProfile;

  //Méthode pour calculer la note moyenne pour les reviews
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  //Chargement 
  if (loading && !displayUser) return <PageLoader />;
  if (!displayUser) return null;

  return (
    <>
      <section className="relative w-full bg-[#111111] text-white pt-20">
        <div className="absolute inset-0 z-0 bg-pattern-overlay"></div>

        <div className="relative z-10 max-w-300 mx-auto px-8">
          <div className="flex items-center gap-4 mb-10 cursor-pointer group w-fit">
            <svg className="w-12 h-12 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <h1 className="font-bebas text-6xl uppercase tracking-wide mt-2">
              {isOwnProfile ? 'Mon vestiaire' : `Vestiaire de ${displayUser.name}`}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
            <div className="flex flex-col items-start w-65 shrink-0">
              <img
                src={displayUser.avatarUrl ? `http://localhost:3000${displayUser.avatarUrl}` : "/images/jerome.png"}
                alt={`${displayUser.name} ${displayUser.lastname}`}
                className="w-65 h-80 object-cover grayscale border border-white/10 bg-[#1a1a1a]"
              />
              {isOwnProfile && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-3 font-inter text-gray-light text-sm hover:text-white transition-colors"
                >
                  Mettre à jour mon profil
                </button>
              )}
            </div>

            <div className="flex flex-col pt-2 w-full max-w-lg">
              <h2 className="font-bebas text-7xl uppercase tracking-wide mb-4">
                {`${displayUser.name} ${displayUser.lastname}`}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <StarRating
                  rating={averageRating}
                  sizeClass="w-8 h-8"
                  emptyColor="text-gray-light"
                />
                <span className="font-inter text-gray-light text-sm mt-1">
                  ({reviews.length} {reviews.length > 1 ? 'avis' : 'avis'})
                </span>
              </div>

              <div className="font-inter font-extralight text-2xl leading-[1.8] text-gray">
                <p><span className="font-bold text-white">Type de Boxe : </span>{displayUser.boxingType || 'Non renseigné'}</p>
                <p><span className="font-bold text-white">Poids : </span>{displayUser.weight ? `${displayUser.weight} Kg` : 'Non renseigné'}</p>
                <p><span className="font-bold text-white">Taille : </span>{displayUser.height ? `${displayUser.height} cm` : 'Non renseigné'}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-10 mt-16 border-b border-[#222222]">
            <button
              onClick={() => setActiveTab('articles')}
              className={`font-inter text-base uppercase pb-3 border-b-2 tracking-widest transition-all ${activeTab === 'articles' ? 'border-red text-white' : 'border-transparent text-gray'
                }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`font-inter text-base uppercase pb-3 border-b-2 tracking-widest transition-all ${activeTab === 'reviews' ? 'border-red text-white' : 'border-transparent text-gray'
                }`}
            >
              Évaluations
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && isOwnProfile && (
        <ProfileModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}