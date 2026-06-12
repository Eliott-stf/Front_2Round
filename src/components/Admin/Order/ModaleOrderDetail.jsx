// src/components/Admin/Order/ModaleOrderDetail.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cancelAdminOrder } from '@store/admin/adminSlice';
import { API_ROOT } from '@constants/apiConstant';
import { ORDER_STATUS_MAP } from '@constants/appConstant';
import { formatFullDate } from '@/utils/formateDate';
import { slugify } from '@/utils/slugify';

export default function ModaleOrderDetail({ isOpen, onClose, order }) {
    //on récup le hook
    const dispatch = useDispatch();

    //Vérif....
    if (!isOpen || !order) return null;

    //on déclare nos const de confort
    const dateFormatted = formatFullDate(order.createdAt);

    const getFileUrl = (path) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `${API_ROOT}${path}`;
    };

    const buyerName = order.buyer
        ? `${order.buyer.name} ${order.buyer.lastname}`
        : 'Inconnu';
    const buyerEmail = order.buyer?.email || 'N/A';

    const statusStyle = ORDER_STATUS_MAP[order.status] || { label: order.status, color: 'border-white text-white' };
    const items = order.items || [];

    const invoicePath = order.factures?.find(f => f.type === 'INVOICE')?.path;
    const cancellationInvoicePath = order.factures?.find(f => f.type === 'REFUND')?.path;

    const AddressBlock = ({ title, address }) => {
        if (!address) return (
            <div>
                <span className="font-inter text-xs text-[#555555] uppercase block mb-1">{title}</span>
                <span className="font-inter text-xs text-[#888888]">Non spécifiée</span>
            </div>
        );

        return (
            <div>
                <span className="font-inter text-xs text-[#555555] uppercase block mb-1">{title}</span>
                <div className="bg-[#111] p-3 rounded-lg border border-[#222] text-xs text-[#888888] font-inter">
                    {address.streetNumber && `${address.streetNumber} `}{address.streetName}<br />
                    {address.zipCode} {address.city}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto transition-all">
            {/* Conteneur principal de la modale */}
            <div className="relative w-full max-w-4xl bg-[#1c1c1e] border border-[#222222] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]">
                
                {/* Bouton fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/80 hover:text-white transition-colors outline-none"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Contenu modale */}
                <div className="p-8 flex flex-col gap-6 overflow-y-auto">
                    
                    {/* En-tête : Référence et Statut */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                            <span className="font-inter text-xs text-[#555555] uppercase tracking-wider block">Commande</span>
                            <h2 className="font-bebas text-3xl tracking-wide text-white">
                                {order.reference}
                            </h2>
                            <span className="font-inter text-xs text-[#888888] mt-1 block">
                                Passée le {dateFormatted}
                            </span>
                        </div>
                        <span className={`w-fit px-3 py-1 text-sm font-inter uppercase tracking-wider border rounded-md font-medium ${statusStyle.color}`}>
                            {statusStyle.label}
                        </span>
                    </div>

                    <hr className="border-[#222222]" />

                    {/* Section 1 : Acheteur & Adresses */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Acheteur */}
                        <div>
                            <span className="font-inter text-xs text-[#555555] uppercase block mb-1">Acheteur</span>
                            <div className="bg-[#111] p-3 rounded-lg border border-[#222] flex flex-col gap-0.5">
                                <span className="font-inter text-sm text-white font-medium">{buyerName}</span>
                                <span className="font-inter text-xs text-[#888888]">{buyerEmail}</span>
                            </div>
                        </div>

                        {/* Adresse Livraison */}
                        <AddressBlock title="Adresse de livraison" address={order.shippingAddress} />

                        {/* Adresse Facturation */}
                        <AddressBlock title="Adresse de facturation" address={order.billingAddress} />

                    </div>

                    <hr className="border-[#222222]" />

                    {/* Section 2 : Articles Commandés */}
                    <div className="flex flex-col gap-3">
                        <span className="font-inter text-xs text-[#555555] uppercase block">Articles commandés ({items.length})</span>
                        
                        <div className="flex flex-col gap-3">
                            {items.map((item) => {
                                const product = item.product;
                                if (!product) return null;

                                const medias = product.medias || [];
                                const imagePath = medias.length > 0
                                    ? (medias[0].path.startsWith('http') ? medias[0].path : `${API_ROOT}${medias[0].path}`)
                                    : '/images/placeholder.jpg';

                                const sellerName = product.seller
                                    ? `${product.seller.name} ${product.seller.lastname}`
                                    : 'Inconnu';

                                return (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#111] rounded-2xl border border-[#222]">
                                        
                                        {/* Image & Infos de l'article */}
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#222] shrink-0">
                                                <img src={imagePath} alt={product.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <Link 
                                                    to={`/product/${slugify(product.title)}-${product.id}`}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="font-inter text-sm text-white font-semibold hover:text-red transition-colors truncate"
                                                >
                                                    {product.title}
                                                </Link>
                                                <span className="font-inter text-xs text-[#555555] mt-0.5">
                                                    Vendeur : <span className="text-[#888888]">{sellerName} ({product.seller?.email || 'N/A'})</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Prix & Quantité */}
                                        <div className="flex items-center gap-6 self-end sm:self-center">
                                            <div className="text-right">
                                                <span className="font-inter text-xs text-[#555555] block">Quantité</span>
                                                <span className="font-inter text-sm text-white font-medium">{item.quantity}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-inter text-xs text-[#555555] block">Prix total</span>
                                                <span className="font-inter text-sm text-white font-semibold">
                                                    {(item.unitPriceAtPurchase * item.quantity).toFixed(2)} €
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <hr className="border-[#222222]" />

                    {/* Total Commande */}
                    <div className="flex justify-between items-center bg-[#111] p-4 rounded-2xl border border-[#222]">
                        <span className="font-bebas text-lg tracking-wider text-[#888888]">Total payé</span>
                        <span className="font-inter text-2xl font-bold text-white">
                            {order.totalAmount.toFixed(2)} €
                        </span>
                    </div>

                    {/* Documents */}
                    {(invoicePath || cancellationInvoicePath) && (
                        <>
                            <hr className="border-[#222222]" />
                            <div className="flex flex-col gap-3">
                                <span className="font-inter text-xs text-[#555555] uppercase block">Documents</span>
                                <div className="flex gap-4">
                                    {invoicePath && (
                                        <a href={getFileUrl(invoicePath)} target="_blank" rel="noopener noreferrer" className="text-sm font-inter text-[#888] hover:text-white underline transition-colors">
                                            Télécharger la facture
                                        </a>
                                    )}
                                    {cancellationInvoicePath && (
                                        <a href={getFileUrl(cancellationInvoicePath)} target="_blank" rel="noopener noreferrer" className="text-sm font-inter text-red hover:text-red/80 underline transition-colors">
                                            Facture d'annulation
                                        </a>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                </div>

                {/* Actions de pied de page */}
                <div className="p-6 bg-[#161618] border-t border-[#222222] flex justify-between items-center">
                    {/* Bouton Annulation et Remboursement */}
                    {order.status === 'PAID' ? (
                        <button
                            onClick={() => {
                                if (window.confirm("Êtes-vous sûr de vouloir annuler et rembourser cette commande ? Cette action est irréversible.")) {
                                    dispatch(cancelAdminOrder(order.id));
                                    onClose();
                                }
                            }}
                            className="px-6 py-2 rounded-full border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white font-inter text-sm font-semibold transition-colors outline-none"
                        >
                            Annuler & Rembourser
                        </button>
                    ) : (
                        <div></div> // Placeholder pour flex-between
                    )}

                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full border border-[#222] text-[#888] hover:text-white hover:border-white font-inter text-sm font-semibold transition-colors outline-none"
                    >
                        Fermer
                    </button>
                </div>

            </div>
        </div>
    );
}
