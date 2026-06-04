//on récup le hook
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, toggleUserBan, fetchAdminUserDetail } from '@store/admin/adminSlice';
import PageLoader from '@components/Loader/PageLoader';
import UserList from '@components/Admin/User/UserList';
import ModaleUserDetail from '@components/Admin/User/ModaleUserDetail';

const AdminUsers = () => {
    //on récup le hook
    const dispatch = useDispatch();
    
    //on déclare nos state
    const { users, userDetail, loading } = useSelector((state) => state.admin);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

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

    //loading et erreur
    if (loading && users.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="font-bebas text-4xl tracking-widest text-white">Utilisateurs</h1>
                    <p className="font-inter text-[#888888] mt-2">Gestion des membres de la communauté.</p>
                </div>
                <div className="bg-[#111111] px-4 py-2 border border-[#222222] rounded-full">
                    <span className="font-inter text-sm text-white">{users.length} Inscrits</span>
                </div>
            </header>

            {/* Appel du composant enfant UserList */}
            <UserList 
                users={users} 
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
