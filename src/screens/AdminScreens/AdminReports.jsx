import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminReports } from '@store/admin/adminSlice';
import PageLoader from '@components/Loader/PageLoader';
import ReportList from '@components/Admin/Report/ReportList';
import ModaleReportDetail from '@components/Admin/Report/ModaleReportDetail';
import { AlertTriangle } from 'lucide-react';

export default function AdminReports() {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { reports = [], loading } = useSelector((state) => state.admin);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, OPEN, RESOLVED
    const [typeFilter, setTypeFilter] = useState('ALL'); // ALL, PRODUCT, CONVERSATION
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        dispatch(fetchAdminReports());
    }, [dispatch]);

    //on déclare nos const de confort
    const handleOpenDetail = (report) => {
        setSelectedReportId(report.id);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setSelectedReportId(null);
        setIsDetailOpen(false);
    };

    const filteredReports = reports.filter((report) => {
        // 1. Filtre par recherche textuelle (ID, email du déclarant, nom du déclarant, titre du produit)
        const query = searchQuery.toLowerCase();
        const idMatch = report.id.toLowerCase().includes(query);
        const emailMatch = report.user?.email?.toLowerCase().includes(query) || false;
        const nameMatch = report.user 
            ? `${report.user.name} ${report.user.lastname}`.toLowerCase().includes(query)
            : false;
        const productMatch = report.product?.title?.toLowerCase().includes(query) || false;
        
        const searchMatch = searchQuery === '' || idMatch || emailMatch || nameMatch || productMatch;

        // 2. Filtre par statut (OPEN, RESOLVED)
        const statusMatch = statusFilter === 'ALL' || report.status === statusFilter;

        // 3. Filtre par type (Produit, Conversation)
        const typeMatch = typeFilter === 'ALL' || 
            (typeFilter === 'PRODUCT' && report.productId) || 
            (typeFilter === 'CONVERSATION' && report.conversationId);

        return searchMatch && statusMatch && typeMatch;
    });

    //loading et erreur
    if (loading && reports.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <h1 className="font-bebas text-4xl tracking-widest text-white flex items-center gap-3">
                        <AlertTriangle size={32} className="text-red" /> Signalements
                    </h1>
                    <p className="font-inter text-[#888888] mt-2">Modération et rapports d'incidents.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                    {/* Barre de Recherche */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher ID, déclarant, article..."
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

                    {/* Filtre Cible (Produit / Conversation) */}
                    <div className="relative">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="appearance-none bg-[#111] border border-[#222] text-white font-inter text-sm rounded-full pl-5 pr-10 py-2 outline-none cursor-pointer hover:border-[#444] transition-colors"
                        >
                            <option value="ALL">Tous les types</option>
                            <option value="PRODUCT">Produits</option>
                            <option value="CONVERSATION">Conversations</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Filtre Statut (Tous / En attente / Résolu) */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-[#111] border border-[#222] text-white font-inter text-sm rounded-full pl-5 pr-10 py-2 outline-none cursor-pointer hover:border-[#444] transition-colors"
                        >
                            <option value="ALL">Tous les statuts</option>
                            <option value="OPEN">En attente (OPEN)</option>
                            <option value="RESOLVED">Résolus (RESOLVED)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Compteur */}
                    <div className="bg-[#111111] px-4 py-2 border border-[#222222] rounded-full shrink-0">
                        <span className="font-inter text-sm text-white">{filteredReports.length} Signalements</span>
                    </div>
                </div>
            </header>

            {/* Liste des signalements */}
            <ReportList 
                reports={filteredReports} 
                loading={loading} 
                handleOpenDetail={handleOpenDetail}
            />

            {/* Modale de détails du signalement */}
            <ModaleReportDetail 
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
                reportId={selectedReportId}
            />
        </div>
    );
}
