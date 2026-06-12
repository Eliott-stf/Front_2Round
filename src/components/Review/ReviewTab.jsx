import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByUser } from '@store/review/reviewSlice';
import ReviewCard from './ReviewCard';
import ReviewCardSkeleton from '@components/Loader/ReviewCardSkeleton';
import StarRating from '@components/UI/StarRating';

export default function ReviewTab({ targetUserId }) {

  //On récupère le hook
  const dispatch = useDispatch();

  //On déclare nos States (du store ici)
  const { items: reviews = [], loading, error } = useSelector(state => state.reviews);

  useEffect(() => {
    //Si on trouve un ID on fait un Appel a l'API avec cet ID en param
    if (targetUserId) {
      dispatch(fetchReviewsByUser(targetUserId));
    }
  }, [targetUserId, dispatch]);

  //Chargement + Erreur + Reviews
  if (loading) {
    return (
      <div className="flex flex-col w-full">
        {/* Placeholder pour l'en-tête (note moyenne) */}
        <div className="flex flex-col mb-8 sm:mb-12 items-center sm:items-start">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="h-10 sm:h-14 w-20 sm:w-28 bg-[#111111] rounded-md relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
            </div>
            <div className="w-40 sm:w-52 h-8 sm:h-10 bg-[#111111] rounded-sm relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
            </div>
          </div>
          <div className="h-4 sm:h-5 w-32 mt-4 bg-[#111111] rounded-sm relative overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
          </div>
        </div>

        {/* Liste de faux avis */}
        <div className="flex flex-col w-full">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ReviewCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <p className="text-center py-4 text-red font-inter text-sm">Erreur : {error}</p>;

  if (reviews.length === 0) return (
    <p className="text-center font-inter text-gray py-8 tracking-widest uppercase text-sm">
      Aucune évaluation
    </p>
  );

  //Méthode pour calculer la note moyenne pour les reviews
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col mb-8 sm:mb-12 items-center sm:items-start">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="font-bebas text-5xl sm:text-7xl text-white tracking-wide">{averageRating}</span>
          <StarRating
            rating={averageRating}
            sizeClass="w-8 h-8 sm:w-10 sm:h-10"
            emptyColor="text-white"
          />
        </div>
        <p className="font-inter text-gray-light text-sm sm:text-lg uppercase mt-2 tracking-widest text-center sm:text-left">
          {reviews.length} {reviews.length > 1 ? 'Évaluations' : 'Évaluation'}
        </p>
      </div>

      <div className="flex flex-col w-full">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}