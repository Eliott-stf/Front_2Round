import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="font-bebas text-4xl tracking-widest text-white">Dashboard</h1>
                <p className="font-inter text-[#888888] mt-2">Bienvenue sur le centre de contrôle 2ROUND.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Exemple de métriques */}
                <div className="bg-[#111111] border border-[#222222] p-6 rounded-lg flex flex-col gap-2">
                    <span className="font-inter text-[#888888] text-sm uppercase tracking-wider">Utilisateurs</span>
                    <span className="font-bebas text-3xl text-white">--</span>
                </div>
                <div className="bg-[#111111] border border-[#222222] p-6 rounded-lg flex flex-col gap-2">
                    <span className="font-inter text-[#888888] text-sm uppercase tracking-wider">Produits Actifs</span>
                    <span className="font-bebas text-3xl text-white">--</span>
                </div>
                <div className="bg-[#111111] border border-[#222222] p-6 rounded-lg flex flex-col gap-2">
                    <span className="font-inter text-[#888888] text-sm uppercase tracking-wider">Commandes</span>
                    <span className="font-bebas text-3xl text-white">--</span>
                </div>
                <div className="bg-[#111111] border border-[#222222] p-6 rounded-lg flex flex-col gap-2">
                    <span className="font-inter text-[#888888] text-sm uppercase tracking-wider">Signalements</span>
                    <span className="font-bebas text-3xl text-[#ff4444]">--</span>
                </div>
            </div>
            
            <div className="bg-[#111111] border border-[#222222] rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <span className="font-inter text-[#555555]">Les graphiques et statistiques arriveront ici.</span>
            </div>
        </div>
    );
};

export default AdminDashboard;
