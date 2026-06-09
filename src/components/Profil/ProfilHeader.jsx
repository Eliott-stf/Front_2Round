import PageLoader from '@components/Loader/PageLoader';
import { fetchMe, fetchUserById } from '@store/user/userSlice';
import { fetchReviewsByUser } from '@store/review/reviewSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ProfileModal from './ProfilModal';
import StarRating from '@components/UI/StarRating';
import { API_ROOT } from '@constants/apiConstant';

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
      <section className="relative w-full bg-[#111111] text-white pt-12 md:pt-20">
        <div className="absolute inset-0 z-0 bg-pattern-overlay"></div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10 cursor-pointer group w-fit">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <h1 className="font-bebas text-3xl md:text-5xl lg:text-6xl uppercase tracking-wide mt-1 md:mt-2">
              {isOwnProfile ? 'Mon vestiaire' : `Vestiaire de ${displayUser.name}`}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start mt-6 md:mt-12">
            <div className="flex flex-col items-center md:items-start w-full max-w-[180px] md:max-w-[200px] shrink-0">
              <img
                src={displayUser.avatarUrl ? `${API_ROOT}${displayUser.avatarUrl}` : "/images/pp/pp.png"}
                alt={`${displayUser.name} ${displayUser.lastname}`}
                className="w-full aspect-[13/16] object-cover border border-white/10 bg-[#1a1a1a]"
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

            <div className="flex flex-col pt-2 w-full max-w-lg items-center md:items-start text-center md:text-left">
              <h2 className="font-bebas text-4xl md:text-6xl lg:text-7xl uppercase tracking-wide mb-3 md:mb-4">
                {`${displayUser.name} ${displayUser.lastname}`}
              </h2>

              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <StarRating
                  rating={averageRating}
                  sizeClass="w-6 h-6 md:w-8 md:h-8"
                  emptyColor="text-gray-light"
                />
                <span className="font-inter text-gray-light text-sm mt-1">
                  ({reviews.length} {reviews.length > 1 ? 'avis' : 'avis'})
                </span>
              </div>

              <div className="font-inter font-extralight text-lg md:text-2xl leading-[1.8] text-gray">
                <p><span className="font-bold text-white">Type de Boxe : </span>{displayUser.boxingType || 'Non renseigné'}</p>
                <p><span className="font-bold text-white">Poids : </span>{displayUser.weight ? `${displayUser.weight} Kg` : 'Non renseigné'}</p>
                <p><span className="font-bold text-white">Taille : </span>{displayUser.height ? `${displayUser.height} cm` : 'Non renseigné'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mt-10 md:mt-16 border-b border-[#222222] pb-4 sm:pb-0 gap-4 sm:gap-0">
            <div className="flex gap-6 md:gap-10 w-full sm:w-auto justify-center sm:justify-start">
              <button
                onClick={() => setActiveTab('articles')}
                className={`font-inter text-sm md:text-base uppercase pb-3 border-b-2 tracking-widest transition-all ${activeTab === 'articles' ? 'border-red text-white' : 'border-transparent text-gray'
                  }`}
              >
                Articles
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`font-inter text-sm md:text-base uppercase pb-3 border-b-2 tracking-widest transition-all ${activeTab === 'reviews' ? 'border-red text-white' : 'border-transparent text-gray'
                  }`}
              >
                Évaluations
              </button>
            </div>
            {isOwnProfile && (
              <Link
                to="/vendre/new"
                className="mb-0 sm:mb-3 bg-red hover:bg-[#cc0000] text-white px-6 py-2.5 rounded-xl font-bebas text-xl tracking-wider transition-all uppercase flex items-center gap-2 hover:scale-[1.02] w-full sm:w-auto justify-center"
              >
                <Plus size={18} /> Vendre un article
              </Link>
            )}
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