// src/screens/AdminScreens/AdminOrders.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders } from '@store/admin/adminSlice';
import { ORDER_STATUS_FILTER_OPTIONS } from '@constants/appConstant';
import PageLoader from '@components/Loader/PageLoader';
import OrderList from '@components/Admin/Order/OrderList';
import ModaleOrderDetail from '@components/Admin/Order/ModaleOrderDetail';
import HeaderAdmin from '@components/Admin/UI/HeaderAdmin';
import SearchBar from '@components/Admin/UI/SearchBar';
import FilterSelect from '@components/Admin/UI/FilterSelect';
import CounterBadge from '@components/Admin/UI/CounterBadge';


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
            <HeaderAdmin 
                title="Commandes" 
                subtitle="Historique et suivi des transactions."
            >
                <SearchBar 
                    placeholder="Référence, acheteur..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <FilterSelect 
                    value={selectedStatus} 
                    onChange={(e) => setSelectedStatus(e.target.value)} 
                    options={ORDER_STATUS_FILTER_OPTIONS} 
                    defaultLabel="Tous les statuts" 
                />
                <CounterBadge count={filteredOrders.length} label="Commandes" />
            </HeaderAdmin>

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
