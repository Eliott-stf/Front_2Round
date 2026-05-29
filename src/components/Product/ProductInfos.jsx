// src/components/Product/ProductInfos.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByUser } from '@store/review/reviewSlice';
import StarRating from '@components/UI/StarRating';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ProductInfos({ product }) {
  const dispatch = useDispatch();
  const { items: reviews = [] } = useSelector(state => state.reviews);

  const title = product?.title || "Article inconnu";
  const price = product?.price || 0;
  const size = product?.size || "Non spécifiée";
  const brand = "Non spécifiée";
  const condition = product?.condition || "Non spécifié";
  const categoryName = product?.category?.name || "Non spécifiée";
  const description = product?.description || "Aucune description disponible.";
  
  const seller = product?.seller;
  const sellerName = seller ? `${seller.name} ${seller.lastname}` : 'Vendeur inconnu';
  const sellerAvatar = seller?.avatarUrl ? `http://localhost:3000${seller.avatarUrl}` : '/images/placeholder.jpg';
  const sellerId = seller?.id;

  const dateStr = product?.createdAt
    ? formatDistanceToNow(new Date(product.createdAt), { addSuffix: true, locale: fr })
    : '';

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchReviewsByUser(sellerId));
    }
  }, [sellerId, dispatch]);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="w-full max-w-[520px] flex flex-col shrink-0">
      
      <div className="flex flex-col pb-10 border-b border-[#222222]">
        {dateStr && (
          <span className="font-inter text-[13px] text-gray uppercase tracking-[0.2em] mb-4">
            Mis en ligne {dateStr}
          </span>
        )}
        <h1 className="font-bebas text-[64px] uppercase leading-[0.85] text-white tracking-wide">{title}</h1>
        <span className="font-bebas text-[48px] text-red mt-5 leading-none">{price}€</span>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 border-b border-[#222222]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="font-inter text-[12px] text-gray uppercase tracking-[0.15em]">Taille</span>
            <button className="text-[11px] font-normal text-gray-light hover:text-white transition-colors underline decoration-[#333] underline-offset-4">Guide</button>
          </div>
          <span className="font-inter font-medium text-white text-[22px] tracking-tight truncate">{size}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter text-[12px] text-gray uppercase tracking-[0.15em] mb-2">État</span>
          <span className="font-inter font-medium text-white text-[22px] tracking-tight truncate">{condition}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter text-[12px] text-gray uppercase tracking-[0.15em] mb-2">Marque</span>
          <span className="font-inter font-medium text-white text-[22px] tracking-tight truncate">{brand}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter text-[12px] text-gray uppercase tracking-[0.15em] mb-2">Catégorie</span>
          <span className="font-inter font-medium text-white text-[22px] tracking-tight truncate">{categoryName}</span>
        </div>
      </div>

      <div className="py-12 border-b border-[#222222]">
        <h3 className="font-inter text-[13px] text-white uppercase tracking-[0.15em] mb-6 font-medium">À propos de cet article</h3>
        <p className="font-inter font-light text-[17px] leading-[1.8] text-gray-light">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full py-10">
        <button className="w-full h-[68px] bg-white text-black font-inter font-semibold text-[15px] uppercase tracking-[0.15em] hover:bg-[#e5e5e5] transition-colors">
          Acheter
        </button>
        <button className="w-full h-[68px] border border-[#333333] bg-transparent text-white font-inter font-semibold text-[15px] uppercase tracking-[0.15em] hover:border-white transition-colors">
          Faire une offre
        </button>
      </div>

      <div className="p-8 border border-[#222222] flex flex-col gap-8 group mt-4">
        <div className="flex items-center justify-between">
          {sellerId ? (
            <Link to={`/profil/${sellerId}`} className="flex items-center gap-6">
              <img 
                src={sellerAvatar} 
                alt={sellerName} 
                className="w-[72px] h-[72px] rounded-full object-cover bg-[#111111] group-hover:opacity-80 transition-opacity" 
              />
              <div className="flex flex-col">
                <span className="font-bebas text-[28px] uppercase tracking-wide text-white group-hover:text-red transition-colors">{sellerName}</span>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={averageRating} sizeClass="w-[14px] h-[14px]" emptyColor="text-[#333333]" />
                </div>
                <span className="font-inter text-[11px] text-gray tracking-[0.15em] uppercase mt-2">
                  {reviews.length} {reviews.length > 1 ? 'Évaluations' : 'Évaluation'}
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <img 
                src={sellerAvatar} 
                alt={sellerName} 
                className="w-[72px] h-[72px] rounded-full object-cover bg-[#111111]" 
              />
              <div className="flex flex-col">
                <span className="font-bebas text-[28px] uppercase tracking-wide text-white">{sellerName}</span>
              </div>
            </div>
          )}

          {sellerId && (
            <Link to={`/profil/${sellerId}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-light hover:text-white transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
        
        <button className="w-full h-[52px] bg-[#111111] text-white font-inter font-medium text-[13px] uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Contacter le vendeur
        </button>
      </div>
    </div>
  );
}