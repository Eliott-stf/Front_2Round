import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminReports } from '@store/admin/adminSlice';
import PageLoader from '@components/Loader/PageLoader';
import ReportList from '@components/Admin/Report/ReportList';
import ModaleReportDetail from '@components/Admin/Report/ModaleReportDetail';
import { AlertTriangle } from 'lucide-react';
import HeaderAdmin from '@components/Admin/UI/HeaderAdmin';
import SearchBar from '@components/Admin/UI/SearchBar';
import FilterSelect from '@components/Admin/UI/FilterSelect';
import CounterBadge from '@components/Admin/UI/CounterBadge';
import { REPORT_TYPE_FILTER_OPTIONS, REPORT_STATUS_FILTER_OPTIONS } from '@/constants/appConstant';



export default function AdminReports() {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { reports = [], loading } = useSelector((state) => state.admin);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [typeFilter, setTypeFilter] = useState('ALL');
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        dispatch(fetchAdminReports());
    }, [dispatch]);

    //méthode pour ouvrir le détail
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
            <HeaderAdmin
                title="Signalements"
                subtitle="Modération et rapports d'incidents."
                icon={AlertTriangle}
            >
                <SearchBar
                    placeholder="Rechercher ID, déclarant, article..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FilterSelect
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    options={REPORT_TYPE_FILTER_OPTIONS}
                />
                <FilterSelect
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={REPORT_STATUS_FILTER_OPTIONS}
                />
                <CounterBadge count={filteredReports.length} label="Signalements" />
            </HeaderAdmin>

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
