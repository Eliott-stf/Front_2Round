import { LogIn, LogOut, Mail, MapPin, Menu, Phone, Send, Settings, ShoppingBag, User, UserPlus, Wallet } from "lucide-react";

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
            { title: "Mon vestiaire", path: "/vestiaire", icon: Settings },
            { title: "Mon portefeuille", path: "/wallet", icon: Wallet }
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
            { title: "Se connecter", path: "/connexion", icon: LogIn },
        ]
    },
    {
        path: "/login",
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
