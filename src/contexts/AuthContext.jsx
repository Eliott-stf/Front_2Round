import { createContext, useContext, useState, useEffect } from "react";
import { USER_INFOS } from "@constants/appConstant";
import api from "@lib/api";

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
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('');

    // Recharge token + user au démarrage de l'app
    useEffect(() => {
        //On récupère les USER_INFOS + JWT du localStorage
        const savedUser = localStorage.getItem(USER_INFOS);
        const token = localStorage.getItem('token');

        // On 'Restaure' de la session si les données et le jwt existent
        if (savedUser && token) {
            const user = JSON.parse(savedUser);
            setUserId(user.userId);
            setEmail(user.email);
            setName(user.name);
            setLastname(user.lastname);
            setRole(user.role ?? '');
        }
    }, []);

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