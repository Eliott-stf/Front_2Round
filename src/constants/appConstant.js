import { AlertTriangle, Banknote, FolderOpen, Heart, Home, LayoutDashboard, LogIn, LogInIcon, LogOut, Mail, MapPin, Menu, Package, Paperclip, Phone, Recycle, Send, Settings, ShoppingBag, User, UserPlus, Users, Wallet } from "lucide-react";

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
    { title: "Catégories", path: "/admin/categories", icon: FolderOpen },
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

export const REPORT_TYPE_FILTER_OPTIONS = [
    { value: 'ALL', label: 'Tous les types' },
    { value: 'PRODUCT', label: 'Produits' },
    { value: 'CONVERSATION', label: 'Conversations' }
];

export const REPORT_STATUS_FILTER_OPTIONS = [
    { value: 'ALL', label: 'Tous les statuts' },
    { value: 'OPEN', label: 'En attente (OPEN)' },
    { value: 'RESOLVED', label: 'Résolus (RESOLVED)' }
];

export const USER_STATUS_FILTER_OPTIONS = [
    { value: 'ALL', label: 'Tous les membres' },
    { value: 'ACTIVE', label: 'Actifs uniquement' },
    { value: 'BANNED', label: 'Bannis uniquement' }
];

export const PRODUCT_STATUS_FILTER_OPTIONS = [
    { value: 'ALL', label: 'Tous les statuts' },
    { value: 'AVAILABLE', label: 'Disponibles' },
    { value: 'ARCHIVED', label: 'Archivés' },
    { value: 'PENDING', label: 'En attente' }
];

export const ORDER_STATUS_FILTER_OPTIONS = [
    { value: 'PENDING_PAYMENT', label: 'Paiement en attente' },
    { value: 'PAID', label: 'Payée' },
    { value: 'SHIPPED', label: 'Expédiée' },
    { value: 'DELIVERED', label: 'Livrée' },
    { value: 'CANCELLED', label: 'Annulée' },
    { value: 'REFUNDED', label: 'Remboursée' }
];

//Const de ResellSection 
export const TAGS = [
    "GAGNE DE L'ARGENT",
    "AIDE UN BOXEUR",
    "ÉVITE LE GASPILLAGE",
    "VENTE SIMPLE ET RAPIDE"
];

//Const de InfoSection de Resell
export const FEATURES = [
    {
        icon: Banknote,
        title: "GAGNE DE L'ARGENT",
        description: "Ton ancien matériel devient un nouveau budget."
    },
    {
        icon: Users,
        title: "AIDE",
        description: "Un boxeur peut s'équiper à moindre coût."
    },
    {
        icon: Recycle,
        title: "ÉVITE LE GASPILLAGE",
        description: "Moins de déchets, plus d'impact."
    }
];

//Const de TutoSection de Resell
export const RESELL_TUTO = {
    TITLE: "LEÇON DE TECHNIQUE",
    STEPS: {
        STEP_1: {
            TITLE: "ÉTAPE 1 : LA GARDE",
            SUBTITLE: "Choisis ton équipement",
            DESC: "Gants, casque, vêtements, sac..."
        },
        STEP_2: {
            TITLE: "ÉTAPE 2 : GAUCHE",
            SUBTITLE: "Décris son état",
            DESC: "Taille, usage, état général."
        },
        STEP_3: {
            TITLE: "ÉTAPE 3 : DROITE",
            SUBTITLE: "Ajoute des photos",
            DESC: "Pour rassurer l'acheteur."
        },
        STEP_4: {
            TITLE: "ÉTAPE 4 : UPERCUT",
            SUBTITLE: "Mets en ligne",
            DESC: "Ton équipement est visible immédiatement."
        }
    },
    CONCLUSION: "UN ENCHAÎNEMENT FACILE, SIMPLE ET EFFICACE",
    BUTTON: "COMMENCER À VENDRE"
};

export const GUIDE_DATA = [
    {
        title: "GUIDE DES TAILLES",
        modalId: "taille"
    },
    {
        title: "GUIDE DES ÉQUIPEMENTS",
        modalId: "equipement"
    },
    {
        title: "GUIDE DÉMARRER LA BOXE",
        modalId: "boxe"
    }
];

export const GUIDE_SIZES = {
    GANTS: {
        label: "GANTS DE BOXE",
        type: 'table',
        columns: ['Poids (kg)', 'Entraînement', 'Sparring'],
        data: {
            HOMME: [
                { col1: "< 50 kg", col2: "8 oz", col3: "10 oz" },
                { col1: "51 - 63 kg", col2: "10 oz", col3: "12 oz" },
                { col1: "64 - 74 kg", col2: "12 oz", col3: "14 oz" },
                { col1: "75 - 90 kg", col2: "14 oz", col3: "16 oz" },
                { col1: "> 90 kg", col2: "16 oz", col3: "18 oz" }
            ],
            FEMME: [
                { col1: "< 50 kg", col2: "8 oz", col3: "10 oz" },
                { col1: "51 - 63 kg", col2: "10 oz", col3: "12 oz" },
                { col1: "64 - 74 kg", col2: "10 oz", col3: "14 oz" },
                { col1: "75 - 90 kg", col2: "12 oz", col3: "14 oz" },
                { col1: "> 90 kg", col2: "14 oz", col3: "16 oz" }
            ]
        }
    },
    CHAUSSURES: {
        label: "CHAUSSURES",
        type: 'table',
        columns: ['Pointure EU', 'Longueur Pied (cm)', 'Pointure US'],
        data: {
            HOMME: [
                { col1: "39", col2: "24.5 cm", col3: "6.5" },
                { col1: "40", col2: "25 cm", col3: "7" },
                { col1: "41", col2: "26 cm", col3: "8" },
                { col1: "42", col2: "26.5 cm", col3: "8.5" },
                { col1: "43", col2: "27.5 cm", col3: "9.5" },
                { col1: "44", col2: "28 cm", col3: "10" }
            ],
            FEMME: [
                { col1: "36", col2: "22.5 cm", col3: "5.5" },
                { col1: "37", col2: "23 cm", col3: "6" },
                { col1: "38", col2: "24 cm", col3: "7" },
                { col1: "39", col2: "24.5 cm", col3: "7.5" },
                { col1: "40", col2: "25 cm", col3: "8" },
                { col1: "41", col2: "26 cm", col3: "9" }
            ]
        }
    },
    CASQUE: {
        label: "CASQUES",
        type: 'table',
        columns: ['Tour de Tête (cm)', 'Taille Casque', 'Poids indicatif'],
        data: {
            HOMME: [
                { col1: "52 - 54 cm", col2: "S", col3: "< 55 kg" },
                { col1: "55 - 57 cm", col2: "M", col3: "55 - 70 kg" },
                { col1: "58 - 60 cm", col2: "L", col3: "70 - 85 kg" },
                { col1: "> 60 cm", col2: "XL", col3: "> 85 kg" }
            ],
            FEMME: [
                { col1: "52 - 54 cm", col2: "S", col3: "< 55 kg" },
                { col1: "55 - 57 cm", col2: "M", col3: "55 - 70 kg" },
                { col1: "58 - 60 cm", col2: "L", col3: "70 - 85 kg" },
                { col1: "> 60 cm", col2: "XL", col3: "> 85 kg" }
            ]
        }
    },
    BANDES: {
        label: "BANDES",
        type: 'text',
        content: [
            { title: "2.5m à 3m", desc: "Idéal pour les petits gants, les entraînements légers (sac de frappe, pattes d'ours) ou pour les petites mains." },
            { title: "4m à 4.5m", desc: "Recommandé pour le sparring. Offre une bien meilleure protection des articulations et un excellent maintien du poignet." }
        ]
    }
};

export const GUIDE_EQUIPMENTS_CONTENT = [
    { title: "LES GANTS", desc: "Accessoire indispensable. Protègent vos mains et votre partenaire. Ils existent en plusieurs tailles (oz)." },
    { title: "LES BANDES", desc: "Maintiennent les articulations de la main et du poignet, et absorbent la transpiration." },
    { title: "LE CASQUE", desc: "Essentiel pour le sparring, il protège des chocs à la tête (pommettes, crâne, menton)." },
    { title: "LES CHAUSSURES", desc: "Légères et montantes, elles offrent de bons appuis et maintiennent la cheville." },
    { title: "LE PROTÈGE-DENTS", desc: "Obligatoire. Il protège les dents, les mâchoires et réduit le risque de commotion." }
];

export const GUIDE_BOXE_CONTENT = [
    { title: "1. L'ÉQUIPEMENT DE BASE", desc: "Pas besoin de vous ruiner pour commencer. Gants, bandes et protège-dents suffisent pour les premiers cours." },
    { title: "2. LA CONDITION PHYSIQUE", desc: "La boxe est cardio. N'hésitez pas à courir ou faire de la corde à sauter pour améliorer votre endurance." },
    { title: "3. TROUVER UN CLUB", desc: "Choisissez une salle où vous vous sentez à l'aise, avec un coach qui prend le temps de vous corriger." },
    { title: "4. LA RÉGULARITÉ", desc: "C'est la clé. 2 à 3 entraînements par semaine vous feront progresser rapidement sans vous épuiser." }
];