import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByUser } from '@store/review/reviewSlice';
import ReviewCard from './ReviewCard';
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
  if (loading) return <p className="text-center py-4 font-inter text-gray-light">Chargement...</p>;
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
      <div className="flex flex-col mb-12">
        <div className="flex items-center gap-6">
          <span className="font-bebas text-7xl text-white tracking-wide">{averageRating}</span>
          <StarRating
            rating={averageRating}
            sizeClass="w-10 h-10"
            emptyColor="text-white"
          />
        </div>
        <p className="font-inter text-gray-light text-lg uppercase mt-2 tracking-widest">
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