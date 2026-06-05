import { API_ROOT } from '@constants/apiConstant';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@store/product/productSlice';
import { fetchMyFavorites } from '@store/user/userSlice';

//TODO: Badge temporaire 
const VerifiedBadge = () => (
    <div className="absolute top-2 right-2 rounded-full border border-white p-1 backdrop-blur-md bg-black/30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </div>
);

export default function ProductCard({ product }) {

    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { myFavorites } = useSelector((state) => state.user);
    const [isFavorite, setIsFavorite] = useState(false);

    // On déclare nos constante pour le confort 
    const title = product?.title || 'Article';
    const price = product?.price || 0;
    
    // Construction du sous-titre : "Taille - Condition"
    const size = product?.size;
    const condition = product?.condition;
    const details = [size, condition].filter(Boolean);
    const subtitle = details.length > 0 ? details.join(' - ') : (product?.description || 'Bon état');

    const imagePath = product?.medias?.[0]?.path || product?.imageUrl || null;
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
        if (!product?.id) return;
        setIsFavorite(!isFavorite);
        await dispatch(toggleFavorite(product.id));
        dispatch(fetchMyFavorites());
    };

    return (
        <article className="flex flex-col group w-fit cursor-pointer">
            <Link
                to={`/product/${product?.id}`}
                className="flex flex-col"
            >
                <div className="relative w-55 h-55 bg-[#111111] mb-4 overflow-hidden rounded-sm">
                    <img
                        src={imageUrl}
                        alt={title}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                            isArchived ? 'grayscale opacity-30' : 'group-hover:scale-105'
                        }`}
                    />

                    {!isArchived && <VerifiedBadge />}

                    {!isArchived && (
                        <button
                            onClick={handleToggleFavorite}
                            className="absolute z-10 bottom-3 right-3 transition-transform hover:scale-110 outline-none"
                        >
                            <svg width="24" height="20" viewBox="0 0 60 51" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            <div className="border border-white/20 bg-black/40 backdrop-blur-md px-6 py-2.5">
                                <span className="text-white font-inter font-semibold text-[11px] tracking-[0.25em] uppercase">
                                    Vendu
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={`flex flex-col font-inter transition-opacity duration-300 ${isArchived ? 'opacity-40' : 'opacity-100'}`}>
                    <h3 className="text-white font-bold text-lg leading-tight uppercase truncate max-w-55">
                        {title}
                    </h3>
                    <p className="text-gray text-sm mt-1 mb-2 font-light truncate max-w-55">
                        {subtitle}
                    </p>
                    <span className="text-white font-bold text-lg">
                        {price}€
                    </span>
                </div>
            </Link>
        </article>
    );
}