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
    const [searchQuery, setSearchQuery] = useState('');

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
        return fullName.includes(search);
    });

    //loading et erreur
    if (loading && users.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-bebas text-4xl tracking-widest text-white">Utilisateurs</h1>
                    <p className="font-inter text-[#888888] mt-2">Gestion des membres de la communauté.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Barre de Recherche */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
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

                    <div className="bg-[#111111] px-4 py-2 border border-[#222222] rounded-full shrink-0">
                        <span className="font-inter text-sm text-white">{filteredUsers.length} Inscrits</span>
                    </div>
                </div>
            </header>

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
