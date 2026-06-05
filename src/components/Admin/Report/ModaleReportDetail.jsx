import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminReportById, resolveAdminReport, fetchAdminUserDetail, toggleUserBan, toggleAdminProductArchive } from '@store/admin/adminSlice';
import MessageNode from '@components/Message/MessageNode';
import ModaleProductDetail from '@components/Admin/Product/ModaleProductDetail';
import ModaleUserDetail from '@components/Admin/User/ModaleUserDetail';
import UserCard from './UserCard';
import TargetElementCard from './TargetElementCard';
import { X, MessageSquare, AlertTriangle, ShieldAlert, CheckCircle, Calendar } from 'lucide-react';
import { formatDateTimeNumeric } from '@/utils/formateDate';

export default function ModaleReportDetail({ isOpen, onClose, reportId }) {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { reportDetail, userDetail, loading, error } = useSelector((state) => state.admin);
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        if (isOpen && reportId) {
            dispatch(fetchAdminReportById(reportId));
        }
    }, [isOpen, reportId, dispatch]);

    //Vérif que l'élément est ouvert
    if (!isOpen) return null;

    //loading et erreur
    if (loading && !reportDetail) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                <div className="w-full max-w-220 bg-[#111111] border border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center shadow-2xl h-[450px]">
                    <div className="w-12 h-12 border-4 border-red border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-white/70 font-inter text-sm animate-pulse uppercase tracking-widest">Chargement des données du signalement...</span>
                </div>
            </div>
        );
    }

    if (error || !reportDetail) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                <div className="w-full max-w-140 bg-[#111111] border border-red/20 rounded-3xl p-10 flex flex-col items-center justify-center shadow-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                    <ShieldAlert size={48} className="text-red mb-4 animate-bounce" />
                    <p className="text-red font-inter text-base mb-6 text-center font-medium">{error || "Erreur de chargement du dossier."}</p>
                    <button
                        onClick={onClose}
                        className="w-full h-12 bg-white text-black font-inter font-bold text-xs rounded-xl uppercase tracking-wider hover:bg-[#e5e5e5] transition-colors"
                    >
                        Fermer la fenêtre
                    </button>
                </div>
            </div>
        );
    }

    //on déclare nos const de confort
    const report = reportDetail;
    const isResolved = report.status === 'RESOLVED';
    
    const dateFormatted = formatDateTimeNumeric(report.createdAt);
    const resolvedDateFormatted = report.resolvedAt ? formatDateTimeNumeric(report.resolvedAt) : null;

    //on déclare nos const de confort
    // Type de signalement
    const motifLabel = report.typeReport?.label || 'Sans motif';
    const reportContent = report.content || 'Aucun commentaire explicatif fourni par le membre.';

    // Cible : Produit ou Conversation
    const isProductReport = !!report.productId;
    const targetProduct = report.product;
    const targetConversation = report.conversation;

    // Membre mis en cause (Signalé)
    let reportedUser = null;
    if (isProductReport) {
        reportedUser = targetProduct?.seller;
    } else if (targetConversation) {
        const isReporterBuyer = report.userId === targetConversation.buyerId;
        reportedUser = isReporterBuyer ? targetConversation.product?.seller : targetConversation.buyer;
    }

    // Méthode pour résoudre le signalement
    const handleResolve = () => {
        //Vérif que le signalement n'est pas déjà résolu
        if (isResolved) return;
        dispatch(resolveAdminReport(report.id));
    };

    // Méthode pour ouvrir le profil complet du membre
    const handleOpenUserDetail = (userId) => {
        if (!userId) return;
        dispatch(fetchAdminUserDetail(userId));
        setIsUserDetailOpen(true);
    };

    // Méthode pour toggle le ban d'un utilisateur
    const handleToggleBan = (userId) => {
        if (!userId) return;
        dispatch(toggleUserBan(userId));
    };

    // Méthode pour toggle l'archive d'un produit
    const handleToggleArchive = (productId) => {
        if (!productId) return;
        dispatch(toggleAdminProductArchive(productId));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto transition-all">
            <div className="relative w-full max-w-[1200px] bg-[#111111] border border-white/10 rounded-3xl p-8 flex flex-col my-8 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                    <X size={18} />
                </button>

                {/* En-tête du Dossier */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222] mb-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wider rounded-md border ${
                                isProductReport ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }`}>
                                Signalement {isProductReport ? 'Produit' : 'Conversation'}
                            </span>
                            <span className={`px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wider rounded-md border ${
                                isResolved ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 'border-red/20 text-red bg-red/5'
                            }`}>
                                {isResolved ? 'Traitement clos' : 'Dossier ouvert'}
                            </span>
                        </div>
                        <h2 className="font-bebas text-4xl text-white uppercase tracking-wider mt-3">Dossier de Signalement #{report.id.substring(0, 8)}</h2>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mt-1 font-inter">
                            <span className="flex items-center gap-1.5"><Calendar size={13} /> Reçu le {dateFormatted}</span>
                            {isResolved && resolvedDateFormatted && (
                                <span className="flex items-center gap-1.5 text-emerald-500"><CheckCircle size={13} /> Clôturé le {resolvedDateFormatted}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Corps de la Modale en 2 colonnes si Conversation, sinon pleine largeur */}
                <div className={`grid gap-8 ${!isProductReport && targetConversation ? 'lg:grid-cols-5' : 'grid-cols-1'}`}>
                    
                    {/* Colonne Gauche / Principale : Métadonnées du rapport */}
                    <div className={`${!isProductReport && targetConversation ? 'lg:col-span-3' : 'w-full'} flex flex-col gap-6`}>
                        
                        {/* Motif et Explications */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-white font-bebas text-xl tracking-wider border-b border-[#222] pb-2 uppercase">Nature du Signalement</h3>
                            <div className="flex flex-col gap-1 mt-1 font-inter">
                                <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Motif d'alerte</span>
                                <span className="text-red font-semibold text-lg flex items-center gap-2">
                                    <AlertTriangle size={18} /> {motifLabel}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1.5 mt-2 font-inter">
                                <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Commentaires du déclarant</span>
                                <div className="bg-[#1a1a1a] p-5 rounded-2xl text-white/90 font-light leading-relaxed border border-white/5 border-l-4 border-l-red text-[14px]">
                                    {reportContent}
                                </div>
                            </div>
                        </div>

                        {/* Fiches Profils : Déclarant & Signalé */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-white font-bebas text-xl tracking-wider border-b border-[#222] pb-2 uppercase">Protagonistes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <UserCard 
                                    user={report.user} 
                                    label="Déclarant" 
                                    type="reporter" 
                                    onClick={() => handleOpenUserDetail(report.userId)} 
                                    onToggleBan={handleToggleBan}
                                />
                                <UserCard 
                                    user={reportedUser} 
                                    label="Mis en cause" 
                                    type="reported" 
                                    onClick={() => reportedUser && handleOpenUserDetail(reportedUser.id)} 
                                    onToggleBan={handleToggleBan}
                                />
                            </div>
                        </div>

                        {/* Fiche Élément Signalé */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-white font-bebas text-xl tracking-wider border-b border-[#222] pb-2 uppercase">Élément ciblé</h3>
                            <TargetElementCard 
                                isProductReport={isProductReport}
                                targetProduct={targetProduct}
                                targetConversation={targetConversation}
                                onInspect={() => setIsProductDetailOpen(true)}
                                onToggleArchive={handleToggleArchive}
                            />
                        </div>
                    </div>

                    {/* Colonne Droite : Transcript des messages (Uniquement pour conversations) */}
                    {!isProductReport && targetConversation && (
                        <div className="lg:col-span-2 flex flex-col gap-3 min-w-0 lg:border-l lg:border-[#222] lg:pl-8 h-full">
                            <h3 className="text-white font-bebas text-xl tracking-wider pb-2 border-b border-[#222] uppercase flex items-center justify-between">
                                <span className="flex items-center gap-2"><MessageSquare size={18} className="text-gray-light" /> Échanges Clés</span>
                                <span className="text-[10px] font-inter text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full lowercase font-normal tracking-normal">
                                    {targetConversation.messages?.length || 0} messages
                                </span>
                            </h3>

                            {/* Légende Couleur pour l'Admin */}
                            <div className="flex flex-col gap-1 bg-[#1a1a1a] p-3 border border-white/5 rounded-xl text-[10px] font-inter text-white/50 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red shrink-0" />
                                    <span>Rouge : Acheteur ({targetConversation.buyer ? `${targetConversation.buyer.name}` : 'Acheteur'})</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#222222] shrink-0 border border-white/10" />
                                    <span>Gris : Vendeur ({targetConversation.product?.seller ? `${targetConversation.product.seller.name}` : 'Vendeur'})</span>
                                </div>
                            </div>

                            {/* Liste de messages */}
                            <div className="flex-1 bg-black/40 border border-[#222] rounded-2xl p-4 max-h-[500px] overflow-y-auto flex flex-col custom-scrollbar">
                                {targetConversation.messages && targetConversation.messages.length > 0 ? (
                                    targetConversation.messages.map((message) => {
                                        const isBuyerMsg = message.senderId === targetConversation.buyerId;
                                        return (
                                            <MessageNode
                                                key={message.id}
                                                isSelf={isBuyerMsg}
                                                data={{
                                                    text: message.content,
                                                    createdAt: message.createdAt
                                                }}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className="py-20 text-center text-[#555555] font-inter text-sm flex flex-col items-center justify-center gap-2">
                                        <MessageSquare size={24} className="text-white/10" />
                                        <span>Aucun message échangé</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pied de Page - Modération et Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8 pt-6 border-t border-[#222] font-inter">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {!isResolved ? (
                            <button
                                onClick={handleResolve}
                                className="flex-1 sm:flex-none h-14 bg-white text-black font-inter font-bold text-xs uppercase tracking-widest hover:bg-[#e5e5e5] transition-colors rounded-xl flex items-center justify-center gap-2 px-8 cursor-pointer"
                            >
                                <CheckCircle size={16} /> Clôturer et marquer comme résolu
                            </button>
                        ) : (
                            <div className="h-14 border border-emerald-500/20 text-emerald-500 bg-emerald-500/5 font-inter font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 px-8">
                                <CheckCircle size={16} /> Signalement résolu
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            className="flex-1 sm:flex-none h-14 border border-[#333333] bg-transparent text-white font-inter font-semibold text-xs uppercase tracking-widest hover:border-white transition-colors rounded-xl px-8 cursor-pointer"
                        >
                            Fermer le dossier
                        </button>
                    </div>
                </div>

            </div>

            {/* Modale de Détail du Produit pour l'Admin */}
            <ModaleProductDetail
                isOpen={isProductDetailOpen}
                onClose={() => setIsProductDetailOpen(false)}
                product={isProductReport ? targetProduct : targetConversation?.product}
            />

            {/* Modale de Détail de l'Utilisateur pour l'Admin */}
            <ModaleUserDetail
                isOpen={isUserDetailOpen}
                onClose={() => setIsUserDetailOpen(false)}
                userDetail={userDetail}
                loading={loading}
            />
        </div>
    );
}
