// src/screens/AdminScreens/AdminOrders.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders } from '@store/admin/adminSlice';
import { ORDER_STATUS_MAP } from '@constants/appConstant';
import PageLoader from '@components/Loader/PageLoader';
import OrderList from '@components/Admin/Order/OrderList';
import ModaleOrderDetail from '@components/Admin/Order/ModaleOrderDetail';

const AdminOrders = () => {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { orders, loading } = useSelector((state) => state.admin);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        dispatch(fetchAdminOrders());
    }, [dispatch]);

    //on déclare nos const de confort
    const handleOpenDetail = (order) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setSelectedOrder(null);
        setIsDetailOpen(false);
    };

    const filteredOrders = orders.filter((order) => {
        // Recherche par référence ou nom de l'acheteur
        const refMatch = order.reference.toLowerCase().includes(searchQuery.toLowerCase());
        const buyerName = order.buyer
            ? `${order.buyer.name} ${order.buyer.lastname}`.toLowerCase()
            : '';
        const buyerMatch = buyerName.includes(searchQuery.toLowerCase());
        const statusMatch = selectedStatus ? order.status === selectedStatus : true;

        return (refMatch || buyerMatch) && statusMatch;
    });

    //loading et erreur
    if (loading && orders.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <h1 className="font-bebas text-4xl tracking-widest text-white">Commandes</h1>
                    <p className="font-inter text-[#888888] mt-2">Historique et suivi des transactions.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    {/* Barre de Recherche */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Référence, acheteur..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#111] border border-[#222] text-white font-inter text-sm rounded-full pl-5 pr-10 py-2 outline-none w-64 focus:border-[#444] transition-colors"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                        </div>
                    </div>

                    {/* Filtre Statut */}
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="appearance-none bg-[#111] border border-[#222] text-white font-inter text-sm rounded-full pl-5 pr-10 py-2 outline-none cursor-pointer hover:border-[#444] transition-colors"
                        >
                            <option value="">Tous les statuts</option>
                            {Object.entries(ORDER_STATUS_MAP).map(([status, info]) => (
                                <option key={status} value={status}>
                                    {info.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Badge total */}
                    <div className="bg-[#111111] px-4 py-2 border border-[#222222] rounded-full shrink-0">
                        <span className="font-inter text-sm text-white">{filteredOrders.length} Commandes</span>
                    </div>
                </div>
            </header>

            {/* Liste des commandes */}
            <OrderList 
                orders={filteredOrders}
                loading={loading}
                handleOpenDetail={handleOpenDetail}
            />

            {/* Modale de détails de la commande */}
            <ModaleOrderDetail 
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
                order={selectedOrder}
            />
        </div>
    );
};

export default AdminOrders;
