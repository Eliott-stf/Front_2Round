import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminDashboardStats, fetchAdminUserDetail } from '@store/admin/adminSlice';
import PageLoader from '@components/Loader/PageLoader';
import ModaleUserDetail from '@components/Admin/User/ModaleUserDetail';
import ModaleOrderDetail from '@components/Admin/Order/ModaleOrderDetail';
import ModaleReportDetail from '@components/Admin/Report/ModaleReportDetail';
import DashboardCard from '@components/Admin/Dashboard/DashboardCard';
import CategoryDistribution from '@components/Admin/Dashboard/CategoryDistribution';
import RecentOrdersTab from '@components/Admin/Dashboard/RecentOrdersTab';
import RecentUsersTab from '@components/Admin/Dashboard/RecentUsersTab';
import RecentReportsTab from '@components/Admin/Dashboard/RecentReportsTab';
import HeaderAdmin from '@components/Admin/UI/HeaderAdmin';
import { 
    Users, 
    ShoppingBag, 
    TrendingUp, 
    AlertTriangle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ADMIN_DASHBOARD_TABS, 
    DEFAULT_DASHBOARD_METRICS, 
    ADMIN_DASHBOARD_CONTAINER_VARIANTS 
} from '@/constants/appConstant';

const AdminDashboard = () => {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { dashboardStats, userDetail, loading } = useSelector((state) => state.admin);
    const [activeTab, setActiveTab] = useState('orders'); 
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedReportId, setSelectedReportId] = useState(null);

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        dispatch(fetchAdminDashboardStats());
    }, [dispatch]);

    //Méthode pour ouvrir la modale utilisateur
    const handleOpenUserDetail = (userId) => {
        dispatch(fetchAdminUserDetail(userId));
        setIsUserModalOpen(true);
    };

    //Méthode pour ouvrir la modale commande
    const handleOpenOrderDetail = (order) => {
        setSelectedOrder(order);
        setIsOrderModalOpen(true);
    };

    //Méthode pour ouvrir la modale de signalement
    const handleOpenReportDetail = (reportId) => {
        setSelectedReportId(reportId);
        setIsReportModalOpen(true);
    };

    //loading et erreur
    if (loading && !dashboardStats) {
        return <PageLoader />;
    }

    //on déclare nos const de confort
    const metrics = dashboardStats?.metrics || DEFAULT_DASHBOARD_METRICS;
    const recentOrders = dashboardStats?.recentOrders || [];
    const recentUsers = dashboardStats?.recentUsers || [];
    const recentReports = dashboardStats?.recentReports || [];
    const categoryDistribution = dashboardStats?.categoryDistribution || [];

    const totalProductsCount = categoryDistribution.reduce((sum, cat) => sum + cat.count, 0);

    return (
        <motion.div 
            className="flex flex-col gap-8"
            variants={ADMIN_DASHBOARD_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <HeaderAdmin 
                title="Tableau de bord" 
                subtitle="Bienvenue sur le centre de contrôle et d'analyse 2ROUND."
            >
                <div className="hidden sm:flex items-center gap-2 bg-[#111] px-4 py-2 rounded-full border border-[#222]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-inter text-xs text-[#888888]">Système opérationnel</span>
                </div>
            </HeaderAdmin>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Utilisateurs */}
                <DashboardCard
                    title="Membres"
                    value={metrics.totalUsers}
                    icon={Users}
                    iconBgClass="bg-[#1e1a11] border-[#d97706]/20 text-[#d97706]"
                    trendPrefix="+"
                    trendValue={metrics.newUsersThisWeek}
                    trendSuffix=" cette semaine"
                    trendColorClass="text-emerald-500"
                />

                {/* Produits */}
                <DashboardCard
                    title="Catalogue"
                    value={metrics.totalProducts}
                    icon={ShoppingBag}
                    iconBgClass="bg-[#111c1e] border-[#0ea5e9]/20 text-[#0ea5e9]"
                    trendValue={metrics.activeProducts}
                    trendSuffix=" articles en ligne"
                    trendColorClass="text-[#0ea5e9]"
                />

                {/* Chiffre d'affaires */}
                <DashboardCard
                    title="Ventes globales"
                    value={`${metrics.totalSalesVolume.toLocaleString('fr-FR')} €`}
                    icon={TrendingUp}
                    iconBgClass="bg-[#111e15] border-emerald-500/20 text-emerald-500"
                    trendValue={metrics.totalOrders}
                    trendSuffix=" commandes finalisées"
                    trendColorClass="text-emerald-500"
                />

                {/* Signalements */}
                <DashboardCard
                    title="Signalements"
                    value={metrics.pendingReports}
                    icon={AlertTriangle}
                    iconBgClass={metrics.pendingReports > 0 ? "bg-[#221111] border-red/20 text-[#ff4444]" : "bg-[#1e1e1e] border-[#333] text-[#888]"}
                    actionRequiredText={metrics.pendingReports > 0 ? "Action requise" : "Aucun signalement en attente"}
                    actionRequiredColorClass={metrics.pendingReports > 0 ? "text-[#ff4444]" : "text-[#888]"}
                    isWarningValue={metrics.pendingReports > 0}
                />

            </div>

            {/* Split layout: Recent Activities & Category breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Side: Interactive Tabs for recent updates (2/3 width) */}
                <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-lg p-6 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#222] pb-4 mb-6 gap-4">
                        <h2 className="font-bebas text-2xl tracking-wider text-white">Activité Récente</h2>
                        
                        {/* Tab Buttons */}
                        <div className="flex gap-1.5 bg-black p-1 rounded-full border border-[#222]">
                            {ADMIN_DASHBOARD_TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-1.5 rounded-full font-inter text-xs transition-all outline-none ${
                                        activeTab === tab.id 
                                            ? 'bg-[#222] text-white font-medium' 
                                            : 'text-[#888] hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 min-h-[350px]">
                        <AnimatePresence mode="wait">
                            
                            {/* Tab 1: Recent Orders */}
                            {activeTab === 'orders' && (
                                <RecentOrdersTab
                                    key="orders"
                                    recentOrders={recentOrders}
                                    handleOpenOrderDetail={handleOpenOrderDetail}
                                />
                            )}

                            {/* Tab 2: Recent Inscriptions */}
                            {activeTab === 'users' && (
                                <RecentUsersTab
                                    key="users"
                                    recentUsers={recentUsers}
                                    handleOpenUserDetail={handleOpenUserDetail}
                                />
                            )}

                            {/* Tab 3: Recent Reports */}
                            {activeTab === 'reports' && (
                                <RecentReportsTab
                                    key="reports"
                                    recentReports={recentReports}
                                    handleOpenReportDetail={handleOpenReportDetail}
                                />
                            )}

                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: Category distribution (1/3 width) */}
                <CategoryDistribution
                    categoryDistribution={categoryDistribution}
                    totalProductsCount={totalProductsCount}
                />

            </div>

            {/* User detail CRM modal */}
            <ModaleUserDetail
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                userDetail={userDetail}
                loading={loading}
            />

            {/* Order detail modal */}
            <ModaleOrderDetail
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                order={selectedOrder}
            />

            {/* Report detail modal */}
            <ModaleReportDetail
                isOpen={isReportModalOpen}
                onClose={() => {
                    setIsReportModalOpen(false);
                    // On recharge les stats après fermeture de la modale en cas de ban/archive d'éléments
                    dispatch(fetchAdminDashboardStats());
                }}
                reportId={selectedReportId}
            />

        </motion.div>
    );
};

export default AdminDashboard;
