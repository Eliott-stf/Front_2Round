import { AlertTriangle, Heart, Home, LayoutDashboard, LogIn, LogInIcon, LogOut, Mail, MapPin, Menu, Package, Paperclip, Phone, Send, Settings, ShoppingBag, User, UserPlus, Users, Wallet } from "lucide-react";

// ====================
// CLE DU LOCAL STORAGE
// ====================
export const USER_INFOS = 'user_infos';
//MES ROLES
export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
}

// ====================
// NAVBAR
// ====================
export const dataNavbarAuth = [
    {
        icon: User,
        options: [
            { title: "Mon round personnalisé", path: "/round", icon: ShoppingBag },
            { title: "Mon vestiaire", path: "/profil", icon: Settings },
            { title: "Mon portefeuille", path: "/wallet", icon: Wallet },
            { title: "Mes commandes", path: "/order", icon: Package },
            { title: "Mes favoris", path: "/favorite", icon: Heart },
        ]
    },
    {
        path: "/messages",
        icon: Send
    },
    {
        icon: Menu,
        options: [
            { title: "Support", path: "/support" },
            { title: "Contact", path: "#contact-footer" },
            { title: "Déconnexion", isLogout: true, icon: LogOut }
        ]
    },
];

export const dataNavbarGuest = [
    {
        icon: User,
        options: [
            { title: "Me connecter", path: "/login", icon: LogInIcon },
            { title: "M'inscrire", path: "/register", icon: Paperclip },
        ]
    },
    {
        path: "/messages",
        icon: Send
    },
    {
        icon: Menu,
        options: [
            { title: "Support", path: "/support" },
            { title: "Contact", path: "#contact-footer" },
        ]
    },
];

// ====================
// ADMIN SIDEBAR
// ====================
export const dataAdminSidebar = [
    { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { title: "Utilisateurs", path: "/admin/users", icon: Users },
    { title: "Produits", path: "/admin/products", icon: Package },
    { title: "Commandes", path: "/admin/orders", icon: ShoppingBag },
    { title: "Signalements", path: "/admin/reports", icon: AlertTriangle },
    { title: "Retour au site", path: "/", icon: Home }
];

export const footerStaticLinks = [
    { title: "Les Packs", path: "/packs" },
    { title: "Les Guides", path: "/guides" },
    { title: "Assistance & FAQ", path: "/support" }
];

export const footerGuestLinks = [
    { title: "Créer mon profil", path: "/inscription" },
    { title: "Se connecter", path: "/connexion" },
    { title: "Commencer à vendre", path: "/vendre" }
];

export const footerAuthLinks = [
    {
        title: "MON ROUND PERSO",
        links: [
            { title: "Pack personnalisé", path: "/profil/pack" },
            { title: "Favoris", path: "/profil/favoris" },
            { title: "Portefeuille", path: "/profil/portefeuille" }
        ]
    },
    {
        title: "MON VESTIAIRE",
        links: [
            { title: "Articles", path: "/vestiaire/articles" },
            { title: "Évaluations", path: "/vestiaire/evaluations" },
            { title: "Historique des ventes", path: "/vestiaire/ventes" }
        ]
    }
];

export const footerContact = [
    { title: "+33 4 68 00 00 00", path: "tel:+33468000000", icon: Phone },
    { title: "contact@2round.fr", path: "mailto:contact@2round.fr", icon: Mail },
    { title: "Perpignan, 66000 France", path: "#", icon: MapPin }
];

export const BOXING_TYPES = ['Boxe Anglaise', 'Muay Thai', 'Kick Boxing', 'Boxe Française', 'MMA'];

export const PRODUCT_CONDITIONS = [
    { value: 'NEW', label: 'Neuf' },
    { value: 'VERY_GOOD', label: 'Très bon état' },
    { value: 'GOOD', label: 'Bon état' },
    { value: 'FAIR', label: 'État correct' }
];

//Const d'aniamtion 
export const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (direction) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    }),
};

//const de theme STRIPE
export const stripeAppearance = {
    theme: 'night',
    variables: {
        colorBackground: '#111111',
        colorDanger: '#eb001b',
        colorText: '#ffffff',
        colorPrimary: '#ffffff',
        borderRadius: '12px',
        colorBorder: '#222222',
    },
};

//const page home guidesSection
export const HOME_GUIDES = [
    {
        id: 1,
        title: "LES TAILLES",
        desc: "Trouver la bonne taille selon son corps.",
        img: "/images/taille.png"
    },
    {
        id: 2,
        title: "LES ÉQUIPEMENTS",
        desc: "Comprendre chaque équipement et à quoi il sert.",
        img: "/images/altere.png"
    },
    {
        id: 3,
        title: "BIEN DÉBUTER",
        desc: "Conseil sécurité et entrainement.",
        img: "/images/coeur.png"
    }
];

// Définition globale des statuts de commande
export const ORDER_STATUS_MAP = {
    PENDING_PAYMENT: { label: 'Paiement en attente', color: 'text-[#737373] border-[#737373]' },
    PAID: { label: 'Payée', color: 'text-emerald-500 border-emerald-500' },
    SHIPPED: { label: 'Expédiée', color: 'text-blue-500 border-blue-500' },
    DELIVERED: { label: 'Livrée', color: 'text-emerald-500 border-emerald-500' },
    CANCELLED: { label: 'Annulée', color: 'text-red border-red' },
    REFUNDED: { label: 'Remboursée', color: 'text-orange-500 border-orange-500' },
};

// ====================
// CATALOGUE FILTRES
// ====================
export const SIZES_CLOTHING = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' }
];

export const SIZES_GLOVES = [
    { value: '8oz', label: '8oz' },
    { value: '10oz', label: '10oz' },
    { value: '12oz', label: '12oz' },
    { value: '14oz', label: '14oz' },
    { value: '16oz', label: '16oz' }
];

export const SIZES_SHOES = [
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' }
];

export const CATALOGUE_PRICES = [
    { value: '1-20', label: '0€ - 20€', minPrice: 1, maxPrice: 20 },
    { value: '20-50', label: '20€ - 50€', minPrice: 20, maxPrice: 50 },
    { value: '50-100', label: '50€ - 100€', minPrice: 50, maxPrice: 100 },
    { value: '100+', label: '100€ et plus', minPrice: 100, maxPrice: '' }
];

// ====================
// ADMIN DASHBOARD
// ====================
export const ADMIN_DASHBOARD_TABS = [
    { id: 'orders', label: 'Commandes récentes' },
    { id: 'users', label: 'Inscriptions' },
    { id: 'reports', label: 'Signalements ouverts' }
];

export const DEFAULT_DASHBOARD_METRICS = {
    totalUsers: 0,
    newUsersThisWeek: 0,
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    totalSalesVolume: 0,
    pendingReports: 0
};

export const ADMIN_DASHBOARD_CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const ADMIN_DASHBOARD_CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};