import { API_ROOT } from '@constants/apiConstant';
import { PRODUCT_CONDITIONS } from '@constants/appConstant';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@store/product/productSlice';
import { fetchMyFavorites } from '@store/user/userSlice';
import { slugify } from '@/utils/slugify';

//TODO: Badge temporaire 
const VerifiedBadge = () => (
    <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 rounded-full border border-white p-0.5 md:p-1 backdrop-blur-md bg-black/30">
        <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </div>
);

export default function ProductCard({ product, selectable = false, selected = false, onSelect = null }) {

    //on récup le hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //on déclare nos state
    const { myFavorites } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);
    const [isFavorite, setIsFavorite] = useState(false);

    // On déclare nos constante pour le confort 
    const title = product?.title || 'Article';
    const price = product?.price || 0;

    const isPack = product?.isPack || product?.description?.includes('[PACK:');

    // Construction du sous-titre : "Taille - Condition"
    const size = product?.attributes?.map(pa => pa.attribute?.value).filter(Boolean).join(', ') || product?.size;
    const condition = PRODUCT_CONDITIONS.find(c => c.value === product?.condition)?.label || product?.condition;
    const details = [size, condition].filter(Boolean);
    const subtitle = details.length > 0 ? details.join(' - ') : (product?.description || 'Bon état');

    let imagePath = product?.medias?.[0]?.path || product?.imageUrl || null;
    if (!imagePath && isPack && product?.subProducts?.[0]?.medias?.[0]?.path) {
        imagePath = product.subProducts[0].medias[0].path;
    }
    const imageUrl = imagePath
        ? (imagePath.startsWith('http') ? imagePath : `${API_ROOT}${imagePath}`)
        : '/images/placeholder.jpg';
    const isArchived = product?.status === 'ARCHIVED';

    //useEffect pour synchroniser l'état du favori avec le store
    useEffect(() => {
        if (product?.id && myFavorites) {
            setIsFavorite(myFavorites.some((fav) => fav.id === product.id));
        }
    }, [product?.id, myFavorites]);

    //Méthode pour ajouter/supprimer des favoris
    const handleToggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!token) {
            navigate('/login', { state: { message: "Connectez-vous pour enregistrer des favoris." } });
            return;
        }
        if (!product?.id) return;
        setIsFavorite(!isFavorite);
        await dispatch(toggleFavorite(product.id));
        dispatch(fetchMyFavorites());
    };

    const handleCardClick = (e) => {
        if (selectable) {
            e.preventDefault();
            e.stopPropagation();
            if (onSelect) onSelect(product.id);
        }
    };

    return (
        <article 
            className="flex flex-col group w-full max-w-[130px] md:max-w-[220px] cursor-pointer flex-shrink-0 mx-auto"
            onClick={handleCardClick}
        >
            <Link
                to={selectable ? '#' : `/product/${slugify(title)}-${product?.id}`}
                className="flex flex-col relative w-full"
            >
                <div className="relative w-full aspect-square bg-[#111111] mb-2 md:mb-4 overflow-hidden rounded-sm">
                    <img
                        src={imageUrl}
                        alt={title}
                        className={`w-full h-full object-cover transition-transform duration-300 ${isArchived ? 'grayscale opacity-30' : 'group-hover:scale-105'
                            }`}
                    />

                    {!isArchived && !selectable && <VerifiedBadge />}
                    
                    {isPack && (
                        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 px-1.5 py-0.5 md:px-2.5 rounded border border-red bg-red text-white text-[8px] md:text-[10px] font-bebas tracking-wider uppercase z-10">
                            Lot
                        </div>
                    )}

                    {selectable && !isArchived && (
                        <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 z-20">
                            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                selected 
                                    ? "bg-red border-red text-white shadow-lg scale-110" 
                                    : "bg-black/50 border-white/70 hover:border-white text-transparent"
                            }`}>
                                <svg className="w-2 md:w-3 h-2 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </div>
                    )}

                    {!isArchived && !selectable && (
                        <button
                            onClick={handleToggleFavorite}
                            className="absolute z-10 bottom-2 right-2 md:bottom-3 md:right-3 transition-transform hover:scale-110 outline-none"
                        >
                            <svg className="w-[16px] h-[14px] md:w-[24px] md:h-[20px]" viewBox="0 0 60 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath={`url(#clip0_203_832_${product?.id})`}>
                                    <path d="M5.30717 4.09507C9.26792 0.455991 15.2357 -0.88994 20.4347 0.625609C22.6614 1.24607 24.7554 2.33207 26.4984 3.82853C27.9339 4.98795 29.0312 6.48588 29.9912 8.033C31.1424 6.1158 32.6409 4.37043 34.4934 3.06635C36.1329 1.86801 38.0214 1.01257 39.9962 0.497845C45.0834 -0.823855 50.8134 0.526481 54.6782 4.03853C56.4872 5.64219 57.8964 7.66146 58.8227 9.8687C59.9889 12.6744 60.2604 15.7936 59.7639 18.7718C59.1249 22.875 57.2627 26.7086 54.8754 30.1047C52.2804 33.7929 49.1274 37.0774 45.7307 40.0666C42.0699 43.2379 38.1564 46.1266 34.0314 48.6958C32.7234 49.5043 31.3922 50.2804 30.0264 50.9934L29.9177 51C25.2444 48.3963 20.8029 45.3938 16.6622 42.0367C12.8634 38.9542 9.32342 35.5427 6.32642 31.6973C3.43967 27.9797 1.06517 23.7392 0.280669 19.0868C-0.279581 16.0396 -0.00883133 12.8366 1.16267 9.9524C2.08967 7.74003 3.47867 5.69286 5.30717 4.09581V4.09507Z" fill={isFavorite ? "#ff0000" : "black"} />
                                </g>
                                <defs>
                                    <clipPath id={`clip0_203_832_${product?.id}`}>
                                        <rect width="60" height="51" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    )}

                    {isArchived && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <div className="border border-white/20 bg-black/40 backdrop-blur-md px-4 py-1.5 md:px-6 md:py-2.5">
                                <span className="text-white font-inter font-semibold text-[9px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase">
                                    Vendu
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={`flex flex-col font-inter transition-opacity duration-300 ${isArchived ? 'opacity-40' : 'opacity-100'} w-full`}>
                    <h3 className="text-white font-bold text-xs md:text-lg leading-tight uppercase truncate w-full">
                        {title}
                    </h3>
                    <p className="text-gray text-[10px] md:text-sm mt-0.5 mb-1 md:mb-1.5 font-light truncate w-full bg-black/0">
                        {subtitle}
                    </p>
                    <span className="text-white font-bold text-xs md:text-lg">
                        {price}€
                    </span>
                </div>
            </Link>
        </article>
    );
}