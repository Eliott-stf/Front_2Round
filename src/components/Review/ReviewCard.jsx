import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '@components/UI/StarRating';
import { API_ROOT } from '@constants/apiConstant';
import { getRelativeTime } from '@/utils/formateDate';

export default function ReviewCard({ review }) {

  //On déclare nos datas pour le confort 
  const buyer = review?.order?.buyer;
  const buyerId = buyer?.id;
  const username = buyer ? `${buyer.name} ${buyer.lastname}` : 'Utilisateur inconnu';
  const avatar = buyer?.avatarUrl ? `${API_ROOT}${buyer.avatarUrl}` :  '/images/pp/pp.png';
  const rating = review?.rating || 0;
  const content = review?.comment || 'Aucun commentaire.';
  const productName = review?.order?.items?.[0]?.product?.title || 'Article';

  //Format de date 
  const date = getRelativeTime(review?.createdAt);

  return (
    <article className="flex gap-4 sm:gap-8 py-6 sm:py-8 border-b border-[#222222] last:border-b-0 w-full max-w-[1000px]">
      <div className="shrink-0">
        {buyerId ? (
          <Link to={`/profil/${buyerId}`}>
            <img 
              src={avatar} 
              alt={`Profil de ${username}`} 
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover bg-black hover:opacity-80 transition-opacity cursor-pointer" 
            />
          </Link>
        ) : (
          <img 
            src={avatar} 
            alt={`Profil de ${username}`} 
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover bg-black" 
          />
        )}
      </div>

      <div className="flex flex-col flex-1 justify-center pt-1 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-0">
          <div className="flex flex-col min-w-0">
            {buyerId ? (
              <Link to={`/profil/${buyerId}`}>
                <h3 className="font-bebas text-xl sm:text-2xl md:text-3xl uppercase tracking-wide cursor-pointer text-white hover:text-red transition-colors w-fit truncate max-w-full">
                  {username}
                </h3>
              </Link>
            ) : (
              <h3 className="font-bebas text-xl sm:text-2xl md:text-3xl uppercase text-white tracking-wide truncate max-w-full">
                {username}
              </h3>
            )}
            <span className="font-inter text-gray-light text-[10px] sm:text-xs uppercase tracking-widest mt-1 truncate">Acheté : {productName}</span>
          </div>
          <span className="font-inter text-gray text-xs sm:text-sm font-light shrink-0">{date}</span>
        </div>

        <p className="font-inter text-gray-light text-sm sm:text-lg md:text-xl font-light mt-2 sm:mt-3 leading-relaxed">{content}</p>

        <div className="flex gap-2 mt-3 sm:mt-4">
          <StarRating
            rating={rating}
            sizeClass="w-5 h-5 sm:w-6 sm:h-6"
            emptyColor="text-white"
          />
        </div>
      </div>
    </article>
  );
}