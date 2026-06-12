// src/components/Admin/User/ModaleUserDetail.jsx
import React, { useState } from 'react';
import UserDetailProductCard from './UserDetailProductCard';
import { formatLongDate } from '@/utils/formateDate';

export default function ModaleUserDetail({ isOpen, onClose, userDetail, loading }) {
    //on déclare nos state
    const [activeTab, setActiveTab] = useState('profile');

    //Vérif....
    if (!isOpen) return null;

    //on déclare nos const de confort
    const initialName = userDetail
        ? userDetail.name.charAt(0) + userDetail.lastname.charAt(0)
        : '';
    const registerDate = userDetail ? formatLongDate(userDetail.createdAt) : '';

    const products = userDetail?.products || [];
    const favorites = userDetail?.favorites || [];
    const addresses = userDetail?.addresses || [];
    const walletBalance = userDetail?.wallet?.balance ?? 0;
    const bankAccounts = userDetail?.bankAccounts || [];

    // Méthode pour le clic sur les onglets de la sidebar
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto transition-all">
            {/* Conteneur principal de la modale */}
            <div className="relative w-full max-w-4xl h-auto md:h-[600px] max-h-[90vh] bg-[#1c1c1e] border border-[#222222] rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row my-8">
                
                {/* Bouton fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/80 hover:text-white transition-colors outline-none"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* loading et erreur */}
                {loading || !userDetail ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="font-inter text-[#737373] tracking-widest uppercase text-sm animate-pulse">
                            Chargement des détails...
                        </span>
                    </div>
                ) : (
                    <>
                        {/* Sidebar de gauche */}
                        <div className="w-full md:w-64 bg-[#111111] border-r border-[#222222] flex flex-col justify-between p-6 shrink-0">
                            <div className="flex flex-col gap-6">
                                {/* Résumé de l'utilisateur */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 border border-[#333] flex items-center justify-center">
                                        <span className="font-bebas text-white text-md tracking-wider">
                                            {initialName}
                                        </span>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-bebas text-lg text-white truncate leading-tight">
                                            {userDetail.name} {userDetail.lastname}
                                        </span>
                                        <span className="font-inter text-[10px] text-[#888888] truncate">
                                            {userDetail.email}
                                        </span>
                                    </div>
                                </div>

                                <hr className="border-[#222222]" />

                                {/* Menu Sidebar */}
                                <nav className="flex flex-col gap-1.5">
                                    <button
                                        onClick={() => handleTabClick('profile')}
                                        className={`flex items-center px-4 py-2.5 rounded-xl font-bebas text-[15px] tracking-wider text-left transition-colors outline-none ${
                                            activeTab === 'profile'
                                                ? 'bg-white text-black'
                                                : 'text-[#888888] hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        Profil
                                    </button>
                                    <button
                                        onClick={() => handleTabClick('wallet')}
                                        className={`flex items-center px-4 py-2.5 rounded-xl font-bebas text-[15px] tracking-wider text-left transition-colors outline-none ${
                                            activeTab === 'wallet'
                                                ? 'bg-white text-black'
                                                : 'text-[#888888] hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        Portefeuille
                                    </button>
                                    <button
                                        onClick={() => handleTabClick('addresses')}
                                        className={`flex items-center px-4 py-2.5 rounded-xl font-bebas text-[15px] tracking-wider text-left transition-colors outline-none ${
                                            activeTab === 'addresses'
                                                ? 'bg-white text-black'
                                                : 'text-[#888888] hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        Adresses
                                    </button>
                                    <button
                                        onClick={() => handleTabClick('products')}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bebas text-[15px] tracking-wider text-left transition-colors outline-none ${
                                            activeTab === 'products'
                                                ? 'bg-white text-black'
                                                : 'text-[#888888] hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <span>Ses articles</span>
                                        <span className={`px-2 py-0.5 text-[9px] font-inter rounded-full ${
                                            activeTab === 'products' ? 'bg-black text-white' : 'bg-white/10 text-white'
                                        }`}>
                                            {products.length}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handleTabClick('favorites')}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bebas text-[15px] tracking-wider text-left transition-colors outline-none ${
                                            activeTab === 'favorites'
                                                ? 'bg-white text-black'
                                                : 'text-[#888888] hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <span>Ses favoris</span>
                                        <span className={`px-2 py-0.5 text-[9px] font-inter rounded-full ${
                                            activeTab === 'favorites' ? 'bg-black text-white' : 'bg-white/10 text-white'
                                        }`}>
                                            {favorites.length}
                                        </span>
                                    </button>
                                </nav>
                            </div>

                            {/* Footer Sidebar (Bouton Fermer) */}
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 rounded-xl border border-[#222222] text-[#888888] hover:text-white hover:border-white font-inter text-xs font-semibold transition-colors outline-none"
                            >
                                Fermer
                            </button>
                        </div>

                        {/* Section Droite : Contenu de l'onglet actif */}
                        <div className="flex-1 p-8 overflow-y-auto bg-[#1c1c1e]">
                            
                            {/* Onglet Profil */}
                            {activeTab === 'profile' && (
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h3 className="font-bebas text-2xl tracking-wider text-white">Profil & Informations</h3>
                                        <p className="font-inter text-xs text-[#888888] mt-1">Détails généraux du compte de l'utilisateur.</p>
                                    </div>
                                    <hr className="border-[#222222]" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-inter text-xs text-[#555555] uppercase">Prénom</span>
                                            <span className="font-inter text-sm text-white font-medium">{userDetail.name}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-inter text-xs text-[#555555] uppercase">Nom</span>
                                            <span className="font-inter text-sm text-white font-medium">{userDetail.lastname}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-inter text-xs text-[#555555] uppercase">Email</span>
                                            <span className="font-inter text-sm text-white font-medium">{userDetail.email}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-inter text-xs text-[#555555] uppercase">Rôle</span>
                                            <span className="font-inter text-sm text-white font-medium uppercase">{userDetail.role}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-inter text-xs text-[#555555] uppercase">Date d'inscription</span>
                                            <span className="font-inter text-sm text-white font-medium">{registerDate}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-inter text-xs text-[#555555] uppercase">Type de Boxe</span>
                                            <span className="font-inter text-sm text-white font-medium">{userDetail.boxingType || 'Non spécifié'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-inter text-xs text-[#555555] uppercase">Statut</span>
                                            <span className={`font-inter text-sm font-semibold ${userDetail.isActive ? 'text-emerald-500' : 'text-red'}`}>
                                                {userDetail.isActive ? 'Actif' : 'Banni / Inactif'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Onglet Portefeuille */}
                            {activeTab === 'wallet' && (
                                <div className="flex flex-col gap-6 h-full justify-between">
                                    <div className="flex flex-col gap-6">
                                        <div>
                                            <h3 className="font-bebas text-2xl tracking-wider text-white">Portefeuille</h3>
                                            <p className="font-inter text-xs text-[#888888] mt-1">Suivi financier et solde créditeur.</p>
                                        </div>
                                        <hr className="border-[#222222]" />
                                        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 flex flex-col gap-2">
                                            <span className="font-inter text-xs text-[#555555] uppercase">Solde disponible</span>
                                            <span className="font-inter text-4xl font-bold text-white">
                                                {walletBalance.toFixed(2)} €
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="font-bebas text-xl tracking-wider text-white mb-4">Comptes bancaires enregistrés</h4>
                                            {bankAccounts.length === 0 ? (
                                                <div className="text-[#555555] text-sm font-inter">Aucun compte bancaire enregistré.</div>
                                            ) : (
                                                <div className="grid gap-4">
                                                    {bankAccounts.map(account => (
                                                        <div key={account.id} className="bg-[#111111] border border-[#222222] p-4 rounded-xl flex justify-between items-center">
                                                            <div className="flex flex-col">
                                                                <span className="font-inter text-white font-medium text-sm">{account.bankName || 'Banque'}</span>
                                                                <span className="font-inter text-[#888] text-xs mt-1">
                                                                    **** **** **** {account.iban ? account.iban.slice(-4) : 'XXXX'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="font-inter text-[11px] text-[#555555] leading-relaxed mt-4 md:mt-0">
                                        Ce solde représente les fonds disponibles utilisables pour les achats sur le site 2ROUND ou retirables vers le compte bancaire configuré par le membre.
                                    </p>
                                </div>
                            )}

                            {/* Onglet Adresses */}
                            {activeTab === 'addresses' && (
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h3 className="font-bebas text-2xl tracking-wider text-white">Adresses enregistrées</h3>
                                        <p className="font-inter text-xs text-[#888888] mt-1">Adresses de facturation et de livraison configurées.</p>
                                    </div>
                                    <hr className="border-[#222222]" />
                                    {addresses.length === 0 ? (
                                        <div className="text-center py-10">
                                            <span className="font-inter text-sm text-[#555555]">Aucune adresse enregistrée pour ce membre.</span>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {addresses.map((addr) => (
                                                <div key={addr.id} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 flex flex-col gap-2">
                                                    <span className="font-bebas text-xs tracking-wider text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded w-fit uppercase">
                                                        {addr.type === 'SHIPPING' ? 'Livraison' : 'Facturation'}
                                                    </span>
                                                    <div className="font-inter text-sm text-[#888888] mt-2">
                                                        {addr.streetNumber && `${addr.streetNumber} `}{addr.streetName}<br />
                                                        {addr.zipCode} {addr.city}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Onglet Articles */}
                            {activeTab === 'products' && (
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h3 className="font-bebas text-2xl tracking-wider text-white">Ses articles ({products.length})</h3>
                                        <p className="font-inter text-xs text-[#888888] mt-1">Annonces actives et historique du vestiaire.</p>
                                    </div>
                                    <hr className="border-[#222222]" />
                                    {products.length === 0 ? (
                                        <div className="text-center py-10">
                                            <span className="font-inter text-sm text-[#555555]">Aucun article proposé en vente par ce membre.</span>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[380px] overflow-y-auto pr-2">
                                            {products.map((p) => (
                                                <UserDetailProductCard key={p.id} product={p} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Onglet Favoris */}
                            {activeTab === 'favorites' && (
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h3 className="font-bebas text-2xl tracking-wider text-white">Ses favoris ({favorites.length})</h3>
                                        <p className="font-inter text-xs text-[#888888] mt-1">Liste d'envies et articles favoris du membre.</p>
                                    </div>
                                    <hr className="border-[#222222]" />
                                    {favorites.length === 0 ? (
                                        <div className="text-center py-10">
                                            <span className="font-inter text-sm text-[#555555]">Aucun article enregistré dans les favoris.</span>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[380px] overflow-y-auto pr-2">
                                            {favorites.map((f) => (
                                                f.product && (
                                                    <UserDetailProductCard key={f.product.id} product={f.product} />
                                                )
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
