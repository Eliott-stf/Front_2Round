import React from 'react';
import { NavLink } from 'react-router-dom';
import { dataAdminSidebar } from '@constants/appConstant';

const AdminSidebar = () => {
    return (
        <aside className="w-64 bg-[#111111] border-r border-[#222222] min-h-screen flex flex-col hidden md:flex sticky top-0 h-screen">
            <div className="p-6 border-b border-[#222222]">
                <h2 className="font-bebas text-3xl tracking-widest text-white">2ROUND <span className="text-[#555555]">ADMIN</span></h2>
            </div>
            
            <nav className="flex-1 px-4 py-8 space-y-2">
                {dataAdminSidebar.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.path === '/admin'} // Exact match for dashboard
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                                    isActive 
                                    ? 'bg-white text-black font-semibold' 
                                    : 'text-[#888888] hover:bg-[#222222] hover:text-white'
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span className="font-inter tracking-wide">{item.title}</span>
                        </NavLink>
                    );
                })}
            </nav>
            
            <div className="p-6 border-t border-[#222222]">
                <p className="font-inter text-xs text-[#555555] text-center">
                    BackOffice 2ROUND v1.0
                </p>
            </div>
        </aside>
    );
};

export default AdminSidebar;
