import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '@store/order/orderSlice';
import OrderCard from './OrderCard';
import OrderCardSkeleton from '@components/Loader/OrderCardSkeleton';

export default function OrderList() {
    const dispatch = useDispatch();
    const { myOrders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex flex-col gap-6 w-full">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <OrderCardSkeleton key={idx} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-12 flex justify-center">
                <span className="text-red font-inter text-sm">
                    Erreur : {error}
                </span>
            </div>
        );
    }

    if (!myOrders || myOrders.length === 0) {
        return (
            <div className="w-full py-20 flex flex-col items-center justify-center border border-[#2f2f2f] bg-[#111111] rounded-xl">
                <span className="text-white font-bebas text-2xl tracking-widest uppercase mb-2">
                    Aucune commande
                </span>
                <span className="text-[#737373] font-inter text-sm text-center max-w-md">
                    Vous n'avez pas encore effectué d'achats sur la plateforme.
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            {myOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}