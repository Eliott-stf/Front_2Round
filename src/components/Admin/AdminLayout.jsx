import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuthContext } from '@contexts/AuthContext';
import { ROLES } from '@constants/appConstant';
import { Menu } from 'lucide-react';

const AdminLayout = () => {
    const { role } = useAuthContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Protection de la route: seuls les ADMIN et MODO peuvent accéder
    if (role !== ROLES.ADMIN && role !== 'MODO') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex min-h-screen bg-black text-white relative">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#0a0a0a]">
                {/* Topbar mobile */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-[#222222] bg-[#111111] sticky top-0 z-30">
                    <h2 className="font-bebas text-2xl tracking-widest text-white">2ROUND <span className="text-[#555555]">ADMIN</span></h2>
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -mr-2 text-white">
                        <Menu size={24} />
                    </button>
                </div>

                <div className="flex-1 p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
