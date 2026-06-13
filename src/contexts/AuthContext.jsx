import { createContext, useContext, useState, useEffect } from "react";
import { USER_INFOS } from "@constants/appConstant";

//Init du context
const AuthContext = createContext({
    userId: '',
    email: '',
    name: '',
    lastname: '',
    role: '',
    signIn: async () => { },
    signOut: () => { },
});

//On déclare nos States 
const AuthContextProvider = ({ children }) => {
    const getSavedValue = (key, field) => {
        const saved = localStorage.getItem(key);
        const token = localStorage.getItem('token');
        if (saved && token) {
            try {
                const parsed = JSON.parse(saved);
                return parsed[field] || '';
            } catch {
                return '';
            }
        }
        return '';
    };

    const [userId, setUserId] = useState(() => getSavedValue(USER_INFOS, 'userId'));
    const [email, setEmail] = useState(() => getSavedValue(USER_INFOS, 'email'));
    const [name, setName] = useState(() => getSavedValue(USER_INFOS, 'name'));
    const [lastname, setLastname] = useState(() => getSavedValue(USER_INFOS, 'lastname'));
    const [role, setRole] = useState(() => getSavedValue(USER_INFOS, 'role'));

    // Méthode de connexion: reçoit le user + jwt depuis la page Login
    const signIn = (user, token) => {
        setUserId(user.id);
        setEmail(user.email);
        setName(user.name);
        setLastname(user.lastname);
        setRole(user.role ?? '');

        localStorage.setItem('token', token);
        localStorage.setItem(USER_INFOS, JSON.stringify({
            userId: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            role: user.role,
        }));
    };

    // Méthode de déconnexion: met a jour les states et localStorage
    const signOut = () => {
        setUserId('');
        setEmail('');
        setName('');
        setLastname('');
        setRole('');

        localStorage.removeItem('token');
        localStorage.removeItem(USER_INFOS);
    };

    const value = {
        userId,
        email,
        name,
        lastname,
        role,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };