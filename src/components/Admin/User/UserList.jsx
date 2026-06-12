import React from 'react';
import UserCard from './UserCard';
import UserCardSkeleton from '@components/Loader/UserCardSkeleton';

const UserList = ({ users, loading, handleToggleBan, handleOpenDetail }) => {
    return (
        <div className="bg-[#111111] border border-[#222222] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#222222] bg-[#0a0a0a]">
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Membre</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Rôle</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222]">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, idx) => (
                                <UserCardSkeleton key={idx} />
                            ))
                        ) : (
                            users.map((user) => (
                                <UserCard 
                                    key={user.id} 
                                    user={user} 
                                    handleToggleBan={handleToggleBan} 
                                    handleOpenDetail={handleOpenDetail} 
                                />
                            ))
                        )}
                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-[#555555] font-inter">
                                    Aucun utilisateur trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
