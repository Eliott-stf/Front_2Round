import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '@components/Product/ProductCard';
import ProductCardSkeleton from '@components/Loader/ProductCardSkeleton';

const FavoriteList = () => {
    //On déclare nos state 
    const { myFavorites, loading } = useSelector((state) => state.user);

    const favoriteProducts = myFavorites || [];

    if (loading) {
        return (
            //loading et erreur
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="flex justify-center">
                        <ProductCardSkeleton />
                    </div>
                ))}
            </div>
        );
    }

    if (favoriteProducts.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20 gap-6">
                <span className="font-inter text-[#737373] tracking-widest uppercase text-sm text-center">
                    Vous n'avez pas encore ajouté de favoris.
                </span>
                <Link
                    to="/catalogue"
                    className="font-bebas text-xl md:text-2xl tracking-widest text-white border border-white rounded-full px-8 py-3 hover:bg-white hover:text-black transition-colors"
                >
                    Parcourir le catalogue
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
            {favoriteProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default FavoriteList;