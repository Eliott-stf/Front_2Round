import React from 'react';
import { NavLink } from 'react-router-dom';
import { dataAdminSidebar } from '@constants/appConstant';
import { X } from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Overlay mobile */}
            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/80 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed md:sticky top-0 h-screen w-64 bg-[#111111] border-r border-[#222222] flex flex-col z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-4 md:p-6 border-b border-[#222222] flex items-center justify-between">
                    <h2 className="font-bebas text-2xl md:text-3xl tracking-widest text-white">2ROUND <span className="text-[#555555]">ADMIN</span></h2>
                    <button 
                        className="md:hidden p-1 text-[#888888] hover:text-white" 
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-2">
                    {dataAdminSidebar.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                end={item.path === '/admin'} // Exact match for dashboard
                                onClick={() => setIsOpen(false)}
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
        </>
    );
};

export default AdminSidebar;
