import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import StarRating from '@components/UI/StarRating';

export default function ReviewCard({ review }) {

  //On déclare nos datas pour le confort 
  const buyer = review?.order?.buyer;
  const buyerId = buyer?.id;
  const username = buyer ? `${buyer.name} ${buyer.lastname}` : 'Utilisateur inconnu';
  const avatar = buyer?.avatarUrl ? `${API_ROOT}${buyer.avatarUrl}` : '/images/placeholder.jpg';
  const rating = review?.rating || 0;
  const content = review?.comment || 'Aucun commentaire.';
  const productName = review?.order?.items?.[0]?.product?.title || 'Article';

  //Format de date 
  const date = review?.createdAt
    ? formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: fr })
    : '';

  return (
    <article className="flex gap-8 py-8 border-b border-[#222222] last:border-b-0 w-full max-w-250">
      <div className="shrink-0">
        {buyerId ? (
          <Link to={`/profil/${buyerId}`}>
            <img 
              src={avatar} 
              alt={`Profil de ${username}`} 
              className="w-22.5 h-22.5 rounded-full object-cover bg-black hover:opacity-80 transition-opacity cursor-pointer" 
            />
          </Link>
        ) : (
          <img 
            src={avatar} 
            alt={`Profil de ${username}`} 
            className="w-22.5 h-22.5 rounded-full object-cover bg-black" 
          />
        )}
      </div>

      <div className="flex flex-col flex-1 justify-center pt-1">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            {buyerId ? (
              <Link to={`/profil/${buyerId}`}>
                <h3 className="font-bebas text-3xl uppercase tracking-wide cursor-pointer text-white hover:text-red transition-colors w-fit">
                  {username}
                </h3>
              </Link>
            ) : (
              <h3 className="font-bebas text-3xl uppercase text-white tracking-wide">
                {username}
              </h3>
            )}
            <span className="font-inter text-gray-light text-xs uppercase tracking-widest mt-1">Acheté : {productName}</span>
          </div>
          <span className="font-inter text-gray text-sm font-light">{date}</span>
        </div>

        <p className="font-inter text-gray-light text-xl font-light mt-3">{content}</p>

        <div className="flex gap-2 mt-4">
          <StarRating
            rating={rating}
            sizeClass="w-6 h-6"
            emptyColor="text-white"
          />
        </div>
      </div>
    </article>
  );
}