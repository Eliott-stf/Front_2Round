//on récup le hook
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, toggleUserBan, fetchAdminUserDetail } from '@store/admin/adminSlice';
import PageLoader from '@components/Loader/PageLoader';
import UserList from '@components/Admin/User/UserList';
import ModaleUserDetail from '@components/Admin/User/ModaleUserDetail';
import HeaderAdmin from '@components/Admin/UI/HeaderAdmin';
import SearchBar from '@components/Admin/UI/SearchBar';
import FilterSelect from '@components/Admin/UI/FilterSelect';
import CounterBadge from '@components/Admin/UI/CounterBadge';
import { USER_STATUS_FILTER_OPTIONS } from '@constants/appConstant';


const AdminUsers = () => {
    //on récup le hook
    const dispatch = useDispatch();
    
    //on déclare nos state
    const { users, userDetail, loading } = useSelector((state) => state.admin);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    //Méthode pour bannir
    const handleToggleBan = (userId) => {
        dispatch(toggleUserBan(userId));
    };

    const handleOpenDetail = (userId) => {
        setIsDetailOpen(true);
        dispatch(fetchAdminUserDetail(userId));
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
    };

    //on déclare nos const de confort
    const filteredUsers = users.filter((user) => {
        const fullName = `${user.name} ${user.lastname}`.toLowerCase();
        const search = searchQuery.toLowerCase();
        const matchesSearch = fullName.includes(search);
        
        const matchesStatus = statusFilter === 'ALL' ||
            (statusFilter === 'ACTIVE' && user.isActive) ||
            (statusFilter === 'BANNED' && !user.isActive);

        return matchesSearch && matchesStatus;
    });

    //loading et erreur
    if (loading && users.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-8">
            <HeaderAdmin 
                title="Utilisateurs" 
                subtitle="Gestion des membres de la communauté."
            >
                <SearchBar 
                    placeholder="Rechercher un membre..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <FilterSelect 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={USER_STATUS_FILTER_OPTIONS}
                />
                <CounterBadge count={filteredUsers.length} label="Inscrits" />
            </HeaderAdmin>

            {/* Appel du composant enfant UserList */}
            <UserList 
                users={filteredUsers} 
                loading={loading} 
                handleToggleBan={handleToggleBan} 
                handleOpenDetail={handleOpenDetail}
            />

            {/* Modale de Détail Utilisateur */}
            <ModaleUserDetail
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
                userDetail={userDetail}
                loading={loading}
            />
        </div>
    );
};

export default AdminUsers;
