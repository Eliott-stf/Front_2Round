import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyFavorites } from '@store/user/userSlice';
import HeaderView from '@components/UI/HeaderView';
import FavoriteList from '@components/Favorite/FavoriteList';

const FavoriteView = () => {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos states
    const { myFavorites } = useSelector((state) => state.user);

    //on fetch avec l'API
    useEffect(() => {
        dispatch(fetchMyFavorites());
    }, [dispatch]);

    const totalFavorites = myFavorites?.length || 0;

    return (
        <main className="w-full min-h-screen bg-black flex flex-col">

            <HeaderView
                title="MES FAVORIS"
                showBackButton={true}
                heightClass="h-[90px] md:h-[120px]"
            />

            <section className="w-full max-w-[1440px] mx-auto px-6 py-8 flex flex-col flex-1">
                <span className="font-inter text-[#555555] text-xs uppercase tracking-widest mb-8">
                    {totalFavorites} favoris
                </span>

                <FavoriteList />
            </section>
        </main>
    );
}

export default FavoriteView;