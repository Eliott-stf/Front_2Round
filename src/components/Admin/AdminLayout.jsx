import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuthContext } from '@contexts/AuthContext';
import { ROLES } from '@constants/appConstant';

const AdminLayout = () => {
    const { role } = useAuthContext();

    // Protection de la route: seuls les ADMIN et MODO peuvent accéder
    if (role !== ROLES.ADMIN && role !== 'MODO') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex min-h-screen bg-black text-white">
            <AdminSidebar />
            
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#0a0a0a]">
                {/* On pourrait rajouter une Topbar admin ici si besoin */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
